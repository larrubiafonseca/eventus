<template>
  <v-container>
    <v-form ref="form" v-model="isValid">
      <v-text-field
        v-model="nome"
        label="Nome do Evento"
        required
      ></v-text-field>

      <v-text-field
        v-model="data"
        label="Data"
        type="date"
        required
      ></v-text-field>

      <v-text-field
        v-model="local"
        label="Local do Evento"
        required
      ></v-text-field>

      <v-textarea
        v-model="descricao"
        label="Descrição"
        rows="3"
        required
      ></v-textarea>

      <v-btn :disabled="!isValid" color="primary" @click="salvarEvento">
        Salvar Evento
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      data: '',
      local: '',
      descricao: '',
      isValid: false
    };
  },
  methods: {
    salvarEvento() {
      const novoEvento = {
        nome: this.nome,
        data: this.data,
        local: this.local,
        descricao: this.descricao
      };
      
      // Salvando no localStorage (ou outro local)
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      eventos.push(novoEvento);
      localStorage.setItem('eventos', JSON.stringify(eventos));

      // Redirecionando para a listagem
      this.$router.push('/ListagemEventos');
    }
  }
};
</script>
