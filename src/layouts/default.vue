<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat color="white">
      <v-avatar class="hidden-md-and-up" color= #ff9800 size="32"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs color= #ff9800 centered>
        <v-tab text="Início" to="/" class="text-principal"/>
        <v-tab text="Cadastro" to="/CadastroEvento" class="text-principal"/>
        <v-tab text="Eventos" to="/ListagemEventos" class="text-principal"/>
      </v-tabs>
      <v-spacer></v-spacer>

      <!--<v-avatar class="hidden-sm-and-down" color="green" size="32"></v-avatar> -->
    </v-app-bar>

    <v-main class="bg-white">
      <v-container>
        <v-row>

          <v-col cols="12">
            <v-sheet min-height="70vh" color="white" >
              <v-container>
                <router-view />
              </v-container>
            </v-sheet>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>



