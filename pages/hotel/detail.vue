<template>
  <section class="container">
    <!-- 面包屑导航 -->
    <div class="hotel_breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: index!==(breadcrumbArr.length-1)?'/hotel':'#' }"
        v-for="(item,index) in breadcrumbArr"
        :key="index"
        >{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 酒店详情 -->
    <div class="hotel_detail">
      <div class="detail_info">
        <h4 class="detail_name">{{detailData.name}}
          <span class="crown">
          <i class="iconfont icon-rank-2" style="color:#fe980e;margin-right:2px;"
          v-for="index in level"
          :key="index"
          ></i>
        </span>
        </h4>
        <p>{{detailData.alias}}</p>
        <p class="detail_info_location">
          <i class="iconfont icon-dingweiweizhi">{{detailData.address}}</i>
        </p>
      </div>
      <div class="detail_picture">
        <div class="main_display">
          <a href="javascript:void(0)">
          <img :src="picsArr[displayIndex]" :alt="`${detailData.name}`">
          </a>
        </div>
        <div class="sub_display">
          <ul>
            <li
            v-for="(item,index) in picsArr"
            :key="index"
            @click="changePictureDisplay(index)"
            :class="{show_outline:displayIndex===index}"
            >
              <a href="javascript:void(0)">
              <img :src="item" :alt="`${detailData.name}`">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 酒店规格 -->
    <div class="hotel_size">
      <el-row class="size_head_row">
        <el-col :span="10" class="info_col"><p>价格来源</p></el-col>
        <el-col :span="10" class="info_col"><p>低价房型</p></el-col>
        <el-col :span="4" class="info_col"><p>最低价格/每晚</p></el-col>
      </el-row>
      <el-row class="size_row"
      v-for="(item,index) in sizeData"
      :key="index"
      @click.native="jump(item)"
      >
        <el-col :span="10" class="info_col">
          <nuxt-link class="href_jump" to=""><p>{{item.name}}</p>
          </nuxt-link>
        </el-col>
        <el-col :span="10" class="info_col">
          <nuxt-link class="href_jump" to="#"><p>{{item.bestType}}</p>
          </nuxt-link>
        </el-col>
        <el-col :span="4" class="info_col">
          <nuxt-link class="href_jump" to="#"><p>
            <span style="font-size:17px;color:#f90"
          >￥{{item.price}}</span>
          <span style="color:#606266">起</span>
          <i class="el-icon-arrow-right height-light" 
          style="color:#f90"></i>
          </p>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
    <!-- 酒店位置 -->
    <div class="hotel_location">
      <!-- <div class="map" style="border:1px solid #000;box-sizing: border-box;"> -->
        <HotelDetailMap></HotelDetailMap>
      <!-- </div>
      <div class="location_list"  style="border:1px solid #000;box-sizing: border-box;">
        位置列表
      </div> -->
    </div>
    <!-- 酒店信息 -->
    <div class="hotel_infomation">
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">基本信息</el-col>
        <el-col :span="20" class="info_col">
          <el-row>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">入住时间: {{detailData.enterTime !== 'null' ? detailData.enterTime:'14:00'}} 之后</el-col>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">离店时间: {{detailData.leftTime !== 'null' ? detailData.leftTime:'12:00'}} 之前</el-col>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">{{detailData.creation_time}} / {{detailData.renovat_time}}</el-col>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">酒店规模: {{detailData.roomCount}}间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">主要设施</el-col>
        <el-col :span="20" class="info_col">
          <el-row class="info_col_row"
          v-if="hotelassets.length === 0"
          >
            <span>-</span>
          </el-row>
          <el-row class="info_col_row" v-else>
            <span class="info_tag"
            v-for="(item,index) in hotelassets"
            :key="index"
            >{{item}}</span>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">停车服务</el-col>
        <el-col :span="20" class="info_col">
          <el-row>{{detailData.parking !== null?detailData.parking:'-'}}</el-row>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">品牌信息</el-col>
        <el-col :span="20" class="info_col">
          <el-row 
          v-if="hotelbrand.name === ''"
          >-</el-row>
          <el-row 
          v-else
          >{{detailData.hotelbrand.name}}</el-row>
        </el-col>
      </el-row>

    </div>
    <!-- 用户评论 -->
    <div class="hotel_comments">
      <h4 class="comments">{{detailData.all_remarks}}条真实用户评论</h4>
      <el-row class="comments_detail">
        <el-col :span="4" class="total_text">
          <p>总评数 : {{detailData.all_remarks}}</p>
          <p>好评数 : {{detailData.very_good_remarks}}</p>
          <p>差评数 : {{detailData.very_bad_remarks}}</p>
        </el-col>
        <el-col :span="5" class="commen_star">
          <el-rate
          v-model="starScore"
            disabled
            show-score
            allow-half
            text-color="#ff9900"
            :score-template="`${starScore}分`">
          </el-rate>
          <div class="stamp"
          v-show="starScore >= 3"
          >推荐</div>
        </el-col>
        <el-col :span="3" class="comment_sort">
          <div class="sort_box">
            <el-progress 
              type="circle" 
              :percentage="progress.environment" 
              :width="70"
              :text-inside="true"
              :stroke-width="2"
              status='warning'
              :show-text="true"
              >
                </el-progress>
                <div class="sort_text">
                  <p>环境</p>
                  <p>{{progress.environment/10}}</p>
                </div>
          </div>
        </el-col>
        <el-col :span="3" class="comment_sort">
          <div class="sort_box">
            <el-progress 
              type="circle" 
              :percentage="progress.product" 
              :width="70"
              :text-inside="true"
              :stroke-width="2"
              status='warning'
              :show-text="true"
              >
                </el-progress>
                <div class="sort_text">
                  <p>产品</p>
                  <p>{{progress.product/10}}</p>
                </div>
          </div>
        </el-col>
        <el-col :span="3" class="comment_sort">
          <div class="sort_box">
            <el-progress 
              type="circle" 
              :percentage="progress.service" 
              :width="70"
              :text-inside="true"
              :stroke-width="2"
              status='warning'
              :show-text="true"
              >
                </el-progress>
                <div class="sort_text">
                  <p>服务</p>
                  <p>{{progress.service/10}}</p>
                </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import HotelDetailMap from '@/components/hotel/hotelDetailMap'
export default {
  components:{
    HotelDetailMap
  },
  data() {
        return {
          picsArr:[
            "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
            "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
            "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
            "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
            "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
          ],
          displayIndex:0,
          sizeData: [],
          starScore:0,
          detailData:{},
          breadcrumbArr:[],
          level:[],
          hotelassets:[],
          hotelbrand:{
            name:''
          },
          progress:{
            environment:0,
            product:0,
            service:0
          }
        }
  },
  mounted(){
    // 使用定时器添加个队列，确保获取数据之后再渲染页面
    setTimeout(async ()=>{
        // 从store里面获取数据
        this.detailData = this.$store.state.hotel.hotelData
        // 处理面包屑导航数据
        var arr = await this.detailData.breadcrumb.split(' > ')
        this.breadcrumbArr.push(arr[0],arr[arr.length-1])
        // 处理酒店星级皇冠图标的数据
        if(this.detailData.hotellevel !== null ){
          this.level.length = this.detailData.hotellevel.level
        } else {
          this.level.length = []
        }
        // 处理展示图片的数据
        this.picsArr.unshift(this.detailData.photos)
        // 处理酒店规格的数据
        this.sizeData = this.detailData.products
        this.sizeData.forEach(e => {
          if(e.name === '艺龙'){
            e.url = 'http://www.elong.com/'
          } else if(e.name === 'Hotels.com'){
            e.url = 'https://www.hotels.cn/'
          } else {
            e.url = 'https://hotels.ctrip.com/'
          }
        })
        // 处理酒店的主要设施的数据
        this.hotelassets = this.detailData.hotelassets
        // 处理酒店的品牌信息
        if(this.detailData.hotelbrand !== null ){
          this.hotelbrand = this.detailData.hotelbrand
        }
        // 处理星星评分的数据
        this.starScore = this.detailData.stars
        // 处理环境、产品、服务评分的数据
        if(this.detailData.scores.environment !== null){
          this.progress.environment = this.detailData.scores.environment * 10
        }
        if(this.detailData.scores.product !== null){
          this.progress.product = this.detailData.scores.product * 10
        }
        if(this.detailData.scores.service !== null){
          this.progress.service = this.detailData.scores.service * 10
        }
        // console.log(this.detailData)
    },10)


  },
  methods:{
    // 处理更换显示展示图
    changePictureDisplay(index){
      this.displayIndex = index
    },
    // 处理酒店表格数据跳转
    jump(item){
      window.open(item.url)
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    width:1000px;
    margin:0 auto;
    position:relative;
    .hotel_breadcrumb{
      padding: 20px 0px;
    }
    .hotel_detail{
      .detail_info{
        font-size: 14px;
        color: #666;
        .detail_name{
          height: 32px;
          line-height: 32px;
          font-size: 24px;
          font-weight: normal;
          color:#333;
          .crown{
            // height: ;
            width:80px;
          }
        }
      }
      .detail_picture{
        margin: 40px 0px 0px;
        height: 360px;
        .main_display>a>img{
          float:left;
          margin-right:26px;
          width: 640px;
          height: 360px;
        }
        &::after{
          content: '';
          clear:both;
        }
        .sub_display{
            float: right;
            width: 334px;
            &::after{
              content: '';
              clear: both;
            }
            .show_outline{
              outline: 2px #17baec solid;
            }
            ul>li{
              float: left;
              margin-bottom: 15px;
              width: 160px;
              height: 110px;
              &::after{
                content: '';
                clear: both;   
              }
              &:nth-last-child(-n+2){
                margin-bottom: 0px
              }
              &:nth-child(2n+1){
                margin-right: 14px;
              }
              a>img{
                width: 100%;
                height: 100%;
              }
            }
        }
        
      }
    }
    .hotel_size{
      margin: 50px 0px 40px;
      font-size: 14px;
      .size_head_row{
        padding: 12px 0;
        border-bottom: 1px rgb(235, 238, 245) solid;
        box-sizing: border-box;
        color:#909399;
        font-family: "microsoft YaHei";
        font-weight: 700;
        p{
          padding: 0 10px;
          height: 23px;
          line-height: 23px;
        }
      }
      .size_row{
        border-bottom: 1px rgb(235, 238, 245) solid;
        box-sizing: border-box;
        color:rgb(96, 98, 102);
        font-family: "microsoft YaHei";
        font-weight: normal;
        .href_jump{
            padding: 12px 0;
            display: block;
            width: 100%;
            height: 100%;
            p{
              padding: 0 10px;
              height: 23px;
              line-height: 23px;
            }
        }
        
      }
    }
    .hotel_location{
      height: 360px;
      // .map{
      //   float:left;
      //   height: 360px;
      //   width: 650px;
      //   &::after{
      //     clear: both;
      //     content: '';
      //   }
      // }
      // .location_list{
      //   float: right;
      //   padding: 0 0 0 20px;
      //   height: 360px;
      //   width:350px;
      //   background: #fff;
      //     &::after{
      //     clear: both;
      //     content: '';
      //   }
      // }
    }
    .hotel_infomation{
      margin: 40px 0;
      font-size: 14px;
      .info_row{
      // /deep/ .info_row{
        border-bottom: 1px solid #ededed;
        .info_col{
        // /deep/ .info_col{
          height: 59px;
          padding: 20px 10px;
          color:#666;
          .info_col_row{
              margin-top:-5px;
              .info_tag{
                    margin-right: 10px;
                    padding: 4px 10px;
                    border:1px solid #eee;
                    border-radius:4px;
                    font-size:14px;
                    color: #666;
                    height: 28px;
                    line-height: 28px;
                    text-align:center;
                    background-color: #EEE;
                  }
              
          }
        }
      }
    }
    .hotel_comments{
      .comments_detail{
        padding: 20px 0;
        color:#666;
          .commen_star{
            position: relative;
            height: 54px;
            margin:20px 0px 0px;
            .stamp{
              position: absolute;
              left: 20px;
              top:-20px;
              border: 2px solid #fa3;
              text-align: center;
              line-height: 70px;
              width: 70px;
              height: 70px;
              color: #f90;
              font-size: x-large;
              border-radius: 50%;
              opacity: .25;
              -webkit-transform: rotate(-30deg);
              transform: rotate(-30deg);
            }
          }
          .comment_sort{
            height:74px;
            .sort_box{
              position: relative;
              width: 70px;
              height:70px;
              .sort_text{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                p{
                  text-align: center;
                  color:#f90;
                }
              }
            }
        }
      }
    }
  }
</style>