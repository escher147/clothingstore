<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>
          购物街
        </div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"> 
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control class="tab-control" 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!-- 监听组件的原生事件时需要使用.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import FeatureView from './childComps/FeatureView'


  import {getHomeMutidata,getHomeGoods} from 'network/home'
  

export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
    
  },

  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0,list: []},
        'new':{page: 0,list: []},
        'sell':{page: 0,list: []},
      },
      currentType:'pop',
      isShowBackTop:false
    }
  },
  created() {
    // 请求首页的部分数据
    this.getHomeMutidata()
    // 请求首页商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 网络请求
     */
    getHomeMutidata(){
      getHomeMutidata().then(res => {
      // 保存请求的部分数据
      this.banners=res.data.data.banner.list;
      this.recommends=res.data.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
       getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(... res.data.data.list)
        this.goods[type].page+1
    })
    },

     /**
     *  事件监听
    */
     tabClick(index){
       switch(index){
         case 0:
           this.currentType = 'pop';
           break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
       }
     },
     backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
     },
     contentScroll(position){
       this.isShowBackTop = -(position.y) > 1500
     }
  },
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }
  #home {  
    height: 100vh;
    padding-top: 44px;
    position: relative;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
  .content {
    
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>