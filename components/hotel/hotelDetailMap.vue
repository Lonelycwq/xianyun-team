<template>
  <div id='box'>
  <div id="container" style="float:left">
  </div>
    <el-tabs class="tab" id="tab" v-model="activeName" style="float:right;padding: 0 0 0 20px;width:330px;" @tab-click="tabChangeDisplay">
    <el-tab-pane label="风景" name="scenic" class="scenic_bar">
      <ul class="tab_list">
        <li class="tab_row" :id="'tab'+index"
          v-for="(item,index) in scenicDisArr"
          :key="index"
          @mouseenter="handleMouseEnter(item,index)"
          >
          <span>{{item[2]}}</span>
          <span>{{item[3]}}公里</span>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="交通" name="traffic" class="traffic_bar">
      <ul class="tab_list">
        <li class="tab_row"
          v-for="(item,index) in trafficDisArr"
          :key="index"
          @mouseenter="handleMouseEnter(item,index)"
          >
          <span>{{item[2]}}</span>
          <span>{{item[3]}}公里</span>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeName: 'scenic',
      // 景点数据
      scenicData:{},
      scenicArr:[],
      scenicDisArr:[],
      // 交通数据
      trafficData:{},
      trafficArr:[],
      trafficDisArr:[]
    }
  },
  watch: {
    // 01.监听地图显示的数据源
    '$store.state.hotel.displayArr'(newVal, oldVal){
      this.loadMapToggle()
    },
    // 监听鼠标触发的坐标（经度），监听经纬度一个即可
    // '$store.state.hotel.changeLonData'(newVal, oldVal){
    //   this.loadMapChangeCenter()
    // },
    // 02.监听鼠标触发的坐标（纬度）
    '$store.state.hotel.changeLatData'(newVal, oldVal){
      this.loadMapChangeCenter()
    }
  },
  mounted(){
      setTimeout( ()=>{
      this.$store.commit('hotel/setDisplayArr', this.$store.state.hotel.scenicDisArr)
      // 进入页面加载初始地图,进入风景地图
      // ----------------------获取城市的基本数据-----------------------
      const { location } = this.$store.state.hotel.hotelData
      // 获取城市坐标
      var lat = location.latitude
      var lon = location.longitude
      // 获取城市
      var city =  this.$store.state.hotel.hotelData.real_city
      // 采用闭包缓存数据，否则遍历的时候会报错
      var changeDispalyArr = this.$store.state.hotel.scenicDisArr
      // ----------------------获取初始数据-----------------------
      var cityLocationArr = [lon,lat]
      // 获取风景数据
      this.getData(city,cityLocationArr,'风景名胜')
      // 获取交通数据
      this.getData(city,cityLocationArr,'交通设施服务')
      // ----------------------构建地图部分-----------------------
      window.onLoad  = function(){
        changeDispalyArr = typeof(changeDispalyArr) === 'object' && changeDispalyArr.length >=0 ? changeDispalyArr : [[ , ]]
        //中心点坐标
        var lonCenter = changeDispalyArr[0][0]
        var latCenter = changeDispalyArr[0][1]
        var map =  new AMap.Map('container',
          {
            zoom: 12,//级别
            center: [lonCenter, latCenter],//中心点坐标
          })
        // ----------------------添加点标记-----------------------
        // 遍历数组进行生成点标记
        var temp =[]
        var content
        var marker
        var markList = []
        changeDispalyArr.forEach( (e,i) =>{
          if(i === 0){
            content = `<div class="active">${i + 1}</div>`
          } else {
            content = `<div class="marker">${i + 1}</div>`
          }
          marker = new AMap.Marker({
            content: content,  // 自定义点标记覆盖物内容
            position:  [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`//设置title效果
          })
          markList.push(marker)
        })
          // 将创建的点标记添加到已有的地图实例：
          map.add(markList)
          // 移除已创建的 marker
          // map.remove(marker)
      }
      // ----------------------配置基础文件-----------------------
      var url =  'https://webapi.amap.com/maps?v=1.4.15&key=cedd1080cbba395ba9431a824814fec1&callback=onLoad'
      var api =  document.createElement('script')
      api.charset ='utf-8'
      api.src = url
      document.head.appendChild(api)
    },100)
  },
  methods:{
    // 01.封装请求风景和交通的数据（数组：[坐标、名称]）------内部调用 getLocation（）处理好数据，返回一个数组（数组：[坐标、名称、距离]）
    getData(city,arr,type){
          this.$axios({
            url:'https://restapi.amap.com/v3/place/text',
            params:{
              keyword:'',
              city:city,
              location:arr,
              types:type,
              output:'json',
              page:1,
              offset:10,
              key:'55d9c901fc7e39012720304c9e599960'//每天2000使用额度，用完了会报错，请更换新的web服务的key
              }
          })
          .then( res=>{
            if(res.status === 200){
              const { data } = res
              if(type==='风景名胜'){
                this.scenicData = data
                const { pois } = data
                var scenicArr = []
                var arr = []
                pois.forEach( e => {
                  const { location , name } = e
                  arr = location.split(',').map( m =>{
                    return +m
                  })
                  arr.unshift(name)
                  scenicArr.push(arr)
                })
                this.scenicArr = scenicArr
                // console.log("风景数据：",scenicArr)

                // 调用方法获取风景名胜坐标数组
                this.getLocation(this.scenicArr,'风景名胜')
              }else {
                this.trafficData = data
                const { pois } = data
                var trafficArr = []
                var arr = []
                pois.forEach( e => {
                  const { location , name } = e
                  arr = location.split(',').map( m =>{
                    return +m
                  })
                  arr.unshift(name)
                  trafficArr.push(arr)
                })
                this.trafficArr = trafficArr
                // console.log("交通数据：",trafficArr)

                // 调用方法获取交通设施服务坐标数组
                this.getLocation(this.trafficArr,'交通设施服务')
              }
            }
          })
    },
    // 02.处理获取两坐标间的距离，返回一个数组（数组：[坐标、名称、距离]）
    getLocation(arrRoot,type){
      // 给个初始值，避免报错
      arrRoot = typeof(arrRoot)=== 'object' && arrRoot.length >=0 ? arrRoot : []
      const { location } =  this.$store.state.hotel.hotelData
      // 获取城市坐标
      var lat = location.latitude
      var lon = location.longitude
      var p1 = [lon, lat]
      var arrData =[]
      arrRoot.forEach( e =>{
        const [ temp ,...locationArr ] = e
        var newArr = [temp]
        // 保留两位小数点
        var distance = Math.round(AMap.GeometryUtil.distance(p1,locationArr) /10)/100
        if(String(distance).length === 2){
          distance = String(distance).concat(".00")
        } else if(String(distance).length === 4){
          distance = String(distance).concat('0')
        } else {
          distance
        }
        // 添加坐标数据
        newArr.unshift(...locationArr)
        // 添加距离值
        newArr.push(distance)
        // 加入数组中
        arrData.push(newArr)
      })
      if(type === "风景名胜"){
        this.scenicDisArr = arrData
        this.$store.commit('hotel/setScenicDisArr', arrData)
        // this.$store.commit('hotel/setDisplayArr', arrData)
      } else {
        this.trafficDisArr = arrData
        this.$store.commit('hotel/setTrafficDisArr', arrData)
        // this.$store.commit('hotel/setDisplayArr', arrData)
      }
    },
    // 03.切换修改地图显示的数据源
    tabChangeDisplay(item){
      // console.log(item)
      this.activeName = item.paneName
      if(this.activeName === "scenic" ){
        // this.$store.commit('hotel/setScenicDisArr',this.scenicDisArr)
        this.$store.commit('hotel/setDisplayArr',this.scenicDisArr)
      } else {
        // this.$store.commit('hotel/setTrafficDisArr',this.trafficDisArr)
        this.$store.commit('hotel/setDisplayArr',this.trafficDisArr)
      }
    },
    // 04.进入页面时初始化地图
    loadMapToggle(){
      // 进入页面加载初始地图,进入风景地图
      // ----------------------获取城市的基本数据-----------------------
      const { location } = this.$store.state.hotel.hotelData
      // 获取城市坐标
      var lat = location.latitude
      var lon = location.longitude
      // 获取城市
      var city =  this.$store.state.hotel.hotelData.real_city
      // 采用闭包缓存数据，否则遍历的时候会报错
      var changeDispalyArr = this.$store.state.hotel.displayArr
      // ----------------------获取初始数据-----------------------
      var cityLocationArr = [lon,lat]
      // 获取风景数据
      this.getData(city,cityLocationArr,'风景名胜')
      // 获取交通数据
      this.getData(city,cityLocationArr,'交通设施服务')
      // ----------------------构建地图部分-----------------------
      window.onLoad  = function(){
        changeDispalyArr = typeof(changeDispalyArr)=== 'object' && changeDispalyArr.length >=0 ? changeDispalyArr : [[ , ]]
        //中心点坐标
        var lonCenter = changeDispalyArr[0][0]
        var latCenter = changeDispalyArr[0][1]
        var map =  new AMap.Map('container',
          {
            zoom: 12,//级别
            center: [lonCenter, latCenter],//中心点坐标
          })
        // ----------------------添加点标记-----------------------
        // 遍历数组进行生成点标记
        var content
        var marker
        var markList = []
        changeDispalyArr.forEach( (e,i) =>{
          if(i === 0){
            content = `<div class="active">${i + 1}</div>`
          } else {
            content = `<div class="marker">${i + 1}</div>`
          }
          marker = new AMap.Marker({
            content: content,  // 自定义点标记覆盖物内容
            position:  [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`//设置title效果
          })
          markList.push(marker)
        })
          // 将创建的点标记添加到已有的地图实例：
          map.add(markList)
          // 移除已创建的 marker
          // map.remove(marker)
      }
      // ----------------------配置基础文件-----------------------
      var url =  'https://webapi.amap.com/maps?v=1.4.15&key=cedd1080cbba395ba9431a824814fec1&callback=onLoad'
      var api =  document.createElement('script')
      api.charset ='utf-8'
      api.src = url
      document.head.appendChild(api)
    },
    // v1版（仅供参考）
    loadMapChange(){
      // 进入页面加载初始地图,进入风景地图
      // ----------------------获取城市的基本数据-----------------------
      const { location } = this.$store.state.hotel.hotelData
      // 获取城市坐标
      var lat = location.latitude
      var lon = location.longitude
      // 构建动态坐标
      var _lonCenter = this.$store.state.hotel.changeLonData
      var _latCenter = this.$store.state.hotel.changeLatData
      var _index = this.$store.state.hotel.changeRemarkerData
      // 获取城市
      var city =  this.$store.state.hotel.hotelData.real_city
      // 采用闭包缓存数据，否则遍历的时候会报错
      var changeDispalyArr = this.$store.state.hotel.displayArr
      // ----------------------获取初始数据-----------------------
      var cityLocationArr = [lon,lat]
      // 获取风景数据
      this.getData(city,cityLocationArr,'风景名胜')
      // 获取交通数据
      this.getData(city,cityLocationArr,'交通设施服务')
      // ----------------------构建地图部分-----------------------
      window.onLoad  = function(){
        changeDispalyArr = typeof(changeDispalyArr)=== 'object' && changeDispalyArr.length >=0 ? changeDispalyArr : [[ , ]]
        //中心点坐标
        // var lonCenter = changeDispalyArr[0][0]
        // var latCenter = changeDispalyArr[0][1]
        var lonCenter = _lonCenter
        var latCenter = _latCenter
        var map =  new AMap.Map('container',
          {
            zoom: 12,//级别
            center: [lonCenter, latCenter],//中心点坐标
          })

        // AMap.event.addDomListener(document.getElementsByClassName('tab_row'), 'mouseover', function() {
        // map.panTo([lonCenter, lonCenter])
        // })

        // ----------------------添加点标记-----------------------
        // 遍历数组进行生成点标记
        var temp =[]
        var content
        var marker
        var markList = []
        changeDispalyArr.forEach( (e,i) =>{
          if(i === _index){
            content = `<div class="active">${i + 1}</div>`
          } else {
            content = `<div class="marker">${i + 1}</div>`
          }
          marker = new AMap.Marker({
            content: content,  // 自定义点标记覆盖物内容
            position:  [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`//设置title效果
          })
          markList.push(marker)
        })
          // 将创建的点标记添加到已有的地图实例：
          map.add(markList)
          // 移除已创建的 marker
          // map.remove(marker)
      }
      // ----------------------配置基础文件-----------------------
      var url =  'https://webapi.amap.com/maps?v=1.4.15&key=cedd1080cbba395ba9431a824814fec1&callback=onLoad'
      var api =  document.createElement('script')
      api.charset ='utf-8'
      api.src = url
      document.head.appendChild(api)
    },
    // 05.动态修改地图的中心点的坐标，实现地图移动
    loadMapChangeCenter(){
      // ----------------------获取城市的基本数据-----------------------
      // 构建动态坐标
      var _lonCenter = this.$store.state.hotel.changeLonData
      var _latCenter = this.$store.state.hotel.changeLatData
      var _index = this.$store.state.hotel.changeRemarkerData
      var changeDispalyArr = this.$store.state.hotel.displayArr
      // ----------------------构建地图部分-----------------------
        var lonCenter = _lonCenter
        var latCenter = _latCenter
        var map =  new AMap.Map('container',
          {
            zoom: 12,//级别
            center: [lonCenter, latCenter],//中心点坐标
          })
        // 方法一：
        AMap.event.addDomListener(document.getElementById(`tab${_index}`), 'mouseover', function() {
          map.panTo([lonCenter, latCenter])
        })
        // 方法二：
        // document.querySelector(`#tab${_index}`).onmouseover = function() {
        //   map.setCenter([lonCenter, latCenter])
        // }

        // ----------------------添加点标记-----------------------
        // 遍历数组进行生成点标记
        var content
        var marker
        var markList = []
        changeDispalyArr.forEach( (e,i) =>{
          if(i === _index){
            content = `<div class="active">${i + 1}</div>`
          } else {
            content = `<div class="marker">${i + 1}</div>`
          }
          marker = new AMap.Marker({
            content: content,  // 自定义点标记覆盖物内容
            position:  [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`//设置title效果
          })
          markList.push(marker)
        })
          // 将创建的点标记添加到已有的地图实例：
          map.add(markList)
          // 移除已创建的 marker
          // map.remove(marker)
    },
    // 06.鼠标移入时触发，修改store里面的坐标数据
    handleMouseEnter(item,index){
      this.$store.commit('hotel/setChangeLonData',item[0])
      this.$store.commit('hotel/setChangeLatData',item[1])
      this.$store.commit('hotel/setChangeRemarkerData',index)
    }
  }
}
</script>

<style lang="less" scoped>
#container {
  position: relative;
  width:650px;
  height: 360px;
    /deep/.marker {
      z-index: 10;
      width: 22px;
      height: 36px;
      text-align: center;
      line-height: 28px;
      color: #fff;
      background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
      display: inline-block;
      background-size: 22px 36px;
    }
    /deep/.active {
      width: 35px;
      height: 54px;
      text-align: center;
      line-height: 35px;
      font-size: 25px;
      color: #fff;
      background-image: url(https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png);
      display: inline-block;
      background-size: 35px 54px;
      z-index: 99!important
    }
}
.tab{
    .tab_list{
    height: 306px;
      overflow: auto;
      .tab_row {
        margin:0px 10px 20px 10px;
        color:#666;
        font-size: 14px;
        height:19px;
        line-height: 19px;
        cursor: pointer;
        span:first-child{
          display:inline-block;
          width:210px;
        }
    }
  }
}
</style>