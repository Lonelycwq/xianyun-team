<template>
  <div class="tab">
    <div class="tab-top">
      <span
        v-for="(item ,index) in ['新闻','体育','娱乐']"
        :key="index"
        :class="{active:current===index}"
        @click="current=index"
      >{{ item }}</span>
    </div>

    <div v-show="current===0">
      <ul>
        <li>新闻1</li>
        <li>新闻2</li>
        <li>新闻2</li>
      </ul>
    </div>
    <div v-show="current===1">
      <ul>
        <li>体育1</li>
        <li>体育2</li>
        <li>体育2</li>
      </ul>
    </div>
    <div v-show="current===2">
      <ul>
        <li>娱乐1</li>
        <li>娱乐2</li>
        <li>娱乐2</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  padding: 20px;
  .tab-top {
    span {
      cursor: pointer;
    }
    .active{
      color: red
    }
  }
}
</style>
