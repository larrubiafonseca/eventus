<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat color="white">
      <v-avatar class="hidden-md-and-up" color= #ff9800 size="32"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs color="primary" centered>
        <v-tab text="Início" to="/" class="text-principal"/>
        <v-tab text="Cadastro" to="/CadastroEvento" class="text-principal"/>
        <v-tab text="Eventos" to="/ListagemEventos" class="text-principal"/>
      </v-tabs>
      <v-spacer></v-spacer>
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



