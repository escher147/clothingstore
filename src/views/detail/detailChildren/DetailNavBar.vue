<template>
  <div>
    <nav-bar class="nav-bar">
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
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
    }
</script>


<style scoped>

  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    text-align: center;
    margin-top: 5px;
  }
</style>