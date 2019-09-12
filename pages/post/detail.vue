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
                <p>评论</p>
              </el-col>
              <el-col :span="5" class="ctrl-text">
                <i class="iconfont iconstar1" />
                <p>收藏</p>
              </el-col>
              <el-col :span="5" class="ctrl-text">
                <i class="iconfont iconfenxiang" />
                <p>分享</p>
              </el-col>
              <el-col :span="5" class="ctrl-text">
                <i class="iconfont iconding" />
                <p>点赞</p>
              </el-col>
            </el-row>
          </div>
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
export default {
  components: {
    DetailAside
  },
  filters: {
    time (value) {
      const filtersTime = moment(value).format(`YYYY-MM-DD HH:MM`)
      return filtersTime
    }
  },
  data () {
    return {
      postInfo: {},
      recommendList: []
    }
  },
  mounted () {
    this.$axios({
      url: '/posts',
      params: { id: this.$route.query.id }
    })
      .then((res) => {
        console.log(res)
        this.postInfo = res.data.data[0]
      })
      .catch((err) => {
        console.log(err)
      })
    this.$axios({
      url: '/posts/recommend',
      params: { id: this.$route.query.id }
    })
      .then((res) => {
        console.log(res)
        this.recommendList = res.data.data
      })
      .catch((err) => {
        console.log(err)
      })
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
