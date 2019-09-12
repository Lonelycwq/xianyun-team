<template>
  <div class="post">
    <el-container>
      <el-row type="flex" justify="bespace-between">
        <PostAside @setCity="setCity"></PostAside>
        <div class="post-right">
          <el-row type="flex" justify="space-between" align="middle" class="search">
            <input v-model="postSearch" type="text" placeholder="请输入想去的地方，比如：'广州'" @keydown.enter="init(postSearch)">
            <i class="el-icon-search" @click="init(postSearch)" />
          </el-row>
          <div class="search-recommend">
            推荐:
            <span @click="init('北京')">北京</span>
            <span @click="init('上海')">上海</span>
            <span @click="init('广州')">广州</span>
          </div>
          <el-row type="flex" justify="space-between" align="middle" class="recommend-title">
            <h4>推荐攻略</h4>
            <el-button type="primary" icon="el-icon-edit" @click.native="$router.push('/post/add')">
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
      postSearch: '',
      city: '',
      postList: [],
      listPage: {
        page_start: 0,
        pageSize: 2
      },
      pageNum: 1,
      total: 0
    }
  },
  components:{
    PostList,PostAside
  },
  mounted() {
    if (this.$route.query.city) {
      this.init(this.$route.query.city)
    } else {
      this.init()
    }
  },
  methods: {
    setPage(obj){
      console.log(obj)
      this.pageNum = obj.pageNum
      this.listPage.page_start = obj.page_start
      this.listPage.pageSize = obj.pageSize
      this.init()
    },
    setCity(val){
      this.city = val
      this.init(val)
    },
    init (getCity) {
      this.postSearch = getCity
      const params = {
        _start: this.listPage.page_start,
        _limit: this.listPage.pageSize
      }
      if (getCity) {
        params.city = getCity
      }
      this.$axios({
        url: '/posts',
        params
      }).then((res) => {
        console.log(res)
        res.data.data.forEach((e) => {
          if (e.images.length < 3) {
            e.images.splice(1)
          } else {
            e.images.splice(3)
          }
        })
        this.total = res.data.total
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
        span{
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
