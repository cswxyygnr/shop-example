//路由器
import Vue from 'vue'
//引入路由插件
import VueRouter from 'vue-router'
//引入组件
import homeV from '../pages/Home.vue'
import userV from '../pages/User.vue'
import mainV from '../pages/Main.vue'
import mallV from '../pages/Mall.vue'
import pageOne from '../pages/pageOne.vue'
import pageTwo from '../pages/pageTwo.vue'
import loginV from '../pages/login.vue'
//引入cookie
import Cookie from 'js-cookie'

//使用插件
Vue.use(VueRouter)

const router = new VueRouter({
    //所有路由
    routes:[
        //主路由
        {
            path:'/',
            component:mainV,
            redirect:'home',
            //子路由
            children:[
                {path:'home', name:'home', component:homeV},//主页
                {path:'user',name:'user', component:userV},//用户管理
                {path:'mall',name:'mall', component:mallV},//商品管理
                {path:'page1',name:'page1', component:pageOne},
                {path:'page2',name:'page2', component:pageTwo}
            ]
        },
        {
            path:'/login',
            name:'login',
            component:loginV
        }
    ]
})

export default router

router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if(!token && to.name !== 'login'){
        next({name:'login'})
    }else if(token && to.name === 'login'){
        next({name:'home'})
    }else{
        next()
    }
  
  })