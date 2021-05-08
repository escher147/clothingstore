<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick"> 
          <img src="@/assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div 
          :class="{active: index === currentIndex}"
          v-for="(item, index) in titles" :key="item" class="title-item"
          @click="titleClick(index)">
            {{item}}
          </div>
        </div>
        
      </template>
    </nav-bar>
  </div>
</template>


<script>
import NavBar from '@/components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components:{
      NavBar
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
      },
      backClick(){
        this.$router.back()
      }
    }
    }
</script>


<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 12px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    text-align: center;
    margin-top: 5px;
  }
</style>