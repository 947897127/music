<template>
 <div class="box">
     <input type="text" v-model="num">
     <div class="boxs" v-show="num>0"></div>
 </div>
</template>

<script>

export default {
    data(){
        return{
            num:0
        }
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
