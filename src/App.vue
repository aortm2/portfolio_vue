<template>
  <component :is="components">
    <Loading v-if="isLoading" />
    <router-view v-else></router-view>
  </component>
</template>

<script setup>
import DefaultLayout from "/src/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import ProjectLayout from "@/layouts/ProjectLayout.vue";
import Loading from "@/layouts/components/Loading.vue";

import { ref, onMounted, computed } from 'vue';
import { useRoute } from "vue-router";

const router = useRoute();
const layouts = {
  default: DefaultLayout,
  empty: EmptyLayout,
  projcet: ProjectLayout,
};
// layout
const layoutType = computed(() => Object.keys(layouts).find((x) => x === router.meta.layout)) ?? "default";
const components = computed(() => layouts[layoutType.value] ?? layouts.default);

// Loading
const isLoading = ref(true);
onMounted(() => {
  isLoading.value = false;
});

</script>