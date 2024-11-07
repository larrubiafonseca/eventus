<template>
  <v-container>
    <h2 class="text-primary">{{ evento.nome }}</h2>
    <p> Data: {{ evento.data }}</p>
    <p>Local: {{ evento.local }}</p>
    <p>Detalhes do Evento: {{ evento.descricao }}</p>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(convidado, convidadoIndex) in convidados"
          :key="convidadoIndex"
        >
          <v-list-item-content v-if="!!convidado && !!convidado.nome">
            {{ convidado.nome }}
            <v-btn
              variant="text"
              icon
              @click="removerConvidado(convidadoIndex)"
            >
              <v-icon color="primary">mdi-trash-can</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-text-field
      v-model="novoConvidado.nome"
      label="Adicionar Convidado"
      @keyup.enter="adicionarConvidado"
    ></v-text-field>

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
      const eventoIndex = this.$route.params.index + 1;
      try {
        const response = await fetch(`http://localhost:5000/eventos/${eventoIndex}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar o evento');
        }
        this.evento = await response.json();
        this.convidados = this.evento.convidados || [];
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async adicionarConvidado() {
      if (this.novoConvidado && this.novoConvidado.nome) {
        this.convidados.push(this.novoConvidado);
        this.novoConvidado = { nome: '' };

        await this.atualizarEvento();
      }
    },
    async removerConvidado(index) {
      this.convidados.splice(index, 1);
      await this.atualizarEvento();
    },
    async atualizarEvento() {
      this.evento.convidados = this.convidados;
      try {
        const response = await fetch(`http://localhost:5000/eventos/${this.evento.id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.evento),
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar o evento');
        }
        await response.json();
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  }
};
</script>
