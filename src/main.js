import { createApp } from 'vue'
import App from './App.vue'
import Highcharts from "highcharts";
import ExportingHighcharts from "highcharts/modules/exporting";
import boost from 'highcharts/modules/boost';
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";

boost(Highcharts);
Stock(Highcharts);
ExportingHighcharts(Highcharts);
const app = createApp(App)
app.use(HighchartsVue);

app.mount('#app')
