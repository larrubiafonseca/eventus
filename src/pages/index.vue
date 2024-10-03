<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-primary" > Sobre a Empresa CCC</h2>
        <p >
          Nossa empresa é especializada na organização de eventos memoráveis. Desde conferências a festas, estamos aqui
          para garantir que seu evento seja um sucesso.
        </p>
        <p  v-if="mostrarSobre">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perferendis beatae ab esse facere nobis
          laborum atque libero officiis? Dolor ea molestias, tempore ab voluptates explicabo rem dolorem magnam fuga.
        </p>
        <v-btn color="primary" @click="toggleMostrar('mostrarSobre')">
          <span class="text-white"> {{ mostrarSobre ? 'Menos' : 'Mais' }}   informações </span>
        </v-btn>
      </v-col>


      <v-col cols="12" v-show="mostrarContato">
        <h2 class="text-primary">Contato</h2>
        <v-form>
          <v-text-field v-model="contato.nome" label="Nome" required></v-text-field>

          <v-text-field v-model="contato.email" label="Email" required></v-text-field>

          <v-btn color="primary" @click="enviarContato"> <span class="text-white"> Enviar </span></v-btn>
        </v-form>
      </v-col>

      <v-col cols="12">
        <v-btn color="primary" @click="toggleMostrar('mostrarContato')">
          <span class="text-white">{{ mostrarContato ? 'Esconder' : 'Entrar em' }} Contato </span>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <h2 class="text-primary" >Localização</h2>

        <v-card>
          <v-card-title>Universidade do Estado de Mato Grosso</v-card-title>
          <v-card-text>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.753811574088!2d-55.517279125798325!3d-11.852498638312369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93a780203fd29697%3A0x7452ca8aa98d2f5a!2sUniversidade%20do%20Estado%20de%20Mato%20Grosso%20UNEMAT%20-%20Campus%20Universit%C3%A1rio%20de%20Sinop!5e0!3m2!1spt-BR!2sbr!4v1727729427118!5m2!1spt-BR!2sbr"
              width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </v-card-text>
        </v-card>

        <v-form class="mt-3">
                <v-btn color="primary" @click="openMap" target="_blank" rel="noopener noreferrer">
                  
                  <span class="text-white"> Ver Localização no Mapa </span>
                </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      mostrarSobre: true,
      mostrarContato: false,
      contato: {
        nome: '',
        email: ''
      },
      botaoSobreClicado: false
    };
  },
  methods: {
    toggleMostrar(section) {
      this[section] = !this[section];
      if (section === 'mostrarSobre') {
        this.botaoSobreClicado = !this.botaoSobreClicado;
      }
    },
    enviarContato() {
      if (this.contato.nome && this.contato.email) {
        alert(`Contato enviado:\nNome: ${this.contato.nome}\nEmail: ${this.contato.email}`);
        this.contato.nome = '';
        this.contato.email = '';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    },

    openMap() {
      window.open("https://maps.app.goo.gl/ZLowig7Fqta8pd6E6", "_blank");
    }

  }
};
</script>