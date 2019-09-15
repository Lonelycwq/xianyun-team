<template>
  <div class="createContent">
    <el-row type="flex" justify="space-between">
      <!-- 右侧文本框组件 -->
      <createForm :item='item'/>
      <!-- 右侧草稿箱组件 -->
      <createAside @getItem="getItem"/>
    </el-row>
  </div>
</template>

<script>
// 引入组件
import createForm from "@/components/post/createForm.vue";
import createAside from "@/components/post/createAside.vue";
export default {
  data() {
    return {
      item:{}
    }
  },
  methods:{
    getItem(item){
      this.item = item
    }
  },
  // 注册组件
  components: {
    createForm,
    createAside
  }
};
</script>

<style lang="less" scoped>
.createContent {
  width: 1000px;
  margin: 20px auto;
}
</style>