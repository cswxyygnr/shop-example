<template>
  <div>
    <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <h3>{{ isCollapse?'后台':'通用后台管理系统'}}</h3>
        <el-menu-item :index="item.name" v-for="item in noChildren" :key="item.name" @click="clickMenu(item)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="i in item.children" :key="i.name">
                <el-menu-item index="i.name" @click="clickMenu(i)">{{ i.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        
    </el-menu>
  </div>
</template>

<script>
export default {
    name:'asideMenu',

    data(){
        return  {
            // isCollapse:false,
            menu:[
                {
                    path:"/",
                    name:'home',
                    label:'首页',
                    icon:'s-home',
                    url:'Home/Home'
                },
                {
                    path:"/mall",
                    name:'mall',
                    label:'商品管理',
                    icon:'video-play',
                    url:'MallManage/MallManage'
                },
                {
                    path:"/user",
                    name:'user',
                    label:'用户管理',
                    icon:'user',
                    url:'UserManage/UserManage'
                },
                {
                    label:'其他',
                    icon:'location',
                    children:[
                        {
                        path:'/page1',
                        name:'page1',
                        label:'页面1',
                        icon:"setting",
                        url:"Other/pageOne"
                        },
                        {
                        path:'/page2',
                        name:'page2',
                        label:'页面2',
                        icon:"setting",
                        url:"Other/pageTwo"
                        }

                    ]
                },
            ]
        }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      clickMenu(item){
        if(this.$route.path !== item.path && !((this.$route.path ==='/home')&&(item.path === '/'))){
            //当页面的路由与跳转的路由不一致时才跳转
            this.$router.push(item.path)
        }
        this.$store.commit('addBread',item)
      }
    },
    computed:{
        //没有子菜单
        noChildren(){
           return this.menu.filter(item => !item.children)
        },
        //有子菜单
        hasChildren(){
            return this.menu.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }

    }
}
</script>

<style lang="less" scoped>
    // .el-menu-vertical-demo:not(.el-menu--collapse){
    //     min-height: 400px;
    //     h3{
    //         color:aliceblue;
    //         text-align: center;
    //         line-height: 48px;
    //         font-size: 16px;
    //         font-weight: 400px;
    //     }
    // }

    .el-menu{
        border-right-width: 0;
        height: 100vh;
        min-height: 400px;
        h3{
            color:aliceblue;
            text-align: center;
            line-height: 48px;
            font-size: 16px;
            font-weight: 400px;
        }
    }
</style>