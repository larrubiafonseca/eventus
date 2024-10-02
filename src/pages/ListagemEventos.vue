<template>
  <v-container>
    <v-card
      v-for="(evento, index) in eventos"
      :key="index"
      class="mb-3"
    >
      <v-card-title>{{ evento.nome }}</v-card-title>
      <v-card-subtitle>{{ evento.data }} - {{ evento.local }}</v-card-subtitle>
      <v-card-text>{{ evento.descricao }}</v-card-text>
      <v-card-actions>
        <v-btn icon @click="excluirEvento(index)">
          <v-icon color="red">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn color="blue" @click="irParaDetalhes(index)">
          Detalhes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      eventos: []
    };
  },
  mounted() {
    // Carregar eventos do localStorage
    this.eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  },
  methods: {
    excluirEvento(index) {
      // Remover o evento do array
      this.eventos.splice(index, 1);
      // Atualizar o localStorage
      localStorage.setItem('eventos', JSON.stringify(this.eventos));
    },
    irParaDetalhes(index) {
      // Navegar para a página de detalhes do evento
      this.$router.push({ name: 'DetalhesEvento', params: { index } });
    }
  }
};
</script>
