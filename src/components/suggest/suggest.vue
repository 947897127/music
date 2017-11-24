<template>
    <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplavName(item)"></p>
                </div>
            </li>
        </ul>
    </scroll>
</template>

<script>
import scroll from '../../base/scroll/scroll.vue'
import {search} from '../../api/search.js'
import {ERR_OK} from '../../api/config.js'
import {createSong} from '../../common/js/song.js'
const TYPE_SINGER = "singer"
const perpage = 30
export default {
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        }
    },
    components:{
        scroll
    },
    data(){
        return{
            page:1,
            result: [],
            pullup: true,
            hasMore:true
        }
    },
    methods:{
        search(){
            this.hasMore=true
           search(this.query,this.page,this.showSinger, perpage).then((res)=>{
               if(res.code === ERR_OK){
                   this.result = this._getResult(res.data)
                   this._checkMore(res.data)
               }
           })  
        },
        _getResult(data){
            let ret = []
            if (data.zhida && data.zhida.singerid){
                ret.push({...data.zhida, ...{type:TYPE_SINGER}})
            }
            if(data.song){
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        getIconCls(item){
            if(item.type === TYPE_SINGER){
                return 'icon-mine'
              }else{
                  return 'icon-music'
              }
        },
        getDisplavName(item){
            if(item.type === TYPE_SINGER){
                return item.singername
            }else{
                return `${item.name}-${item.singer}`
            }
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach((musicData)=>{
                if(musicData.songid && musicData.albumid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
        },
        searchMore(){
            if(!this.hasMore){
                return
            }
            this.perpage++
            search(this.query,this.page,this.showSinger,perpage).then((res)=>{
                if(res.code === ERR_OK){
                    this.result = this.result.concat(this._getResult(res.data))
                    this._checkMore(res.data)
                }
            })
        },
        _checkMore(data){
            const song = data.song
            if(song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum){
                this.hasMore = false
            }
        }
    },
    watch:{
        query(){
            this.search()
        }
    }
}
</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl"
@import "../../common/stylus/mixin.styl"
.suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>