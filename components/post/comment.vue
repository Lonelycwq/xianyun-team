<template>
  <div class="comment-main">
    <div class="comment-list">
      <CommentList :data="commentList"></CommentList>
    </div>
  </div>
</template>

<script>
import CommentList from '@/components/post/commentList'
export default {
  data(){
    return {
      // 评论列表
      commentList: [],
      // 请求评论数据需要的参数对象
      getCommentObj: {
        post: this.$route.query.id,
        // _sort: '',
        _limit: 2,
        _start: 0
      }
    }
  },
  components:{
    CommentList
  },
  methods:{
    // 获取评论方法
    init(){
      this.$axios({
        url: '/posts/comments',
        params: this.getCommentObj
      })
      .then((res)=>{
        this.commentList = res.data.data
        this.$emit('getTotal',res.data.total)
        console.log(this.commentList)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="less" scoped>
.comment-main{
  .comment-list{
    border: 1px solid #ccc;
  }
}
</style>