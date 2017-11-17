<template>
  <div id="app">
      <Mheader></Mheader>
      <tab></tab>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player></player>
      
  </div>
</template>

<script>
import Mheader from './components/m-header/m-header.vue'
import tab from './components/tab/tab.vue'
import player from './components/player/player'
export default {
  components:{
    Mheader,
    tab,
    player
  }
}
</script>

<style lang="stylus">
@import './common/stylus/variable.styl';
#app
  color: $color-theme
</style>
