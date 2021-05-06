<template>
  <div class="tab-bar-item" @click="active">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div  v-else>
      <slot name="item-activeicon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    activeStyle() {
      return this.isActive?{color:this.activeColor}:'';
    },
    isActive(){
      return this.$route.path.indexOf(this.path) !==-1
    }
  },
  methods:{
    active(){
      this.$router.replace(this.path).catch(() => { /* ignore */ })
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 16px;

  }
  .tab-bar-item img{
    width: 22px;
    height: 22px;
    vertical-align: middle;
    margin-top:4px;
    margin-bottom: 3px;
  }
</style>