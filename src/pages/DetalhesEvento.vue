<template>
    <v-container>
      <v-card>
        <v-card-title>{{ evento.nome }}</v-card-title>
        <v-card-subtitle>{{ evento.data }} - {{ evento.local }}</v-card-subtitle>
        <v-card-text>{{ evento.descricao }}</v-card-text>
  
        <v-divider></v-divider>
  
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(convidado, convidadoIndex) in convidados" :key="convidadoIndex">
              <v-list-item-content>{{ convidado }}</v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removerConvidado(convidadoIndex)">
                  <v-icon color="red">mdi-trash-can</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
  
        <v-text-field
          v-model="novoConvidado"
          label="Adicionar Convidado"
          @keyup.enter="adicionarConvidado"
        ></v-text-field>
        <v-btn color="green" @click="adicionarConvidado">Adicionar</v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        evento: {},
        convidados: [],
        novoConvidado: ''
      };
    },
    mounted() {
      // Carregar eventos do localStorage
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      const eventoIndex = this.$route.params.index;
      
      // Definir o evento atual e a lista de convidados
      this.evento = eventos[eventoIndex];
      this.convidados = this.evento.convidados || [];
    },
    methods: {
      adicionarConvidado() {
        if (this.novoConvidado) {
          this.convidados.push(this.novoConvidado);
          this.novoConvidado = '';
  
          // Atualizar o localStorage
          this.evento.convidados = this.convidados;
          this.atualizarEvento();
        }
      },
      removerConvidado(index) {
        this.convidados.splice(index, 1);
        
        // Atualizar o localStorage
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
  