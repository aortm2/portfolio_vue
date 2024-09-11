<template>
    <DefaultHeader :currentSection="currentSection" @update:currentSection="updateCurrentSection" />
    <main>
      <div class="rows" ref="rows">
        <slot />
      </div>
    </main>
  </template>
  
  <script setup>
  import DefaultHeader from "@/layouts/components/DefaultHeader.vue";
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const rows = ref(null);
  const sections = ref([]);
  const currentSection = ref(0);
  
  const updateCurrentSection = (index) => {
    currentSection.value = index;
  };
  
  const handleScroll = (event) => {
    event.preventDefault();
    const delta = event.deltaY;
  
    if (delta > 0) {
      if (currentSection.value < sections.value.length - 1) {
        currentSection.value++;
      }
    } else {
      if (currentSection.value > 0) {
        currentSection.value--;
      }
    }
  
    sections.value[currentSection.value].scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  onMounted(() => {
    const isMobile = window.innerWidth <= 768;
  
    if (!isMobile) {
      sections.value = rows.value.children;
      window.addEventListener('wheel', handleScroll, { passive: false });
    }
  });
  
  onBeforeUnmount(() => {
    const isMobile = window.innerWidth <= 768;
  
    if (!isMobile) {
      window.removeEventListener('wheel', handleScroll);
    }
  });
  </script>