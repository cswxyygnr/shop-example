<template>
  <div>
    <el-row>

      <el-col :span="8">

        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.png" alt="">
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>

          <div class="logoInfo">
            <p>上次登陆时间:<span>xxx</span></p>
            <p>上次登陆地点:<span>xxx</span></p>
          </div>
        </el-card>

        <el-card style="margin-top: 20px; height: 360px">
          <div class="table">
              <el-table
                :data="tableData"
                style="width: 100%">

                <el-table-column
                  v-for="(val,index) in tableLabel"
                  :key="index"
                  :prop="index"
                  :label="val">
                </el-table-column>
              </el-table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex'}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="order">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 320px">
          <!-- 折线图 -->
          <div ref="echart1" style="height: 280px"></div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import {getData} from '../api/index'
import * as echarts from 'echarts'
export default {
    name:'homeV',
    data(){
       return {
        tableData: [],//动态请求获取值
        tableLabel:{
          name:'课程',
          todayBuy:'今日买的',
          monthBuy:'今月买的',
          totalBuy:'总购买'
        },
        countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      }
    },

    mounted(){
      getData().then(({data}) => {
        // console.log(data)

        const {tableData} = data.data
        this.tableData = tableData
        // console.log(this.tableData)

        //初始化echarts
      const echart1 = echarts.init(this.$refs.echart1)

      //配置图表数据
      var echart1option = {}
      const {orderData} = data.data
      // console.log(orderData)//获取折线图数据

      const x = Object.keys(orderData.data[0])//获取x轴数据
      // console.log(x)

      echart1option.xAxis = {
        data:x
      }
      echart1option.yAxis={}
      echart1option.legend = {
        data:x
      }
      echart1option.series = []
      x.forEach(key =>{
        echart1option.series.push({
          name:key,
          data:orderData.data.map(item => item[key]),
          type:'line'
        })
      })
      echart1.setOption(echart1option)
      })
    }
}
</script>

<style lang="less" scoped>
  .user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid;
    display: flex;
    img{
      margin-right:40px;
      width: 150px;
      height: 150px;
      border-radius:50% ;
    }
    align-items: center;

    .name{
      font-size: 32px;
      margin-bottom: 14px;
    }

    .access{
      color: gray;
    }
  }

  .logoInfo{
    p{
      font-size: 14px;
      span{
        margin-left: 60px;
      }
    }
  }

  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .el-card{
      width: 32%;
      margin-bottom: 10px;
    }
    .icon{
      width: 80px;
      height:80px;
      font-size: 30px;
      line-height: 80px;
      text-align: center;
      color: white;
    }
    .detail{
      display: flex;
      flex-direction:column ;
      justify-content: center;
      margin-left: 20px;
      .price{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .order{
        font-size: 14px;
      }
    }
  }

</style>