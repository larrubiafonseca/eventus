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
            <v-list-item-content v-if="!!convidado && !!convidado.nome">{{ convidado.nome }} <v-btn variant="text" icon @click="removerConvidado(convidadoIndex)">
                <v-icon color="primary">mdi-trash-can</v-icon>
              </v-btn></v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-text-field v-model="novoConvidado.nome" label="Adicionar Convidado"
        @keyup.enter="adicionarConvidado"></v-text-field>
                 

    <v-btn color="primary" @click="adicionarConvidado"> <span class="text-white">Adicionar</span></v-btn>


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
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const eventoIndex = this.$route.params.index;

    this.evento = eventos[eventoIndex];
    this.convidados = this.evento.convidados || [];
  },
  methods: {
    adicionarConvidado() {
      if (this.novoConvidado && this.novoConvidado.nome) {
        this.convidados.push(this.novoConvidado);
        this.novoConvidado = { nome: '' };

        this.evento.convidados = this.convidados;
        this.atualizarEvento();
      }
    },
    removerConvidado(index) {
      this.convidados.splice(index, 1);

      this.evento.convidados = this.convidados;
      this.atualizarEvento();
    },
    atualizarEvento() {
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      eventos[this.$route.params.index] = this.evento;
      localStorage.setItem('eventos', JSON.stringify(eventos));
    }
  }
};
</script>