import { createApp } from 'vue';
import { appRouter } from './router';
import App from './App.vue';
import store from './store';

import './assets/main.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(appRouter);
app.use(store);

app.mount('#app');
