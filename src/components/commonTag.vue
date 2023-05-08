<template>
  <div class="tag">
    <el-tag
        :closable="item.name !== 'home'"
        v-for="(item,index) in bread"
        :key="item.name"
        :effect="$route.name === item.name?'dark':'plain'"
        @click="change(item)"
        @close="deleteTag(item,index)"
      >
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    name:'commonTag',
    computed:{
      ...mapState({
          bread: state => state.tab.bread
      })
      
    },

    methods:{
      ...mapMutations(['deleteBread']),

      //点击tag改变路由
      change(item){
        this.$router.push({name:item.name})
        console.log('改变后的router',this.$router)
      },

      //点击tag的删除键功能
      deleteTag(item,index){
        const len = this.bread.length
        this.deleteBread(index)
        //删除的tag不是当前路由
        if(item.name !== this.$route.name){return}
        //是当前路由时判断位置
        else if(index === len-1){
          this.$router.push({name:this.bread[index-1].name})
        }
        else
        {
          this.$router.push({name:this.bread[index+1].name})
        }
      },  
    },

    mounted(){
      console.log('当前组件的router',this.$route.path)
    }
}
</script>

<style>
  .tag{
    .el-tag{
      margin-right: 3px;
      margin-top: 5px;
    }
  }
</style>