<template>
    <div class="wrap">
      <div class="project-wrap">
        <h4 class="project-title">{{ pageTitle }}</h4>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const pageTitle = computed(() => route.meta.pageTitle);
  </script>