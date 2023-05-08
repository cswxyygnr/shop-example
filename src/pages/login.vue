<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="70px" class="login-container">
        <h3 class="title">系统登陆</h3>
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="passWord">
            <el-input v-model="form.passWord" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Mock from 'mockjs'
import {getMenu} from '../api'
export default {
    name:'loginV',
    data(){
        return{
            form:{
                userName:'',
                passWord:''
            },
            rules:{
                userName:{required:true, message:'请输入用户名', trigger:'blur'},
                passWord:{required:true, message:'请输入密码', trigger:'blur'}
            }
        }
    },
    methods:{
        login(){
            // const token = Mock.Random.guid()
            // Cookie.set('token',token)

            //校验form表单
            this.$refs.form.validate((valid)=>{
                if(valid){
                    getMenu(this.form).then(({data})=>{
                        console.log(data)
                        if(data.code === 20000){
                            //存入token
                            Cookie.set('token',data.data.token)
                            //跳转首页
                            this.$router.push('home')
                        }else{
                            this.$message.error('密码或用户名错误')
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
        width: 350px;
        border-radius: 15px;
        margin: 180px auto;
        padding: 15px 20px 10px 20px;
        border: 1px solid #eaeaea;
        background-color: #fff;
        box-shadow: 0 0 25px #cac6c6;
        .title{
            text-align: center;
            margin-bottom: 40px;
        }
        
    }
</style>