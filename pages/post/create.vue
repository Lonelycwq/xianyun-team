<template>
  <div class="createContent">
    <el-row type="flex" justify="space-between">
      <!-- 右侧文本框组件 -->
      <createForm />
      <!-- 右侧草稿箱组件 -->
    </el-row>
  </div>
</template>

<script>
// 引入组件
import createForm from "@/components/post/createForm.vue";
export default {
  // 注册组件
  components: {
    createForm
  }
};
</script>

<style lang="less" scoped>
.createContent {
  width: 1000px;
  margin: 20px auto;
}
</style>