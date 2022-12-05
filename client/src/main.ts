import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/styles/nullstyle.scss';
import './assets/styles/common.scss';
import { validation } from '@/plugins/validation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(validation);
app.component('font-icon', FontAwesomeIcon);
library.add(faTrash, faPenToSquare);

app.mount('#app');
