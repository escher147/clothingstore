<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>     
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
       <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
      
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    
  </div>
</template>


<script>
  import DetailNavBar from './detailChildren/DetailNavBar'
  import DetailSwiper from './detailChildren/DetailSwiper'
  import DetailBaseInfo from './detailChildren/DetailBaseInfo'
  import DetailShopInfo from './detailChildren/DetailShopInfo'
  import DetailGoodsInfo from './detailChildren/DetailGoodsInfo'
  import DetailParamInfo from './detailChildren/DetailParamInfo'
  import DetailCommentInfo from './detailChildren/DetailCommentInfo'
  import DetailBottomBar from './detailChildren/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {debounce} from 'common/utils'
  import {getDetail, getRecommend, GoodsInfo, Shop, GoodsParam} from 'network/detail'
  import {backTopMixin} from 'common/mixin'
  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages:[],
        goodsInfo:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        sectionTopY:[],
        currentIndex:0
      }
    },
    // 将返回顶部需要的公共代码抽取到mixin中
    mixins:[backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
     
      Scroll,
      GoodsList
    },
    created(){
      this.iid = this.$route.params.iid;     
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result;
        // 获取顶部图片数据
        this.topImages = data.itemInfo.topImages;

        // 获取商品信息
        this.goodsInfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品详细信息
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论信息
        if (data.rate.cRate !== 0)
        this.commentInfo = data.rate.list[0]
       
      }),
      // 获取推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.data.list
      })

    },
    methods:{
      imageLoad(){
        // 图片加载后让better-scroll重新计算滚动内容高度
        this.$refs.scroll.refresh()

        // 获取各部分的offsetTop
        // 在detailGoodsInfo组件中已处理过只有图片加载完才发射imageLoad，因此此处不需要使用防抖函数
        this.sectionTopY = [];
        this.sectionTopY.push(0)
        this.sectionTopY.push(this.$refs.param.$el.offsetTop - 44)
        this.sectionTopY.push(this.$refs.comment.$el.offsetTop -44)
        this.sectionTopY.push(this.$refs.recommend.$el.offsetTop -44)
        
        // console.log(this.sectionTopY);
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.sectionTopY[index],500)
      },
      contentScroll(position){
        const positionY = -position.y;
        for(let i = this.sectionTopY.length - 1;i >= 0;i--){
         
          if (positionY >= this.sectionTopY[i]){
            
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
            break
          }

          this.isShowBackTop = -(position.y) > 1500
          
           
        }
      },

      // 添加商品到购物车
      addToCart(){
        // 获取购物车内商品需要的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid

        // 添加商品到购物车,使用vuex
        // this.$store.commit('addCart',product)
        // 复杂操作采用actions
        this.$store.dispatch('addCart',product)
      }
    },
    mounted(){
      // 监听GoodsListItem中图片加载完成
      // $bus默认情况下是undefined，需要给Vue.prototype.$bus赋值一个Vue实例
      const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,300)
      // 每次加载一张图片调用refresh函数，refresh函数执行debounce返回的函数
      this.$bus.$on('detailItemImageLoad', () => {  
        
        refresh()
    })
    
    }
    }
</script>


<style scoped>
  #detail {
    position:relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>