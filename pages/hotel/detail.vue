<template>
  <section class="container">
    <!-- 面包屑导航 -->
    <div class="hotel_breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
        <el-breadcrumb-item>xxx酒店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 酒店详情 -->
    <div class="hotel_detail">
      <div class="detail_info">
        <h4 class="detail_name">得月楼饭店
          <span class="crown">
          <i class="iconfont icon-rank-2" style="color:#fe980e;margin-right:-5px;"></i>
          <i class="iconfont icon-rank-2" style="color:#fe980e;margin-right:-5px;"></i>
          <i class="iconfont icon-rank-2" style="color:#fe980e;margin-right:-5px;"></i>
          <i class="iconfont icon-rank-2" style="color:#fe980e;margin-right:-5px;"></i>
          <i class="iconfont icon-rank-2" style="color:#fe980e;margin-right:-5px;"></i>
        </span>
        </h4>
        <p>de yue lou hotel</p>
        <p class="detail_info_location">
          <i class="iconfont icon-dingweiweizhi">柘宁东路9号</i>
        </p>
      </div>
      <div class="detail_picture">
        <div class="main_display">
          <a href="javascript:void(0)">
          <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt="得月楼饭店">
          </a>
        </div>
        <div class="sub_display">
          <ul>
            <li>
              <a href="javascript:void(0)">
              <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt="得月楼饭店">
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
              <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt="得月楼饭店">
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
              <img src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt="得月楼饭店">
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
              <img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt="得月楼饭店">
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
              <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt="得月楼饭店">
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
              <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt="得月楼饭店">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 酒店规格 -->
    <div class="hotel_size">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="pathway"
        label="价格来源"
        width="420">
      </el-table-column>
      <el-table-column
        prop="size"
        label="低价房型"
        width="420">
      </el-table-column>
      <el-table-column
        prop="price"
        label="最低价格/每晚">
        <span style="font-size:17px;color:#f90">￥69</span>
        <span style="color:#606266">起</span>
        <i class="el-icon-arrow-right height-light" 
        style="color:#f90"></i>
      </el-table-column>
    </el-table>
    </div>
    <!-- 酒店位置 -->
    <div class="hotel_location">
      <div class="map" style="border:1px solid #000;box-sizing: border-box;">
        高德地图
      </div>
      <div class="location_list"  style="border:1px solid #000;box-sizing: border-box;">
        位置列表
      </div>
    </div>
    <!-- 酒店信息 -->
    <div class="hotel_infomation">
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">基本信息</el-col>
        <el-col :span="20" class="info_col">
          <el-row>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">入住时间：14：00之后</el-col>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">离店时间：12：00之前</el-col>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">2014年开业 / 2014年装修</el-col>
            <el-col :span="6" style="padding-left: 5px; padding-right: 5px;">酒店规模：119间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">主要设施</el-col>
        <el-col :span="20" class="info_col">
          <el-row class="info_col_row">
            <span class="info_tag">家电</span>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">停车服务</el-col>
        <el-col :span="20" class="info_col">
          <el-row>-</el-row>
        </el-col>
      </el-row>
      <el-row class="info_row">
        <el-col :span="4" class="info_col" style="color:#000">品牌信息</el-col>
        <el-col :span="20" class="info_col">
          <el-row>-</el-row>
        </el-col>
      </el-row>

    </div>
    <!-- 用户评论 -->
    <div class="hotel_comments">
      <h4 class="comments">0条真实用户评论</h4>
      <el-row class="comments_detail">
        <el-col :span="4" class="total_text">
          <p>总评数:937</p>
          <p>好评数:282</p>
          <p>差评数:22</p>
        </el-col>
        <el-col :span="5" class="commen_star">
          <el-rate
            v-model="value5"
            disabled
            show-score
            allow-half
            text-color="#ff9900"
            :score-template="`${value5}分`">
          </el-rate>
          <div class="stamp">推荐</div>
        </el-col>
        <el-col :span="3" class="comment_sort">
          <div class="sort_box">
            <el-progress 
              type="circle" 
              :percentage="50" 
              :width="70"
              :text-inside="true"
              :stroke-width="2"
              status='warning'
              :show-text="true"
              >
                </el-progress>
                <div class="sort_text">
                  <p>环境</p>
                  <p>8</p>
                </div>
          </div>
        </el-col>
        <el-col :span="3" class="comment_sort">
          <div class="sort_box">
            <el-progress 
              type="circle" 
              :percentage="50" 
              :width="70"
              :text-inside="true"
              :stroke-width="2"
              status='warning'
              :show-text="true"
              >
                </el-progress>
                <div class="sort_text">
                  <p>产品</p>
                  <p>8.3</p>
                </div>
          </div>
        </el-col>
        <el-col :span="3" class="comment_sort">
          <div class="sort_box">
            <el-progress 
              type="circle" 
              :percentage="50" 
              :width="70"
              :text-inside="true"
              :stroke-width="2"
              status='warning'
              :show-text="true"
              >
                </el-progress>
                <div class="sort_text">
                  <p>服务</p>
                  <p>8.2</p>
                </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data() {
        return {
          tableData: [
            {
            pathway: '携程',
            size: '高级大床房A',
            price: '￥69'
          },
            {
            pathway: '携程',
            size: '高级大床房A',
            price: '￥69'
          },
            {
            pathway: '携程',
            size: '高级大床房A',
            price: '￥69'
          }
          ],
          value5:4.2
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
            // >ul{
            //   display: flex;
            //   flex-wrap: wrap;
            //   >li{
            //     flex: 50%;
            //     width: 160px;
            //     height: 110px;

            //   }
            // }
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
              }
            }
        }
        
      }
    }
    .hotel_size{
      margin: 50px 0px 40px;
    }
    .hotel_location{
      height: 360px;
      .map{
        float:left;
        height: 360px;
        width: 650px;
        &::after{
          clear: both;
          content: '';
        }
      }
      .location_list{
        float: right;
        padding: 0 0 0 20px;
        height: 360px;
        width:350px;
        background: #fff;
          &::after{
          clear: both;
          content: '';
        }
      }
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