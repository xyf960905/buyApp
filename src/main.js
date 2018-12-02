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
// 支付页面
import payMoney from "./components/06payMoney.vue";
// 支付成功页面
import paySuccess from "./components/07paySuccess.vue";
// 会员中心页面
import vipCenter from "./components/08vipCenter.vue";
// 会员中心订单列表页面
import orderList from "./components/09orderList.vue";
// 会员中心订单详情页面
import orderDetail from "./components/10orderDetail.vue";
// 会员中心首页
import orderIndex from "./components/11orderIndex.vue";



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
    component: order,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/payMoney/:orderid",
    component: payMoney,
    meta: { requiresAuth: true }
  },
  {
    path: "/paySuccess",
    component: paySuccess,
    meta: { requiresAuth: true }
  },
  {
    path:"/vipCenter",
    component:vipCenter,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '',
        redirect: 'index'
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'orderList',
        component: orderList
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'orderDetail',
        component: orderDetail
      },{
        path:'index',
        component:orderIndex
      }
    ]
  }
];
let router = new VueRouter({
  routes,
  mode: 'history'
});
// 导航守卫
router.beforeEach((to, from, next) => {
  // alert("守卫");

  if (to.meta.requiresAuth) {
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
    },
    del(state,obj){
      Vue.delete(state.count,obj);
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
