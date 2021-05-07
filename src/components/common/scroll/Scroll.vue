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
        probeType: this.probeType    
      })
      // 监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
        
      })
    },
    methods:{
      // time = 500 默认滚动花费时间500毫秒
      scrollTo(x,y,time = 500){
        this.scroll.scrollTo(x,y,time)
      }
    }
    }
</script>


<style scoped>

</style>