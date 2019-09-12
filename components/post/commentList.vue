<template>
  <div>
    <div class="comment detail" v-for="(item, index) in data" :key="index">
      <p>
        <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type: Array,
      default: []
    }
  },
  mounted(){
    console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
  .comment-detail{
    border-bottom: 1px dashed #ddd;
    padding: 20px 20px 5px;
  }
</style>