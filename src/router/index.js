/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

// Importando os componentes
import CadastroEvento from '../pages/CadastroEvento.vue'
import ListagemEventos from '../pages/ListagemEventos.vue'
import DetalhesEvento from '../pages/DetalhesEvento.vue'

// Adicionando rotas manuais
const manualRoutes = [
  {
    path: '/cadastro',
    name: 'CadastroEvento',
    component: CadastroEvento,
  },
  {
    path: '/listagem',
    name: 'ListagemEventos',
    component: ListagemEventos,
  },
  {
    path: '/detalhes/:index',
    name: 'DetalhesEvento',
    component: DetalhesEvento,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...routes, ...manualRoutes]), // Unindo as rotas automáticas com as manuais
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
