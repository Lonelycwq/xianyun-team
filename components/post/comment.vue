<template>
  <div class="comment-main">
    <!-- 新增评论 -->
    <AddNewComment @updInit='updInit' :follow="followObj"></AddNewComment>
    <div class="comment-list">
      <div v-for="(item, index) in commentList" :key="index" class="comment-detail">
        <div class="userInfo">
          <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" class="user-img" alt="">
          <span>{{ item.account.nickname }}</span>
          <span>{{ item.updated_at | time }}</span>
          <span class="com-rigth">{{ item.level }}</span>
        </div>
        <div class="comment-content">
          <div class="user-floor">
          <CommentList :data="item.parent" v-if="item.parent"></CommentList>
          </div>
          <div class="user-self">{{ item.content }}</div>
          <el-row type="flex" :gutter="15">
            <div class="comment-pic" v-for="(imgitem, index2) in item.pics" :key="index2">
              <img :src="`${$axios.defaults.baseURL}${imgitem.url}`" alt="" @click="showPic">
              <el-dialog title="图片预览" :visible.sync="dialogPic">
                <img :src="`${$axios.defaults.baseURL}${imgitem.url}`" alt="">
              </el-dialog>
            </div>
          </el-row>
          <div class="comment-ctrl" @mousemove="reply=true" @mouseout="reply=false">
            <a v-show="reply" href="javascript:;" @click="replyById(item)">回复</a>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="getCommentObj._limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import AddNewComment from '@/components/post/addNewComment'
import CommentList from '@/components/post/commentList'
import moment from 'moment'
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
      },
      pageNum: 1,
      total: 0,
      reply: false,
      dialogPic: false,
      followObj: {}
    }
  },
  components:{
    CommentList,AddNewComment
  },
  filters: {
    time (value) {
      const filtersTime = moment(value).format(`YYYY-MM-DD HH:MM`)
      return filtersTime
    }
  },
  watch:{
    '$store.state.post.followObj'(newval,oldnew){
      this.followObj = newval
    },
    // 监听路由中文章的id变化更新数据
    $route(){
      this.getCommentObj.post = this.$route.query.id
      this.init()
    }
  },
  methods:{
    updInit(){
      this.init()
    },
    // 获取评论方法
    init(){
      this.$axios({
        url: '/posts/comments',
        params: this.getCommentObj
      })
      .then((res)=>{
        // console.log(res)
        this.commentList = res.data.data
        this.$emit('getTotal',res.data.total)
        this.total = res.data.total
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    // 选择每页显示数据条数
    handleSizeChange(val) {
      // 每页显示条数赋值
      this.getCommentObj._limit = val
      // 开始数据从0开始
      this.getCommentObj._start = 0
      // 当前页码为1
      this.pageNum = 1
      this.init()
    },
    // 切换页码事件
    handleCurrentChange(val) {
      // 给当前页码赋值
      this.pageNum = val
      // 计算出数据从哪条开始
      this.getCommentObj._start = (val - 1) * this.getCommentObj._limit
      this.init()
    },
    //打开图片预览模态框
    showPic(){
      this.dialogPic = true
    },
    //回复获取参数
    replyById(item){
      this.followObj = item
    },
    //评论组件发送回复评论id
    getId(obj){
      this.followObj = obj
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
    .comment-detail{
      padding: 20px 20px 5px;
      border-bottom: 1px dashed #ddd;
      background: transparent;
      .userInfo{
        margin-bottom: 10px;
        font-size: 12px;
        color: #666;
        .user-img{
          width: 16px;
          border-radius: 50%;
          vertical-align: bottom;
        }
        .username{
          color: orange;
          margin-right: 5px;
        }
        .com-rigth{
          float: right;
        }
      }
      .user-self{
        margin-top: 5px;
      }
      .comment-pic{
        width: 80px;
        height: 80px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 5px;
        margin-top: 10px;
        padding: 5px;
        border: 1px dashed #ddd;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .comment-ctrl{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #1e50a2;
        text-align: right;
        cursor: pointer;
      }
    }
  }
}
</style>