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
            <el-dropdown style="width:100%;" @command="handleLevel">
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
          <el-row class="types" type="flex">
            <el-dropdown style="width:100%;" @command="handleTypes">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">{{types || '不限'}}</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width:150px;">
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.types"
                  :key="index"
                  :command="{name:item.name,id:item.id}"
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
          <el-row class="assets" type="flex">
            <el-dropdown style="width:100%;" @command="handleAssets">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">{{assets || '不限'}}</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width:150px;">
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.assets"
                  :key="index"
                  :command="{name:item.name,id:item.id}"
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
          <el-row class="brands" type="flex">
            <el-dropdown style="width:100%;" @command="handleBrands">
              <div class="el-dropdown-text">
                <span class="el-dropdown-link col_font">{{brands || '不限'}}</span>
                <i class="el-icon-arrow-down el-icon--right" style="align-self: center;"></i>
              </div>
              <el-dropdown-menu
                slot="dropdown"
                style="width:150px;overflow: auto;max-height: 230px;"
              >
                <el-dropdown-item
                  v-for="(item,index) in hotelOption.brands"
                  :key="index"
                  :command="{name:item.name,id:item.id}"
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
    <div v-else>没有找到相应的酒店</div>
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
      types: null, // 酒店类型
      assets: null, // 酒店设施
      brands: null, // 酒店品牌
      // //星级
      // value: 3.5
      //分页
      total: 0,
      pageSize: 5,
      pageIndex: 1,
      dataList: [],
      fliterList: [],
      value: 0
    };
  },
  props: {
    data: {
      type: Array,
      default: 0
    }
  },
  watch: {
    $route(to, from) {
      // console.log(this.$route);
      this.$axios({
        url: "/hotels",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.fliterList = { ...this.dataList };
        this.dataList = res.data.data;
      });
    }
  },
  methods: {
    //选择下拉菜单是触发：酒店等级
    handleLevel(val) {
      this.levels = val;
      let url = this.$route.fullPath;
      if (Object.keys(this.$route.query).indexOf("hotellevel") == -1) {
        url = `${url}&hotellevel=${parseInt(val)}`;
      } else {
        
        let query = this.$router.history.current.query;
        let path = this.$router.history.current.path;
        this.$router.push({
          path,
          query: {
            city: 74,
            hotellevel: parseInt(val),
            // price_lt: this.value2
          }
        });
        // url.replace(`hoteltype=${this.$route.query.hoteltype}`,`hoteltype=${val}`)
      }
        this.$router.push(url);

    },
    //酒店类型
    handleTypes(val) {
      this.types = val.name;
      let url = this.$route.fullPath;
      // console.log(val)
      if (Object.keys(this.$route.query).indexOf("hoteltype") == -1) {
        url = `${url}&hoteltype=${parseInt(val.id)}`;
        this.$router.push(url);
      } else {
        let query = this.$router.history.current.query;
        let path = this.$router.history.current.path;
        this.$router.push({
          path,
          query: {
            city: 74,
            hoteltype: parseInt(val.id),
            // price_lt: this.value2
          }
        });
      }
    },
    //酒店设施
    handleAssets(val) {
      this.assets = val.name;
      // console.log(val);
      let url = this.$route.fullPath;
      // console.log(val)
      if (Object.keys(this.$route.query).indexOf("hotelasset") == -1) {
        url = `${url}&hotelasset=${parseInt(val.id)}`;
        this.$router.push(url);
      } else {
        let query = this.$router.history.current.query;
        let path = this.$router.history.current.path;
        this.$router.push({
          path,
          query: {
            city: 74,
            hotelasset: parseInt(val.id),
            // price_lt: this.value2
          }
        });
      }
    },
    //酒店品牌
    handleBrands(val) {
      this.brands = val.name;
      let url = this.$route.fullPath;
      if (Object.keys(this.$route.query).indexOf("hotelbrand") == -1) {
        url = `${url}&hotelbrand=${parseInt(val.id)}`;
        this.$router.push(url);
      } else {
        let query = this.$router.history.current.query;
        let path = this.$router.history.current.path;
        this.$router.push({
          path,
          query: {
            city: 74,
            hotelbrand: parseInt(val.id),
            // price_lt: this.value2
          }
        });
      }
    },
    // 传递数据给酒店详情页
    handleHotelData(data) {
      this.$store.commit("hotel/setHotelData", data);
      this.$store.commit("hotel/resetData");
      this.loadMap();
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
    },
    // ----------------------预先加载酒店详情页的数据-------------------------
    // 封装请求风景和交通的数据,并且处理好返回一个数组
    getData(city, arr, type) {
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keyword: "",
          city: city,
          location: arr,
          types: type,
          output: "json",
          page: 1,
          offset: 10,
          key: "55d9c901fc7e39012720304c9e599960" //每天2000使用额度，用完了会报错，请更换新的web服务的key
        }
      }).then(res => {
        if (res.status === 200) {
          const { data } = res;
          if (type === "风景名胜") {
            this.scenicData = data;
            const { pois } = data;
            var scenicArr = [];
            var arr = [];
            pois.forEach(e => {
              const { location, name } = e;
              arr = location.split(",").map(m => {
                return +m;
              });
              arr.unshift(name);
              scenicArr.push(arr);
            });
            this.scenicArr = scenicArr;
            // console.log("风景数据：",scenicArr)
            this.getLocation(this.scenicArr, "风景名胜");
          } else {
            this.trafficData = data;
            const { pois } = data;
            var trafficArr = [];
            var arr = [];
            pois.forEach(e => {
              const { location, name } = e;
              arr = location.split(",").map(m => {
                return +m;
              });
              arr.unshift(name);
              trafficArr.push(arr);
            });
            this.trafficArr = trafficArr;
            // console.log("交通数据：",trafficArr)
            this.getLocation(this.trafficArr, "交通设施服务");
          }
        }
      });
    },
    // 处理获取两坐标间的距离，返回一个 “坐标，名称，距离”的数组封装方法
    getLocation(arrRoot, type) {
      // 给个初始值，避免报错
      arrRoot =
        typeof arrRoot === "object" && arrRoot.length >= 0 ? arrRoot : [];
      const { location } = this.$store.state.hotel.hotelData;
      // 获取城市坐标
      var lat = location.latitude;
      var lon = location.longitude;
      var p1 = [lon, lat];
      var arrData = [];
      arrRoot.forEach(e => {
        const [temp, ...locationArr] = e;
        var newArr = [temp];
        // 保留两位小数点
        var distance =
          Math.round(AMap.GeometryUtil.distance(p1, locationArr) / 10) / 100;
        if (String(distance).length === 2) {
          distance = String(distance).concat(".00");
        } else if (String(distance).length === 4) {
          distance = String(distance).concat("0");
        } else {
          distance;
        }
        // 添加坐标数据
        newArr.unshift(...locationArr);
        // 添加距离值
        newArr.push(distance);
        // 加入数组中
        arrData.push(newArr);
      });
      if (type === "风景名胜") {
        this.scenicDisArr = arrData;
        this.$store.commit("hotel/setScenicDisArr", arrData);
        // this.$store.commit('hotel/setDisplayArr', arrData)
      } else {
        this.trafficDisArr = arrData;
        this.$store.commit("hotel/setTrafficDisArr", arrData);
        // this.$store.commit('hotel/setDisplayArr', arrData)
      }
    },
    loadMap() {
      // 进入页面加载初始地图,进入风景地图
      // ----------------------获取城市的基本数据-----------------------
      const { location } = this.$store.state.hotel.hotelData;
      // 获取城市坐标
      var lat = location.latitude;
      var lon = location.longitude;
      // 获取城市
      var city = this.$store.state.hotel.hotelData.real_city;
      // 采用闭包缓存数据，否则遍历的时候会报错
      var changeDispalyArr = this.$store.state.hotel.displayArr;
      // ----------------------获取初始数据-----------------------
      var cityLocationArr = [lon, lat];
      // 获取风景数据
      this.getData(city, cityLocationArr, "风景名胜");
      // 获取交通数据
      this.getData(city, cityLocationArr, "交通设施服务");
      // ----------------------构建地图部分-----------------------
      window.onLoad = function() {
        changeDispalyArr =
          typeof changeDispalyArr === "object" && changeDispalyArr.length >= 0
            ? changeDispalyArr
            : [[,]];
        //中心点坐标
        var lonCenter = changeDispalyArr[0][0];
        var latCenter = changeDispalyArr[0][1];
        var map = new AMap.Map("container", {
          zoom: 12, //级别
          center: [lonCenter, latCenter] //中心点坐标
        });
        // ----------------------添加点标记-----------------------
        // 遍历数组进行生成点标记
        var temp = [];
        var content;
        var marker;
        var markList = [];
        changeDispalyArr.forEach((e, i) => {
          if (i === 0) {
            content = `<div class="active">${i + 1}</div>`;
          } else {
            content = `<div class="marker">${i + 1}</div>`;
          }
          marker = new AMap.Marker({
            content: content, // 自定义点标记覆盖物内容
            position: [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`
          });
          markList.push(marker);
        });
        // 将创建的点标记添加到已有的地图实例：
        map.add(markList);
        // 移除已创建的 marker
        // map.remove(marker)
      };
      // ----------------------配置基础文件-----------------------
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=cedd1080cbba395ba9431a824814fec1&callback=onLoad";
      var api = document.createElement("script");
      api.charset = "utf-8";
      api.src = url;
      document.head.appendChild(api);
    }
  },
  mounted() {
    //获取酒店选项
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      this.hotelOption = res.data.data;
      console.log(this.hotelOption);
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
        .level,
        .types,
        .brands,
        .assets {
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