<template>
<transition name="slide">
    <music :songs='songs' :title='title' :bgImage='bgImage'></music>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from '../../api/singer.js'
import {ERR_OK} from '../../api/config.js'
import {createSong} from '../../common/js/song.js'
import music from '../music-list/music-list.vue'
export default {
  data(){
    return{
      songs:[]
    }
  },
  computed:{
    title(){
      return this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created(){
    this._getDetail()
  },
  methods:{
   _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            // console.log(this.songs)
          }
        })
      },
   _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
   
  },
  components:{
    music
  }
  
}
</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl";
.slide-enter-active, .slide-leave-active 
    transition all 0.5s
.slide-enter, .slide-leave-to
    transform translate3d(100%,0,0)
</style>


