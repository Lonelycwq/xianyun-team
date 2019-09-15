<template>
  <div class="detail-main">
    <el-row type="flex" justify="space-between" class="container">
      <div class="main">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/post' }">
            旅游攻略
          </el-breadcrumb-item>
          <el-breadcrumb-item>旅游详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="post">
          <h1>{{ postInfo.title }}</h1>
          <div class="post-info">
            <span>攻略：{{ postInfo.updated_at | time }}</span>
            <span>阅读：{{ postInfo.watch }}</span>
          </div>
          <div class="content" v-html="postInfo.content">
            1
          </div>
          <div class="post-ctrl">
            <el-row type="flex" justify="bespace-between">
              <el-col :span="5" class="ctrl-text">
                <i class="iconfont iconpinglun" />
                <p>评论({{total}})</p>
              </el-col>
              <el-col :span="5" class="ctrl-text" @click.native="setStar">
                <i class="iconfont iconstar1" />
                <p>收藏</p>
              </el-col>
              <el-col :span="5" class="ctrl-text" @click.native="$message.warning('功能尚未开通')">
                <i class="iconfont iconfenxiang" />
                <p>分享</p>
              </el-col>
              <el-col :span="5" class="ctrl-text" @click.native="setLike">
                <i class="iconfont iconding" />
                <p>点赞({{ postInfo.like }})</p>
              </el-col>
            </el-row>
          </div>
              <!-- 新增评论 -->
        <AddNewComment></AddNewComment>
          <Comment @getTotal="getTotal"></Comment>
        </div>
      </div>
      <DetailAside :data="recommendList" class="aside" />
    </el-row>

  </div>
</template>

<script>
// 引入momentjs插件
import moment from 'moment'
import DetailAside from '@/components/post/detailAside'
import Comment from '@/components/post/comment'
import AddNewComment from '@/components/post/addNewComment'
export default {
  components: {
    DetailAside,Comment,AddNewComment
  },
  filters: {
    // 时间过滤
    time (value) {
      const filtersTime = moment(value).format(`YYYY-MM-DD HH:MM`)
      return filtersTime
    }
  },
  data () {
    return {
      // 当前文章数据
      postInfo: {},
      // 评论列表
      recommendList: [],
      // 评论总数
      total: 0
    }
  },
  watch:{
    // 监听路由中文章的id变化更新数据
    $route(){
      this.init()
      this.cmd()
    }
  },
  methods:{
    // 获取文章详情的请求
    init(){
      // 根据文章id发送请求
      this.$axios({
        url: '/posts',
        params: { id: this.$route.query.id }
      })
      .then((res) => {
        // console.log(res)
        // 文章数据赋值
        this.postInfo = res.data.data[0]
      })
    },
    // 根据id推荐文章列表
    cmd(){
      this.$axios({
        url: '/posts/recommend',
        params: { id: this.$route.query.id }
      })
      .then((res) => {
        // console.log(res)
        // 推荐文章列表赋值
        this.recommendList = res.data.data
      })
    },
    // 文章点赞方法
    setLike(){
      this.$axios({
        url: '/posts/like',
        params: {id: this.$route.query.id},
        // 给接口单独加上请求头
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
      })
      .then((res)=>{
        // console.log(res)
        this.$message.success('点赞成功')
      })
      //重新加载数据
      this.init()
    },
    // 文章收藏方法
    setStar(){
      this.$axios({
        url: '/posts/star',
        params: {id: this.$route.query.id},
        // 给接口单独加上请求头
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
      })
      .then((res)=>{
        // console.log(res)
        this.$message.success('收藏成功')
      })
    },
    // 接收子组件传递的评论总数
    getTotal(val){
      this.total = val
    }
  },
  mounted () {
    this.init()
    this.cmd()
  }
}
</script>
<style lang="less" scoped>
.detail-main{
  .container{
    width: 1000px;
    margin: 0 auto;
    padding-top: 20px;
    .main{
      width: 700px;
      .post{
        margin-top: 15px;
        h1{
          padding: 20px 0;
          font-size: 30px;
          border-bottom: 1px solid #ddd;
        }
        .post-info{
          padding: 10px;
          color: #999;
          padding: 20px;
          text-align: right;
          span{
            margin-left: 20px;
          }
        }
        .content{
          line-height: 1.5;
          /deep/ img{
            max-width: 700px;
            margin: 10px 0;
          }
        }
        .post-ctrl{
          width: 400px;
          margin: 30px auto;
          & > div {
            padding: 10px;
            .ctrl-text{
              display: flex;
              flex-flow: column;
              align-items: center;
              cursor: pointer;
              i{
                color: orange;
                font-size: 28px;
              }
              p{
                margin-top: 5px;
                font-size: 14px;
                color: #999;
              }
            }
          }
        }
      }
    }
    .aside{
      width: 280px;
    }
  }
}
</style>
