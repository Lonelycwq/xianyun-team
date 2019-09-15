<template>
  <div>
    <div class="comment-detail">
      <div class="user-floor">
        <CommentList :data="data.parent" v-if="data.parent"></CommentList>
      </div>
      <div class="comment-content">
        <div class="userInfo">
          <span>{{ data.account.nickname }}</span>
          <span>{{ data.updated_at | time }}</span>
          <span class="com-rigth">{{ data.level }}</span>
        </div>
        <div class="user-self">{{ data.content }}</div>
        <el-row type="flex" :gutter="15">
          <div class="comment-pic" v-for="(imgitem, index) in data.pics" :key="index">
            <img :src="`${$axios.defaults.baseURL}${imgitem.url}`" alt="" @click="showPic">
            <el-dialog title="图片预览" :visible.sync="dialogPic">
              <img :src="`${$axios.defaults.baseURL}${imgitem.url}`" alt="">
            </el-dialog>
          </div>
        </el-row>
        <div class="comment-ctrl" @mousemove="reply=true" @mouseout="reply=false">
          <a v-show="reply" href="javascript:;">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import CommentList from '@/components/post/commentList'
export default {
  name: 'CommentList',
  props:{
    data:{
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      reply: false,
      dialogPic: false
    }
  },
  components:{
    CommentList
  },
  filters: {
    time (value) {
      const filtersTime = moment(value).format(`YYYY-MM-DD HH:MM`)
      return filtersTime
    }
  },
  methods:{
    showPic(){
      this.dialogPic = true
    }
  },
  mounted(){
    console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
  .comment-detail{
    padding-left: 5px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    padding: 2px;
    .comment-content{
      padding-left: 10px;
      padding-bottom: 5px; 
      .userInfo{
        margin-bottom: 5px;
        padding-right: 10px;
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
</style>