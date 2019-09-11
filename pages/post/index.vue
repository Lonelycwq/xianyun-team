<template>
  <div class="post">
    <el-container>
      <el-row type="flex" justify="bespace-between">
        <div class="post-left" @mouseleave="childhide">
          <div class="nav">
            <div class="menuList" @mouseover="childshow($event)">
              <ul>
                <li v-for="(item,index) in menuList" :key="index" :data-id="index">
                  {{ item.type }}
                </li>
              </ul>
              <div v-show="showindex" class="children">
                <div v-for="(childitem,index2) in childrenList" :key="index2" class="childitem">
                  <span class="span1" @click="init(childitem.city)">{{ index2+1 }}</span>
                  <span class="span2" @click="init(childitem.city)">{{ childitem.city }}</span>
                  <span class="span3" @click="init(childitem.city)">{{ childitem.desc }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tuijian">
            <h4>推荐城市</h4>
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
          </div>
        </div>
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
          <div class="post-list">
            <ul>
              <li v-for="(item ,index) in postList" :key="index">
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
              </li>
            </ul>
          </div>
          <div class="block">
            <el-pagination
              :current-page="pageNum"
              :page-sizes="[2, 3, 5, 10]"
              :page-size="listPage.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentIndex: 0,
      menuList: [],
      childrenList: [],
      showindex: false,
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
  mounted () {
    if (this.$route.query.city) {
      this.init(this.$route.query.city)
    } else {
      this.init()
    }
    this.$axios({
      url: '/posts/cities'
    }).then((res) => {
      // console.log(res)
      this.menuList = res.data.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
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
        // console.log(res)
        res.data.data.forEach((e) => {
          if (e.images.length < 2) {
            e.images.splice(2)
          } else {
            e.images.splice(3)
          }
        })
        this.total = res.data.total
        this.postList = res.data.data
      })
    },
    childhide () {
      this.showindex = false
    },
    childshow (e) {
      this.showindex = true
      if (!e.target.dataset.id) {
        this.childrenList = this.menuList[this.currentIndex].children
      } else {
        this.currentIndex = e.target.dataset.id
        this.childrenList = this.menuList[this.currentIndex].children
      }
    },
    handleSizeChange (val) {
      this.listPage.pageSize = val
      this.listPage.page_start = 0
      this.pageNum = 1
      this.init()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.listPage.page_start = (val - 1) * this.listPage.pageSize
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.post{
  .el-container{
    width: 1000px;
    margin: 20px auto;
    .post-left{
      width: 260px;
      z-index: 9;
      .nav {
        width: 100%;
        .menuList{
          position: relative;
          border-left: 1px solid #ccc;
          li{
            padding-left: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-top: 1px solid #ccc;
            border-right: 1px solid #ccc;
            cursor: pointer;
            &:hover{
              border-right:1px solid #fff;
              color: orange;
            }
            &:last-child{
              border-bottom: 1px solid #ccc;
            }
          }
        }
        .children{
          position: absolute;
          top: 0;
          right: -311px;
          z-index: -1;
          padding: 0 5px;
          width: 300px;
          border: 1px solid #ccc;
          background: #fff;
          .childitem{
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            .span1{
              margin-left: 10px;
              color: orange;
              font-size: 20px;
              font-weight: 600;
              cursor: pointer;
            }
            .span2{
              margin-left: 10px;
              color: orange;
              font-size: 16px;
              cursor: pointer;
              &:hover{
                text-decoration: underline;
              }
            }
            .span3{
              margin-left: 10px;
              color: #ccc;
              font-size: 14px;
              cursor: pointer;
              &:hover{
                text-decoration: underline;
              }
            }
          }
        }
      }
      .tuijian{
        margin-top: 15px;
        h4{
          padding-bottom: 10px;
          margin-bottom: 10px;
          font-weight: 300;
          border-bottom: 1px solid #ccc;
        }
        img{
          width: 100%;
        }
      }
    }
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
    }
  }
}
</style>
