import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from "./store/index.js"
import toast from "./components/common/toast/index.js"
import fastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"


Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端300ms延迟
fastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
