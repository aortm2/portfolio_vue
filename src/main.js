import { createApp } from 'vue';

import '@/static/scss/style.scss';

import App from './App.vue';
import { router } from "./router";

const app = createApp(App);

import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
])

import ECharts from 'vue-echarts';
app.component('v-chart', ECharts);
app.use(router);
app.mount('#app')
