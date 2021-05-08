<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>  
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll:null
      }
    },

    mounted(){     
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad:this.pullUpLoad 
      })
      // console.log(this.scroll);
      // 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)       
      })
      }      
      // 监听上拉事件
      if (this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
      }      
    },
    methods:{
      // time = 500 默认滚动花费时间500毫秒
      scrollTo(x,y,time = 500){
       this.scroll && this.scroll.scrollTo(x,y,time)
      },
      // 封装继续加载更多方法
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      // refresh方法
      refresh(){
        // console.log(1111111);
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll?this.scroll.y : 0
      }

    }
    }
</script>


<style scoped>

</style>