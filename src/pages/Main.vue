<template>
  <div>
    <el-container>
        <el-aside width="auto">
            <aside-menu />
        </el-aside>

        <el-container>
            <el-header>
                <headerV />
            </el-header>
            
            <commonTag></commonTag>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from '../components/asideMenu.vue'
import headerV from '../components/header.vue'
import commonTag from '../components/commonTag.vue'
export default {
    name:'mainV',
    components:{
        asideMenu,
        headerV,
        commonTag
    }
}
</script>

<style scoped>
    .el-header{
        padding: 0;
        margin: 0;
    }

</style>