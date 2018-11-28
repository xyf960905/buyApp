import Vue from "vue";
import App from "./App.vue";
import "./assets/site/css/style.css";
import VueRouter from "vue-router";
import index from "./components/index.vue";
Vue.use(VueRouter);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import detail from "./components/02detail";
// 导入axios
import axios from "axios";
Vue.prototype.$axios = axios;
// 设置带上cookie
axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.baseURL = "http://111.230.232.110:8899/";

// 导入moment
import moment from "moment";
Vue.filter("time", value => {
  return moment(value).format("YYYY-MM-DD");
});

// 导入iview
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.use(iView);

Vue.config.productionTip = false;

// 导入购物车
import shopcart from "./components/03shopcart.vue";
// 导入下订单页面
import order from "./components/04order.vue";
// 导入登录页面
import login from "./components/05login.vue";


let routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    component: index
  },
  {
    path: "/detail/:artID",
    component: detail
  },
  {
    path: "/shopcart",
    component: shopcart
  },
  {
    path: "/order/:selectedids",
    component: order
  },
  {
    path: "/login",
    component: login
  }
];
let router = new VueRouter({
  routes
});
// 导航守卫
router.beforeEach((to, from, next) => {
  // alert("守卫");

  if (to.path.indexOf("/order") !=-1) {
    axios.get("site/account/islogin").then(result => {
      if (result.data.code != "logined") {
        Vue.prototype.$Message.warning("请先登录");
        router.push("/login");
      }else{
        next();
      }
    });
  } else {
    next();
  }
});

// 刷新的bug



// 导入图片放大镜
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 导入vuex
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: JSON.parse(window.localStorage.getItem("something")) || {},
    login: false
  },
  // 相当于计算属性
  getters: {
    totle: state => {
      let num = 0;
      for (const key in state.count) {
        num += state.count[key];
      }
      return num;
    }
  },
  mutations: {
    increment(state, obj) {
      // state.count++
      // 存在
      if (state.count[obj.ID]) {
        state.count[obj.ID] += obj.buyCount;
      } else {
        Vue.set(state.count, obj.ID, obj.buyCount);
      }
    },
    changenum(state, obj) {
      state.count = obj;
    },
    delone(state,id){
      Vue.delete(state.count,id);
      // console.log(id);
    },   
    islogin(state,obj){
        state.login=obj;
    }   
  }
});

window.onbeforeunload = function() {
  window.localStorage.setItem("something", JSON.stringify(store.state.count));
};

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    axios.get("site/account/islogin").then(result => {
      if (result.data.code != "logined") {
        store.state.login=false;
      }else{
        store.state.login=true;
      }
    });
  }
}).$mount("#app");

// console.log(router.routes);
