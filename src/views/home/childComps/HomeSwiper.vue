<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad:true
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imgLoad(){
      // 通过isLoad使this.$emit只执行一次
      if (this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad = false;
      }
      
    }
  }
}
</script>
<style scoped>
 
</style>