<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>
          购物街
        </div>
      </template>
    </nav-bar>
    <!-- 吸顶效果：利用tabControl的拷贝占位 -->
    <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        class="tab-control"
        v-show="isTabFixed"></tab-control>
    <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        :pull-up-load="true"
        @scroll="contentScroll"
        @pullingUp="loadMore"> 

      <home-swiper :banners="banners"
        @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!-- 监听组件的原生事件时需要使用.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import FeatureView from './childComps/FeatureView'


  import {getHomeMutidata,getHomeGoods} from 'network/home'

  import {debounce} from 'common/utils'
  

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
        isShowBackTop:false,
        tabOffSetTop:0,
        isTabFixed:false,
        saveY:0
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
    mounted(){
      // 监听GoodsListItem中图片加载完成
      // $bus默认情况下是undefined，需要给Vue.prototype.$bus赋值一个Vue实例
      const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,300)
      // 每次加载一张图片调用refresh函数，refresh函数执行debounce返回的函数
      this.$bus.$on('itemImageLoad', () => {  
        refresh()
      })

    },

    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,1)
      
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
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
          this.goods[type].page += 1
          // 完成上拉加载更多，若不调用只能上拉加载一次
          this.$refs.scroll.finishPullUp()
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
        // 使两个tabControl组件的currentIndex保持一致
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //  滚动大于1500px时显示返回顶部按钮
        this.isShowBackTop = -(position.y) > 1500

        // 滚动大于等于tabControl的offsetTop时吸顶(即position：fixed)
        this.isTabFixed = -(position.y) >= this.tabOffSetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      // 吸顶效果
      swiperImgLoad(){     
        // 获取tabControl的offsetTop
        // 直接使用$refs获取的是组件，组件没有offsetTop，组件有一个$el属性可以获取组件中的标签元素
        this.tabOffSetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabOffSetTop);
      }  
    },
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999; */
  }
  #home {  
    height: 100vh;
    /* padding-top: 44px; */
    position: relative;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .content {
    
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>