<template>
  <v-container>
    <h2 class="text-primary">Cadastro de Eventos</h2>
    <v-form ref="form" v-model="isValid" lazy-validation>
      <v-text-field
        v-model="nome"
        :rules="[v => !!v || 'Campo obrigatório!']"
        label="Nome do Evento *"
        required
      ></v-text-field>

      <v-text-field
        v-model="data"
        @blur="validarData"
        @input="formatarData"
        :rules="[v => !!v || 'Campo obrigatório!', v => dataValida || 'A data não pode ser anterior a hoje!']"
        label="Data *"
        required
      ></v-text-field>
      
      <v-text-field
        v-model="local"
        :rules="[v => !!v || 'O local do evento é obrigatório']"
        label="Local do Evento *"
        required
      ></v-text-field>

      <v-textarea
        v-model="descricao"
        label="Descrição"
        rows="3"
      ></v-textarea>

      <v-btn color="primary" @click="salvarEvento">
        <span class="text-white">Salvar Evento</span>
      </v-btn>
    </v-form>
    <v-alert
      v-if="mensagemErro"
      type="error"
      class="mt-3"
      dismissible
    >
      {{ mensagemErro }}
    </v-alert>
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
      mensagemErro: '',
    };
  },
  methods: {
    validarData(data) {
      const hoje = new Date().toISOString().split('T')[0];
      return data >= hoje;
    },
    salvarEvento() {
      const camposInvalidos = [];
      if (!this.nome) camposInvalidos.push('Nome do Evento');
      if (!this.data) camposInvalidos.push('Data');
      if (!this.local) camposInvalidos.push('Local');

      if (camposInvalidos.length > 0) {
        this.mensagemErro = `Campo(s) obrigatório(s) não preenchido(s): ${camposInvalidos.join(', ')}`;
        return;
      }

      if (!this.validarData(this.data)) {
        this.mensagemErro = 'A data deve ser igual ou maior que hoje.';
        return;
      }

      this.mensagemErro = ''; 

      const novoEvento = {
        nome: this.nome,
        data: this.data,
        local: this.local,
        descricao: this.descricao
      };

      fetch('http://localhost:5000/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEvento)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao salvar o evento');
        }
        return response.json();
      })
      .then(data => {
        console.log('Evento salvo:', data);
        this.$router.push('/ListagemEventos');
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    }
  }
};
</script>