<template>
    <div class="wrap">
      <div class="project-wrap">
        <button type="button" class="btn-back" aria-label="닫기">
          <router-link to="/">
            <img src="/src/static/img/icon/ico_close.svg">
          </router-link>
        </button>
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