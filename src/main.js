import Vue from 'vue';
import App from './App.vue';
import "./assets/site/css/style.css";
import VueRouter from 'vue-router';
import index from "./components/index.vue";
Vue.use(VueRouter);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import detail from "./components/02detail";
// 导入axios
import axios from "axios";
Vue.prototype.$axios=axios;
axios.defaults.baseURL="http://111.230.232.110:8899/";

// 导入moment
import moment from "moment";
Vue.filter('time',(value)=> {
    return moment(value).format("YYYY-MM-DD");
  }
)

// 导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.productionTip = false;

let routes=[
  {
    path:"/",
    redirect:'/index'
  },
  {
    path:"/index",
    component:index
  },
  {
    path:"/detail/:artID",
    component:detail
  }
]    

let router=new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// console.log(router.routes);

