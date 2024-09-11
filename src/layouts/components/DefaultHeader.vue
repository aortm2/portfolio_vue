<template>
	<!-- header -->
	<header>
	  <div class="top-menu">
		<div class="rows">
		  <h1><a href="/"><strong>JH</strong>.PORTFOLIO</a></h1>
		  <button class="nav-toggler on" title="모바일 메뉴">
			<span class="nav-toggler-bar"></span>
			<span class="nav-toggler-bar"></span>
			<span class="nav-toggler-bar"></span>
			<span class="nav-toggler-bar"></span>
		  </button>
		</div>
		<div class="bg-nav"></div>
	  </div>
	</header>
	<!-- // header -->
	<!-- nav -->
	<nav ref="nav">
	  <ul class="nav-list">
		<li
		  class="sections-nav-item"
		  v-for="item in menuItems"
		  :key="item.id"
		>
		  <a :href="'#' + item.id" class="nav-link" :title="item.title"  :class="{ active: item.id === currentSectionId }" @click.prevent="setActiveSection(item.id)">
			<span class="sections-nav-counter">{{ item.counter }}</span>
			{{ item.title }}
		  </a>
		</li>
	  </ul>
	</nav>
	<!-- // nav -->
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, computed } from 'vue';
  
  const props = defineProps({
	currentSection: {
	  type: Number,
	  required: true
	}
  });

  const emit = defineEmits(['update:currentSection']);
  
  const menuItems = ref([
	{ id: 'section_01', title: 'Top', counter: '01' },
	{ id: 'section_02', title: 'ABOUT ME', counter: '02' },
	{ id: 'section_03', title: 'PROJECT', counter: '03' },
	{ id: 'section_04', title: 'HISTORY', counter: '04' },
	{ id: 'section_05', title: 'CONTACT', counter: '05' }
  ]);
  
  const currentSectionId = computed(() => {
  if (typeof props.currentSection === 'number') {
    const section = menuItems.value[props.currentSection];
    return section ? section.id : '';
  }

  return props.currentSection || '';
});

const setActiveSection = (id) => {
  const index = menuItems.value.findIndex(item => item.id === id);
  if (index !== -1) {
    emit('update:currentSection', index);

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

  </script>