import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-routery
import "./assets/site/css/style.css";


// Vue.use(VueRouter)


Vue.config.productionTip = false

// let routers=[

// ]

// let router=new VueRouter({
//   routers
// })
new Vue({
  render: h => h(App),
  // router
}).$mount('#app')
