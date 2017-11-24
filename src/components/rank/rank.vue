<template>
 <div class="box">
     <input type="text" v-model="num">
     <div class="boxs" v-show="num>0" @click="timeDate">
         <img :src="imgs" alt="">
     </div>
     <p v-html="dateTime"></p>
     <div id="main" style="width: 600px;height: 400px;"></div><div id="mind" ></div>
     <!-- <p v-html="this.times"></p> -->
 </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data(){
        return{
            num:0,
            dateTime:'',
            imgs:[require('../../assets/act-img3.png')],
            opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                opinionData:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ]
        }
    },
    methods:{
        timeDate(){
            setInterval(()=>{
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth()+1
                let dates = date.getDate()
                let hours = date.getHours()
                let minutes = date.getMinutes()
                let seconds = date.getSeconds()
                // let num=date.setDate(date.getDate()+90)
                // let nums = num/24/60/60
                // let num = date.getDate()
                this.dateTime = `${year} 年 : ${month} 月 : ${dates} 日 :${hours} 时 : ${minutes} 分 : ${seconds}`
                // this.dateTimes = `${year} 年 : ${month} 月 : ${nums} 日 :${hours} 时 : ${minutes} 分 : ${seconds}`
 console.log(this.dateTimes)
            },1000)
        
       
    },
    drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                   orient: 'vertical',
                   x: 'left',
                   data:this.opinion
                 },
                 series: [
                   {
                     name:'访问来源',
                     type:'pie',
                     radius:['50%','70%'],
                     avoidLabelOverlap: false,
                     label: {
                       normal: {
                         show: false,
                         position: 'center'
                       },
                       emphasis: {
                         show: true,
                         textStyle: {
                           fontSize: '30',
                           fontWeight: 'blod'
                         }
                       }
                     },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data:this.opinionData
                   }
                 ]
               })
            }
    },
    mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    
}
</script>

<style lang="stylus">
.box
    .boxs
        width 100px
        height 100px
        background red
</style>
