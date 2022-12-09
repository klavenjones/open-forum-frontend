import { createRouter, createWebHistory } from 'vue-router';
import AppVue from './App.vue';
import DashboardVue from './components/Dashboard.vue';
import Home from './components/Home.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', component: DashboardVue },
];

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: routes,
});
