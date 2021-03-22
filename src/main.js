import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import { Notify } from 'vant';
import 'lib-flexible'
import moment from 'moment'

//引入全局css
import "./assets/common.css"

Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(Notify);

Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
