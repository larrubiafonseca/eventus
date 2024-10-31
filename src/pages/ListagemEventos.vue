<template>
  <v-container>
    <v-card color="white"
      v-for="(evento, index) in eventos"
      :key="index"
      class="mb-3"
    >
      <v-card-title :style="{ color: '#ff9800' }" >{{ evento.nome }}</v-card-title>
      <v-card-subtitle>{{ evento.data }} - {{ evento.local }}</v-card-subtitle>
      <v-card-text>{{ evento.descricao }}</v-card-text>
      <v-card-actions>
        <v-btn icon @click="excluirEvento(index)">
          <v-icon color="primary">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn color="text-secundary" @click="irParaDetalhes(index)">
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
    fetch('http://localhost:5000/eventos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos: ' + response.statusText);
        }
        return response.json(); 
      })
      .then(data => {
        this.eventos = data; 
      })
      .catch(error => {
        console.error('Erro:', error); 
      });
  },
  methods: {
    excluirEvento(index) {
      this.eventos.splice(index, 1);
      localStorage.setItem('eventos', JSON.stringify(this.eventos));
    },
    irParaDetalhes(index) {
      this.$router.push({ name: 'DetalhesEvento', params: { index } });
    }
  }
};
</script>
