export default {
    state:{
        isCollapse:false,//用于控制菜单的展开与收起
        bread:[
            {
                path:"/",
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            },
        ],  //面包屑
    },

    mutations: {
        //修改菜单
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        addBread(state,val){
            // console.log('val',val)
            if(val.name !== 'home'){
               const index = state.bread.findIndex(item => item.name === val.name)
               if(index === -1){
                state.bread.push(val)
               }
            }
        },

        deleteBread(state,val){
            state.bread.splice(val,1)
        }
    }
}