<template>
  <div class="header">
    <div class="l-content">
        <el-button icon="el-icon-menu" size="mini" class="buttonMenu" @click="handleMenu"></el-button>

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.path}" v-for="item in bread" :key="item.path">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>

    </div>
    <div class="r-content">
        <el-dropdown @command="handelClick">
            <img src="../assets/images/user.png" alt="" class="user">
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
</el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:'headerV',

    methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        //退出时清除token并跳转到登录页面
        handelClick(command){
            if(command==='logout'){
                Cookie.remove('token')
                this.$router.push('login')
            }
        }
    },

    computed:{
        ...mapState({
            bread: state => state.tab.bread
        })
    }
}
</script>

<style lang="less" scoped>
    .header{
        // margin: 0;
        padding: 0 20px;
        background-color: #333;
        height: 60px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        .l-content{
            display: flex;
            align-items: center;
            /deep/.el-breadcrumb__item{
                el-breadcrumb__inner{
                    &.is-link {
                        color: white;
                    }
                }
            }
         }
        .r-content{
            .user{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
</style>