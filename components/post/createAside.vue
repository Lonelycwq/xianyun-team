<template>
  <div class="aside">
    <h5>草稿箱（{{draftArr.length || 0 }}）</h5>
    <nuxt-link to="#" class="drestItem" v-for="(item,index) in draftArr" :key="index">
      <el-row type="flex" justify="space-between" align="middle">
        <div class="formInfo" align="middle" @click="clickEdit(item)">
          <!-- 文章标题 -->
          <el-row type="flex" justify="space-between" align="middle">
            <p class="title">
            {{item.title}}
            </p>
            <i class="el-icon-edit"></i>
            
          </el-row>
        </div>
        <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="clickDel(index)"></el-button>
      </el-row>
      
    <!-- 时间 -->
    <span>{{item.draftTime}}</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // 草稿数组
      draftArr:[]
    }
  },
  // 监听数据
  watch:{
    // ''引号=>深度监听的标志
    '$store.state.post.draftPost'(){
    const arr = this.$store.state.post.draftPost
    // 赋值
    this.draftArr = arr
    }
  },
  mounted () {
    // 从store获取草稿数据
    const arr = this.$store.state.post.draftPost
    // 赋值
    this.draftArr = arr
    // console.log(this.draftArr);
  },
  methods:{
    // 点击草稿箱编辑
    clickEdit(item){
      // 把当前点击草稿的数据展现回表单
      // const {title,content,city} = this.$store.state.post.draftPost[index];
      // 把当前点击的草稿的值存到store
      // this.$store.commit('post/setNowDraft',this.$store.state.post.draftPost[index]);
      // return this.$store.state.post.draftPost[index]
      this.$emit('getItem',item)
    },
    // 点击删除草稿箱内容
    clickDel(index){
      // 根据索引删除当前点击的草稿=>深拷贝=>不能在mutations外面直接修改其state类型
      var temp =[...this.$store.state.post.draftPost];
      temp.splice(index,1)
      this.$store.commit('post/DraftPost', temp)
    }
  }
};
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
    display: block;
    padding:5px 0;
    border-bottom: 1px #eee solid;
    &:last-child{
      border-bottom: none;
      padding-bottom: 0;
    }
    .formInfo{
      width: 150px;
      padding: 8px 0;
      color:#000;
      font-size: 16px;
      &:hover{
        color: orange;
        text-decoration:underline;
      }
      .title{
        width: 120px;
        height: 24px;
        text-align: left;
        overflow: hidden;
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