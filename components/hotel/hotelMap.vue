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
      <el-col :span="9">
        <el-date-picker
          v-model="valueTime"
          type="daterange"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          default-value="2010-10-01"
        ></el-date-picker>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-input placeholder="人数未定" suffix-icon="el-icon-date" v-model="inputPeople"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="getPrice">查看价格</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 简介 -->
    <el-row>
      <div class="grid-content bg-purple">
        <el-col :span="14">
          <div class="gonglve">
            <div>
              <span>区域: &nbsp;&nbsp;</span>
              <span>
                <span v-for="(item,index) in data" :key="index">{{item.area}}</span>
              </span>
            </div>
            <div>
              攻略:&nbsp;&nbsp;
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </div>

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
      stateCity: "", //城市搜索框
      valueTime: "", //时间区间选择
      inputPeople: "" //人数
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
    // console.log(this.data);

    // console.log(street);

    // 等待下面url加载完毕之后再执行
    window.onLoad = function() {
      // 创建地图， container是容器的id
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.8718107, 31.32846821] //中心点坐标
      });
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
</style>