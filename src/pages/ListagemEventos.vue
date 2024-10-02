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
    // Carregar eventos do localStorage (ou outra fonte)
    this.eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  }
};
</script>
