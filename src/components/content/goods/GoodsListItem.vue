<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'GoodListItem',
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imgLoad(){
        // 判断给那个组件发射load事件
        if (this.$route.path.indexOf('/home') !== -1){
          this.$bus.$emit('homeItemImageLoad')
          // console.log(22222);
        } else if (this.$route.path.indexOf('/detail') !== -1){
          this.$bus.$emit('detailItemImageLoad')
          // console.log(11211);
        }
        
      },
      goodsItemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed:{
      showImg(){
        // ||两边的数据顺序不能反
        return  this.goodsItem.image|| this.goodsItem.show.img
      }
    }
    }
</script>


<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .cfav {
    position: relative;
  }

  .goods-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>