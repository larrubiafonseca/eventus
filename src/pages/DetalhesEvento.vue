<template>
  <v-container>
    <h2 class="text-primary">{{ evento.nome }}</h2>
    <p> Data: {{ evento.data }}</p>
    <p>Local: {{ evento.local }}</p>
    <p>Detalhes do Evento: {{ evento.descricao }}</p>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(convidado, convidadoIndex) in convidados" :key="convidadoIndex">
          <v-list-item-content v-if="!!convidado && !!convidado.nome">
            {{ convidado.nome }}
            <v-btn variant="text" icon @click="removerConvidado(convidado.autoid)">
              <v-icon color="primary">mdi-trash-can</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-text-field v-model="novoConvidado.nome" label="Adicionar Convidado"
      @keyup.enter="adicionarConvidado"></v-text-field>

    <v-btn color="primary" @click="adicionarConvidado">
      <span class="text-white">Adicionar</span>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      evento: {},
      convidados: [],
      novoConvidado: { nome: '' }
    };
  },
  mounted() {
    this.carregarEvento();
  },
  methods: {
    async carregarEvento() {
      const eventoIndex = this.$route.params.index;
      try {
        const response = await fetch(`http://localhost:5000/eventos/${eventoIndex}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar o evento');
        }
        this.evento = await response.json();
        const result = await fetch(`http://localhost:5000/convidados/${eventoIndex}/convidados`);
        this.convidados = await result.json();
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async adicionarConvidado() {
      if (this.novoConvidado && this.novoConvidado.nome) {
        const eventoIndex = this.$route.params.index;
        const result = await fetch(`http://localhost:5000/convidados/${eventoIndex}/convidados`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.novoConvidado)
        });


        const eventodel = await result.json();
        const response = await fetch(`http://localhost:5000/convidados/${eventoIndex}/convidados`);
        this.convidados = await response.json();
        this.novoConvidado = { nome: '' }
      }
    },
    async removerConvidado(index) {
      const eventoIndex = this.$route.params.index;
      const result = await fetch(`http://localhost:5000/convidados/${eventoIndex}/convidados/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index })
      });
      const eventodel = await result.json();
      const response = await fetch(`http://localhost:5000/convidados/${eventoIndex}/convidados`);
      this.convidados = await response.json();
    }
  }
};
</script>
