import { createRouter, createWebHistory } from 'vue-router'

// data
import pages from "./data/pages"; 

const routes = [...pages];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;