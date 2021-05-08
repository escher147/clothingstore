<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>


<script>
  import DetailNavBar from './detailChildren/DetailNavBar'
  export default {
    name: 'Detail',
    data() {
      return {
        iid: null
      }
    },
    components:{
      DetailNavBar
    },
    created(){
      this.iid = this.$route.params.iid
    },
    // destroyed(){
    //   console.log('destroyed');
    // }
    }
</script>


<style scoped>

</style>