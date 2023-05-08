import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './api/mock'

// //按需引入element-ui
// import {Row,Button} from 'element-ui'
// //使用
// Vue.use(Button)
// Vue.use(Row)

//全局引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用
Vue.use(ElementUI)
Vue.config.productionTip = false


const vm = new Vue({
  render: h => h(App),
  router,
  store,

  mounted(){
    console.log(this)
  }
}).$mount('#app')
