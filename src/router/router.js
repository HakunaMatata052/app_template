import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";

// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
        path: "/",
        name: "home",
        component: () => import("@/views/index/subviews/home.vue"),
        meta: {
          keepAlive: true,
          isTransition: true,
          title: "首页",
          isMember: false,
          isLogin: false,
          icon: "home",
          icon_press: "home-active",
          index: 0
        }
      }]
    },
    // 注册登录
    {
      path: "/login/:name?",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "登录",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "注册",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("@/views/login/resetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改密码",
        isMember: false,
        isLogin: false
      }
    },
  ]
});
router.beforeEach((to, from, next) => {

  if (to.meta.index != undefined) {
    store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      next({path: "/login"});
      // router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(route => {

  // console.log(route)
  // console.log("跳转")
})

export default router;