<template>
    <div>
      Buscar as informações do evento: {{ evento }}
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { useEventosStore } from '@/stores/eventos'; 
  
  const route = useRoute();
  const store = useEventosStore();
  
  const evento = store.getEventoById(route.params.id);
  
  </script
  