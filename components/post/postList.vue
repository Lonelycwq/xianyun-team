<template>
  <div>
    <div class="post-list">
      <ul>
        <li v-for="(item ,index) in data" :key="index">
          <el-row v-if="item.images.length<2" type="flex" justify="space-between">
            <div class="post-left">
              <nuxt-link :to="`/post/detail?id=${item.id}`">
                <img :src="`${item.images[0]}`" alt="">
              </nuxt-link>
            </div>
            <div class="post-right">
              <div class="post-title">
                <nuxt-link :to="`/post/detail?id=${item.id}`">
                  {{ item.title }}
                </nuxt-link>
              </div>
              <div class="post-content">
                <nuxt-link :to="`/post/detail?id=${item.id}`">
                  {{ item.summary }}
                </nuxt-link>
              </div>
              <el-row type="flex" justify="space-between" align="middle" class="post-info">
                <el-row type="flex" justify="space-between" align="middle">
                  <span><i class="el-icon-location-outline" />{{ item.cityName }}</span>
                  <nuxt-link :to="`/post/detail?id=${item.id}`">
                    <el-row type="flex" justify="space-between" align="middle" class="post-user">
                      <span>by</span>
                      <img class="user-img" :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="">
                      <span class="username">
                        <nuxt-link to="/user/center">
                          {{ item.account.nickname }}
                        </nuxt-link>
                      </span>
                    </el-row>
                  </nuxt-link>
                  <span><i class="el-icon-view" />{{ item.watch }}</span>
                </el-row>
                <span v-if="item.like" style="color:orange;font-size:14px;">{{ item.like }}点赞</span>
                <span v-else style="color:orange;font-size:14px;">0 点赞</span>
              </el-row>
            </div>
          </el-row>
          <div v-else-if="item.images.length>2">
            <div class="post-title">
              <nuxt-link :to="`/post/detail?id=${item.id}`">
                {{ item.title }}
              </nuxt-link>
            </div>
            <div class="post-content">
              <nuxt-link :to="`/post/detail?id=${item.id}`">
                {{ item.summary }}
              </nuxt-link>
            </div>
            <el-row type="flex" justify="space-between" class="post-pic" :gutter="20">
              <el-col v-for="(itemImg,indexImg) in item.images" :key="indexImg" :span="8">
                <nuxt-link :to="`/post/detail?id=${item.id}`">
                  <img :src="`${itemImg}`" alt="">
                </nuxt-link>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" align="middle" class="post-info">
              <el-row type="flex" justify="space-between" align="middle">
                <span><i class="el-icon-location-outline" />{{ item.cityName }}</span>
                <nuxt-link to="">
                  <el-row type="flex" justify="space-between" align="middle" class="post-user">
                    <span>by</span>
                    <img class="user-img" :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="">
                    <span class="username">
                      <nuxt-link to="/user/center">
                        {{ item.account.nickname }}
                      </nuxt-link>
                    </span>
                  </el-row>
                </nuxt-link>
                <span><i class="el-icon-view" />{{ item.watch }}</span>
              </el-row>
              <span v-if="item.like" style="color:orange;font-size:14px;">{{ item.like }}点赞</span>
              <span v-else style="color:orange;font-size:14px;">0 点赞</span>
            </el-row>
          </div>
          <div v-else>
            <div class="post-title">
              <nuxt-link :to="`/post/detail?id=${item.id}`">
                {{ item.title }}
              </nuxt-link>
            </div>
            <div class="post-content">
              <nuxt-link :to="`/post/detail?id=${item.id}`">
                {{ item.summary }}
              </nuxt-link>
            </div>
            <el-row type="flex" justify="space-between" align="middle" class="post-info">
              <el-row type="flex" justify="space-between" align="middle">
                <span><i class="el-icon-location-outline" />{{ item.cityName }}</span>
                <nuxt-link to="">
                  <el-row type="flex" justify="space-between" align="middle" class="post-user">
                    <span>by</span>
                    <img class="user-img" :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="">
                    <span class="username">
                      <nuxt-link to="/user/center">
                        {{ item.account.nickname }}
                      </nuxt-link>
                    </span>
                  </el-row>
                </nuxt-link>
                <span><i class="el-icon-view" />{{ item.watch }}</span>
              </el-row>
              <span v-if="item.like" style="color:orange;font-size:14px;">{{ item.like }}点赞</span>
              <span v-else style="color:orange;font-size:14px;">0 点赞</span>
            </el-row>
          </div>
        </li>
      </ul>
    </div>
    <div class="block">
      <el-pagination
        :current-page="pageList.pageNum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="pageList.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props:{
    // 父组件传的列表总数据
    data:{
      type:Array,
      default:[]
    },
    // 父组件传的总数据条数
    total:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      // 需要传给父组件的数据集合
      pageList:{
        // 用哪条数据开始
        page_start: 0,
        // 每页显示多少条数据
        pageSize: 2,
        // 当前页码
        pageNum: 1,
      }
    }
  },
  methods:{
    // 选择每页显示数据条数
    handleSizeChange(val) {
      // 每页显示条数赋值
      this.pageList.pageSize = val
      // 开始数据从0开始
      this.pageList.page_start = 0
      // 当前页码为1
      this.pageList.pageNum = 1
      // 传递事件以及数据给父组件
      this.$emit('setPage',this.pageList)
    },
    // 切换页码事件
    handleCurrentChange(val) {
      // 给当前页码赋值
      this.pageList.pageNum = val
      // 计算出数据从哪条开始
      this.pageList.page_start = (val - 1) * this.pageList.pageSize
      // 传递事件以及数据给父组件
      this.$emit('setPage',this.pageList)
    }
  }
}
</script>

<style lang="less" scoped>
  .post-list{
    li{
      margin-top: 15px;
      border-bottom: 1px solid #ccc;
      .post-title{
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
      overflow: hidden;
      cursor: pointer;
        &:hover{
          color: orange
        }
      }
      .post-content{
        height: 65px;
        overflow: hidden;
        line-height: 22px;
        font-size: 14px;
        text-align: justify;
        margin: 10px 0;
        cursor: pointer;
      }
      .post-pic{
        margin-bottom: 15px;
        img{
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
      }
      .post-info{
        margin-bottom: 10px;
        span{
          margin-right: 10px;
          font-size: 12px;
          color: #999;
          i{
            margin-right: 5px;
          }
        }
        .user-img{
          width: 20px;
          border-radius: 50%;
          margin-right: 5px;
          margin-left: -5px;
        }
        .username{
          color: orange;
          margin-right: 5px;
        }
      }
      .post-left{
        width: 220px;
        margin-right: 10px;
        img{
          width: 100%;
        }
      }
      .post-right{
        width: 470px;
      }
    }
  }
</style>