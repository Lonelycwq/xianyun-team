<template>
  <div class="hotelList">
    <div class="list_fliter">
      <el-row type="flex" class="fliter">
        <el-col :span="8" class="fliter_price">
          <el-row type="flex">
            <el-col :span="24" class="col_font">价格</el-col>
            <el-col :span="24" style="color:#666;font-size:14px;text-align:right;">0-4000</el-col>
          </el-row>
          <!-- 滑条 -->
          <el-row>
            <el-slider v-model="value2" :max="4000"></el-slider>
          </el-row>
        </el-col>
        <!-- 住宿等级 -->
        <el-col :span="6" class="fliter_price">
          <el-row type="flex">
            <el-col :span="24" class="col_font">住宿等级</el-col>
          </el-row>
          <el-row class="level" type="flex">
            <el-dropdown style="width:100%;" @command="handleCommand">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">{{levels || '不限'}}</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width:150px;">
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.levels"
                  :key="index"
                  :command="item.name"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
        <!-- 住宿类型 -->
        <el-col :span="6" class="fliter_price">
          <el-row type="flex">
            <el-col :span="24" class="col_font">住宿类型</el-col>
          </el-row>
          <el-row class="level" type="flex">
            <el-dropdown style="width:100%;">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">不限</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width:150px;">
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.types"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
        <!-- 酒店设施 -->
        <el-col :span="6" class="fliter_price">
          <el-row type="flex">
            <el-col :span="24" class="col_font">酒店设施</el-col>
          </el-row>
          <el-row class="level" type="flex">
            <el-dropdown style="width:100%;">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">不限</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width:150px;">
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.assets"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
        <!-- 酒店品牌 -->
        <el-col :span="6" class="fliter_price">
          <el-row type="flex">
            <el-col :span="24" class="col_font">酒店品牌</el-col>
          </el-row>
          <el-row class="level" type="flex">
            <el-dropdown style="width:100%;">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">不限</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu
                slot="dropdown"
                style="width:150px;overflow: auto;max-height: 230px;"
              >
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.brands"
                  :key="index"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 酒店列表 -->
    <div class="hotel_list" v-if="dataList.length">
      <div>
        <div class="hotel_item" v-for="(item,index) in dataList" :key="index">
          <el-row>
            <el-col :span="8" @click.native="handleHotelData(item)">
              <nuxt-link to="#">
                <img class="pic" :src="`${item.photos}`" :alt="`${item.name}`" />
              </nuxt-link>
            </el-col>
            <el-col :span="10" style="padding-left:15px;" @click.native="handleHotelData(item)">
              <h4>
                <nuxt-link to="#" class="hotel_title">{{item.name}}</nuxt-link>
              </h4>
              <span class="pinyin">{{item.alias}}</span>
              <!-- 酒店星级 -->
              <span v-if="item.hotellevel" :title="`${item.hotellevel.name}级`">
                <i
                  data-v-7c1a9d7e
                  class="iconfont iconhuangguan"
                  v-for="num in item.hotellevel.level"
                  :key="num"
                ></i>
              </span>

              <!-- <i></i>
              <i></i>-->
              <span class="pinyin">{{item.hoteltype.name}}</span>
              <div style="margin-top:15px;">
                <el-col :span="10">
                  <el-rate
                    v-model="item.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </el-col>
                <el-col :span="7">
                  <span class="height-light" style="color: rgb(255, 153, 0);">{{item.all_remarks}}</span>
                  条评论
                </el-col>
                <el-col :span="7">
                  <span class="height-light" style="color: rgb(255, 153, 0);">15</span>
                  篇游记
                </el-col>
              </div>
              <div class="location-row">
                <i class="iconfont iconlocation icon_style"></i>
                位于: {{item.address}}
              </div>
            </el-col>
            <!-- 表格 -->
            <el-col :span="6">
              <a href="https://hotels.ctrip.com/hotel/694679.html" target="_blank">
                <el-table :data="item.products" :show-header="false" style="margin-top:20px;">
                  <el-table-column prop="name"></el-table-column>
                  <el-table-column align="right">
                    <template slot-scope="scope">
                      <span
                        data-v-0a769ebc
                        class="height-light larger"
                        style="color: #f90;font-size: larger;"
                      >￥{{scope.row.price}}</span>起
                      <i data-v-0a769ebc class="el-icon-arrow-right"></i>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="date"></el-table-column> -->
                </el-table>
              </a>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      small
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //酒店选项
      hotelOption: {},
      products: [],
      //滑条
      value2: 4000,
      //多选条件
      levels: null, // 酒店等级
      types: [], // 酒店类型
      assets: [], // 酒店设施
      brands: [], // 酒店品牌
      // //星级
      // value: 3.5
      //分页
      total: 0,
      pageSize: 5,
      pageIndex: 1,
      dataList: []
    };
  },
  props: {
    data: {
      type: Object,
      default: 0
    }
  },
  methods: {
    //选择下拉菜单是触发
    handleCommand(val) {
      this.levels = val;
      console.log(val);
      console.log(this.$router);
    },
    // 传递数据给酒店详情页
    handleHotelData(data) {
      this.$store.commit("hotel/setHotelData", data);
      const { id, name } = data;
      this.$router.push({
        path: "/hotel/detail",
        query: { id, name }
      });
    },
    //切换页数
    handleCurrentChange(val) {
      this.pageIndex = val;
      // 按照数学公式切换dataList的值
      this.dataList = this.data.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    //分页设置
    setIndex() {
      this.total = this.data.length;
      this.dataList = this.data.slice(0, this.pageSize);
    }
  },
  mounted() {
    //获取酒店选项
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      this.hotelOption = res.data.data;
      setTimeout(() => {
        this.setIndex();
      }, 10);
    });
  }
};
</script>

<style lang='less'>
.hotelList {
  width: 1000px;
  margin: 0 auto;
  .list_fliter {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 20px;
    border: 1px solid rgb(221, 221, 221);
    .fliter {
      margin: 0 -20px;
      .fliter_price {
        padding: 5px 20px;
        border-left: 1px solid rgb(221, 221, 221);
        &:nth-child(1) {
          border-left: none;
        }
        .col_font {
          color: #666;
          font-size: 14px;
        }
        .level {
          height: 38px;
          align-items: center;
          .el-dropdown-text {
            display: flex;
            flex: 1;
            width: 100%;
            span {
              flex: 1;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
  .hotel_list {
    .hotel_item {
      padding: 25px 0;
      border-bottom: 1px solid rgb(238, 238, 238);
      .hotel_title {
        font-size: 24px;
        font-weight: 400;
      }
      .pinyin {
        font-size: 16px;
        color: #999;
      }
      .location-row {
        font-size: 14px;
        color: #666;
      }
      .pic {
        width: 100%;
        height: 200px;
      }
    }
  }
}
//下拉菜单
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>