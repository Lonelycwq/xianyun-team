<template>
  <div class="aside">
    <h5>草稿箱（0）</h5>
    <nuxt-link to="#" class="drestItem">
      <!-- v-for="(item, index) in draft" :key="index" to="#" -->
      <el-row type="flex" justify="space-between" align="middle">
        <div class="formInfo">
          <!-- 文章标题 -->
          <span>
            文章标题
            <i class="el-icon-edit"></i>
          </span>
        </div>
      </el-row>
    </nuxt-link>
    <!-- 时间 -->
    <span>2019-09-12</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.aside {
  width: 200px;
  height: 100%;
  border: 1px #ddd solid;
  padding: 10px;
  margin-top: 10px;
  color: #666;
  h5 {
    font-size: 16px;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #eee solid;
  }
  .drestItem{
    padding:10px 0;
    border-bottom: 1px #eee solid;
    .formInfo{
        padding: 8px 0;
        span{
            color:#000;
           font-size: 16px;
            &:hover{
                color: orange;
                text-decoration:underline;
            }
        }
    }
  }
  span{
      font-size: 14px;
  }
}
</style>