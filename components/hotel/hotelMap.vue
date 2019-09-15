<template>
  <div class="bbox">
    <!-- 面包屑 -->
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索输入框 -->
    <el-row :gutter="20" class="inputData">
      <!-- 搜索城市 -->
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-autocomplete
            class="inline-input"
            v-model="stateCity"
            :fetch-suggestions="querySearch"
            placeholder="南京"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-col>
      <!-- 入住离店日期 -->
      <el-col :span="9">
        <el-date-picker
          v-model="valueTime"
          type="daterange"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          default-value="2010-10-01"
        ></el-date-picker>
      </el-col>
      <!-- 选择人数 -->
      <el-col :span="5">
        <div class="grid-content bg-purple number-A" >
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-date"
            v-model="inputPeople"
            @focus="isShow=true"
            @blur="click_P"
          ></el-input>
        </div>
      </el-col>
      <!-- 查看价格 -->
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="getPrice">查看价格</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 人数未定拓展 -->
    <el-card class="number-P clearfix" v-show="isShow">
      <span>每间</span>
      <el-select v-model="value1" placeholder="2成人" style="width: 85px" class="value1">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value2" placeholder="儿童" style="width: 85px" class="value2">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="clearfix">
        <span class="xian"></span>
        <el-button type="primary" class="sure_P">确定</el-button>
      </div>
    </el-card>
    <!-- 简介 -->
    <el-row>
      <div class="grid-content bg-purple">
        <el-col :span="14">
          <div class="gonglve">
            <!-- 区域 -->
            <div class="quyuHeight" ref="show">
              <span class="gl-1">区域: &nbsp;&nbsp;</span>
              <span class="gl-2">
                <span v-for="(item,index) in this.city" :key="index">
                  <a href="#" class="item-name">{{item.name}}</a>
                </span>
              </span>
            </div>
            <a href="#" @click="aaaa" class="pack_up" v-if="!isShow2">展开</a>
            <a href="#" @click="aaaa" class="pack_up" v-if="isShow2">收起</a>
            <!-- 攻略 -->
            <div>
              <span class="gl-1">攻略: &nbsp;&nbsp;</span>
              <span
                class="gl-2"
              >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
            </div>
            <!-- 均价 -->
            <div>
              均价:&nbsp;&nbsp;
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>¥332
              &nbsp;
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>¥521
              &nbsp;
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>¥768
            </div>
          </div>
        </el-col>
      </div>
      <el-col :span="10">
        <div class="grid-content bg-purple-light">
          <div id="container"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false, //显示隐藏选择人数
      isShow2: false, //地区显示和隐藏
      isShow3:false,
      stateCity: "", //城市搜索框
      valueTime: "", //时间区间选择
      inputPeople: "", //人数
      city: [], //放所有地点的数组
      position: [], //放所有城市坐标的数组
      options1: [
        {
          //选择成人
          value: "选项1",
          label: "1"
        },
        {
          value: "选项2",
          label: "2"
        },
        {
          value: "选项3",
          label: "3"
        },
        {
          value: "选项4",
          label: "4"
        },
        {
          value: "选项5",
          label: "5"
        }
      ],
      value1: "",
      value2: "",
      options2: [
        {
          //选择儿童
          value: "选项1",
          label: "1"
        },
        {
          value: "选项2",
          label: "2"
        },
        {
          value: "选项3",
          label: "3"
        },
        {
          value: "选项4",
          label: "4"
        },
        {
          value: "选项5",
          label: "5"
        }
      ]
    };
  },
  // 接收父组件的数据
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    abc(){

    },
    click_P(){
     this.isShow=!this.isShow
    },
    aaaa() {
      this.isShow2 = !this.isShow2;
      if (this.isShow2) {
        this.$refs.show.style.height = "130px";
      } else {
        this.$refs.show.style.height = "40px";
      }
    },
    // 点击人数未定时触发显示选择框
    // 城市位置发生改变时触发
    changeCity() {
      console.log(111);
    },
    //触发城市的搜索建议事件
    querySearch(value, cb) {
      if (!value) {
        // 传递空数组不会出现下拉框
        cb([]);
        return;
      }

      // 根据用户的输入请求城市
      this.$axios({
        url: "/airs/city",
        // get参数
        params: {
          // 输入框的关键字
          name: value
        }
      }).then(res => {
        // 数组
        const { data } = res.data;

        // 给数组中每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性
          v.value = v.name.replace("市", "");
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
        });

        // 把转换后的数组赋值给data
        this.departData = newData;

        //显示到下拉列表中
        cb(newData);
      });
    },
    // 点击建议栏选中项的时候触发
    handleSelect() {
      // console.log(this.stateCity);
    },
    // 点击触发查看价格
    getPrice() {
      console.log(this.data);
    }
  },
  mounted() {
    // 获取城市区域所有列表
    this.$axios({
      url: "cities?name=南京"
    }).then(res => {
      this.city = res.data.data[0].scenics;
      // console.log(this.city);
    });
    // console.log(this.data);

    // console.log(street);

    // 等待下面url加载完毕之后再执行
    window.onLoad = function() {
      // 创建地图， container是容器的id
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.39, 39.9] //中心点坐标
      });
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=18308f708f6d842cfb0043a2c984009e&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    // setTimeout(() => {
    //   console.log(this.data)
    //   let street = this.data.forEach(v => {
    //     let vvs = v.area;
    //     console.log(vvs);
    //     return vvs;
    //   });
    // console.log(street);
    // }, 10);
  }
};
</script>

<style lang="less" scoped>
.bbox {
  margin: 0 auto;
  width: 1000px;
  font-size: 14px;
  color: #666666;
  position: relative;
}
#container {
  width: 400px;
  height: 280px;
}
.mianbao {
  margin: 20px 0 20px;
}
.grid-content div {
  margin-bottom: 20px;
}
.iconhuangguan {
  color: #ff9900;
}
.gonglve {
  padding-right: 10px;
  span {
    margin-right: 8px;
  }
}
.quyuHeight {
  height: 40px;
  overflow: hidden;
}
.pack_up {
  margin-left: 53px;
  color: #0099ff;
  text-decoration: underline;
}
.gl-1 {
  float: left;
}
.gl-2 {
  display: inline-block;
  width: 500px;
  height: 100px;
}
.item-name {
  &:hover {
    text-decoration: underline;
    color: #0099ff;
  }
}
.number-P {
  height: 120px;
  width: 300px;
  background-color: #fff;
  z-index: 12;
  position: absolute;
  left: 593px;
  top: 85px;
  .xian {
    display: block;
    border-bottom: 1px #ccc solid;
    padding: 5px 0 10px;
    margin-bottom: 5px;
  }
  .sure_P {
    float: right;
    height: 30px;
    line-height: 8px;
  }
}
.clearfix::after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}
.value1 {
  margin-left: 50px;
}
</style>