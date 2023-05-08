<template>
  <div class="manage">
    <!-- 查询和新建 -->
    <div class="search-add">
      <el-button @click="handleAdd" class="button" type="primary">+新建</el-button>
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="search" type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 弹出的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      <!-- 表单信息 -->
      <el-form 
        ref="form" 
        :rules="rules" 
        :inline="true" 
        label-width="80px" 
        :model="form"
        :before-close="handleClose">

        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入信息" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入信息" v-model="form.age"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>  
        
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input placeholder="请输入信息" v-model="form.address"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表单 -->
    <el-table
      height="80%"
      :data="tableData"
      style="width: 100%;"
      :stripe="true">

      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="姓别"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex===1?'男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期"
        value-format="yyyy-mm-dd">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="edit"
        label="编辑栏">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handledel(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- //页签 -->
    <div>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getUser,addUser,editUser,deleUser} from '../api'
export default {
    name:'userV',
    data() {
        return {
          dialogVisible: false,
          form:{
            name:'',
            age:'',
            sex:'',
            birth:'',
            address:''
          },
          rules:{
            name:[{required:true,message:'请重新输入'}],
            age:[{required:true,message:'请重新输入'}],
            sex:[{required:true,message:'请重新输入'}],
            birth:[{required:true,message:'请重新输入'}],
            address:[{required:true,message:'请重新输入'}],

          },
          tableData:[],
          modelType:0 ,//0表示新增，1表示编辑
          total:0 ,//数据条数默认0
          pageData:{
            page:1,
            limit:7
          },
          userForm:{
            name:''
          }
        } 
      },
      methods:{
        //提交表单
        submit(){
          this.$refs.form.validate((valid)=>{
            if(valid){
              //后续对表单数据的处理
              if(this.modelType === 0){
                addUser(this.form).then(()=>{
                  //添加后重新请求数据刷新页面
                  this.getList()
                })
              }
              else{
                editUser(this.form).then(()=>{
                  this.getList()
                })
              }
              //关闭前清空表单
              this.handleClose()
            }
          })
        },

        handleClose(){
          this.$refs.form.resetFields()
          this.dialogVisible=false
        },

        handleEdit(row){
          this.modelType=1
          this.dialogVisible=true
          //深拷贝
          this.form = JSON.parse(JSON.stringify(row))
        },

        handledel(row){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              deleUser({id:row.id}).then(()=>{
              this.getList()
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });

        },

        handleAdd(){
          this.modelType=0
          this.dialogVisible=true
        },
        getList(){
          getUser({params:{...this.userForm,...this.pageData}}).then( ({data}) => {
            this.tableData = data.list
            // console.log('table请求到的数据',this.tableData)
            this.total = data.count || 0
          })
        },//获取修改后的数据，以更新到页面中，封装一下用起来更方便

      //选择页码时的回调
       handlePage(val){
        this.pageData.page = val
        this.getList()
       },

       //搜索功能
       search(){
        this.getList()
       }
      },

      mounted(){
        this.getList()
        console.log(this.$confirm)
      },
      watch:{
        deep:true,
        'userForm.name':{
          handler(){
            if(!this.userForm.name)
            {
              setTimeout(()=>{this.getList()},1000)
            }
          }
        },
        tableData:{
          handler(){
            this.$nextTick(console.log(this.tableData))
          }
        }
      }
}
</script>

<style lang="less" scoped>
  .manage{
    .search-add{
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    height: 90%;
    .el-button{
      height: 8%;
    }
   
  }
</style>