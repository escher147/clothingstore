<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>
          购物街
        </div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import FeatureView from './childComps/FeatureView'
  import {getHomeMutidata,getNpsData} from 'network/home'

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView
  },
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    // 请求首页的部分数据
    getHomeMutidata().then(res => {
      // 保存请求的部分数据
      this.banners=res.data.data.banner.list;
      this.recommends=res.data.data.recommend.list;
    })
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
    padding-top: 44px;
  }
</style>