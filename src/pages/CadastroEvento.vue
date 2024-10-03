<template>
  <v-container>
    <h2 class="text-primary" >Cadastro de Eventos</h2>
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
 
      <v-btn color="primary" :disabled="!isValid"  @click="salvarEvento">
        <span class="text-white"> Salvar Evento </span>
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
      
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      eventos.push(novoEvento);
      localStorage.setItem('eventos', JSON.stringify(eventos));

      this.$router.push('/ListagemEventos');
    }
  }
};
</script>

