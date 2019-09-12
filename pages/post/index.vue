<template>
  <div class="post">
    <el-container>
      <el-row type="flex" justify="bespace-between">
        <PostAside></PostAside>
        <div class="post-right">
          <el-row type="flex" justify="space-between" align="middle" class="search">
            <input v-model="postSearch" type="text" placeholder="请输入想去的地方，比如：'广州'" @keydown.enter="init(postSearch)">
            <i class="el-icon-search" @click="init(postSearch)" />
          </el-row>
          <div class="search-recommend">
            推荐:
            <nuxt-link to="/post?city=北京">北京</nuxt-link>
            <nuxt-link to="/post?city=上海">上海</nuxt-link>
            <nuxt-link to="/post?city=广州">广州</nuxt-link>
          </div>
          <el-row type="flex" justify="space-between" align="middle" class="recommend-title">
            <h4>推荐攻略</h4>
            <el-button type="primary" icon="el-icon-edit" @click.native="$router.push('/post/create')">
              写游记
            </el-button>
          </el-row>
          <PostList :data="postList" :total="total" @setPage="setPage"></PostList>
        </div>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import PostList from '@/components/post/postList'
import PostAside from '@/components/post/postAside'
export default {
  data() {
    return {
      // 输入框绑定值
      postSearch: '',
      // 城市名
      city: '',
      // 文章列表数组
      postList: [],
      // 发送请求需要带的参数
      listPage: {
        page_start: 0,
        pageSize: 2
      },
      // 当前页码
      pageNum: 1,
      // 总数据条数
      total: 0
    }
  },
  components:{
    // 注册组件
    PostList,PostAside
  },
  mounted() {
    // 判断url中是否有city
    if (this.$route.query.city) {
      // 有则带参数发送获取数据请求
      this.init(this.$route.query.city)
    } else {
      this.init()
    }
  },
  watch: {
    // 监听url中city数据的变化重新请求数据
    '$route.query.city':function(newVal, oldVal){
      this.init(newVal)
    }
  },
  methods: {
    // 列表组件传递事件
    setPage(obj){
      // 赋值并发送请求
      this.pageNum = obj.pageNum
      this.listPage.page_start = obj.page_start
      this.listPage.pageSize = obj.pageSize
      this.init()
    },
    // 获取所有数据请求
    init (getCity) {
      // 给输入框赋值
      this.postSearch = getCity
      // 定义要穿的数据
      const params = {
        _start: this.listPage.page_start,
        _limit: this.listPage.pageSize
      }
      // 如果有城市则设置
      if (getCity) {
        params.city = getCity
      }
      // 发送获取文章列表的数据请求
      this.$axios({
        url: '/posts',
        params
      }).then((res) => {
        // console.log(res)
        // 遍历文章列表数组
        res.data.data.forEach((e) => {
          // 判断图片数组的长度是否小于3，是则设置保留一个数据，否则保留3个数据
          if (e.images.length < 3) {
            e.images.splice(1)
          } else {
            e.images.splice(3)
          }
        })
        // 总数据赋值
        this.total = res.data.total
        // 文章列表赋值
        this.postList = res.data.data
      })
    },
  }
}
</script>

<style lang="less" scoped>
.post{
  .el-container{
    width: 1000px;
    margin: 20px auto;
    .post-right{
      margin-left: 30px;
      width: 700px;
      .search{
        border: 2px solid orange;
        input{
          flex: 1;
          padding: 0 20px;
          line-height: 36px;
          outline: none;
          border: none;
          background: none;
        }
        i{
          width: 40px;
          color: orange;
          font-size: 22px;
          font-weight: 600;
          cursor: pointer;
        }
      }
      .search-recommend{
        margin: 10px 0;
        font-size: 12px;
        color: #666;
        a{
          margin-left: 5px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .recommend-title{
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        h4{
          font-weight: 400;
          font-size: 18px;
          color: orange;
          &::after{
            display: block;
            content: "";
            width: 72px;
            height: 2px;
            background: orange;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
}
</style>
