<template>
  <div id='box'>
  <div id="container" style="float:left">
  </div>
    <el-tabs class="tab" v-model="activeName" style="float:right;padding: 0 0 0 20px;width:330px;" @tab-click="tabChangeDisplay">
    <el-tab-pane label="风景" name="scenic" class="scenic_bar">
      <ul class="tab_list">
        <li class="tab_row"
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
    '$store.state.hotel.displayArr'(newVal, oldVal){
      this.loadMap()
    },
    '$store.state.hotel.changeLonData'(newVal, oldVal){
      this.loadMapChange()
      // console.log(this.$store.state.hotel.changeLonData,this.$store.state.hotel.changeLatData)
      // this.setCenter(this.$store.state.hotel.changeLonData,this.$store.state.hotel.changeLatData)
    },
    '$store.state.hotel.changeLatData'(newVal, oldVal){
      this.loadMapChange()
      // console.log(this.$store.state.hotel.changeLonData,this.$store.state.hotel.changeLatData)
      // this.setCenter(this.$store.state.hotel.changeLonData,this.$store.state.hotel.changeLatData)
    }
  },
  mounted(){
      setTimeout( ()=>{
      // this.activeName = this.$store.state.hotel.activeName
      // console.log('能不能显示',this.$store.state.hotel.scenicDisArr)
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
          content = `<div class="marker">${i + 1}</div>`
          marker = new AMap.Marker({
            content: content,  // 自定义点标记覆盖物内容
            position:  [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`
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
  // destroyed(){
  //   this.$store.commit('hotel/resetData')
  // },
  // updated(){
  //   this.$store.commit('hotel/resetData')
  // },
  methods:{
    // 封装请求风景和交通的数据,并且处理好返回一个数组
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
              key:'5336cc746f984fbb06224c3c376f5252'
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
                this.getLocation(this.trafficArr,'交通设施服务')
              }
            }
          })
    },
    // 处理获取两坐标间的距离，返回一个 “坐标，名称，距离”的数组封装方法
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
    // 切换显示地图数据
    tabChangeDisplay(item){
      // console.log(item)
      this.activeName = item.paneName
      // this.$store.commit('hotel/resetData')
      // console.log(this.activeName)
      if(this.activeName === "scenic" ){
        // this.$store.commit('hotel/setScenicDisArr',this.scenicDisArr)
        this.$store.commit('hotel/setDisplayArr',this.scenicDisArr)
      } else {
        // this.$store.commit('hotel/setTrafficDisArr',this.trafficDisArr)
        this.$store.commit('hotel/setDisplayArr',this.trafficDisArr)
      }
    },
    loadMap(){
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
        var temp =[]
        var content
        var marker
        var markList = []
        changeDispalyArr.forEach( (e,i) =>{
          content = `<div class="marker">${i + 1}</div>`
          marker = new AMap.Marker({
            content: content,  // 自定义点标记覆盖物内容
            position:  [e[0], e[1]], // 基点位置
            offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
            title: `${e[2]}`
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
            title: `${e[2]}`
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
    handleMouseEnter(item,index){
      this.$store.commit('hotel/setChangeLonData',item[0])
      this.$store.commit('hotel/setChangeLatData',item[1])
      this.$store.commit('hotel/setChangeRemarkerData',index)
    },
    setCenter(lon,lat){
      window.onLoad  = function(){
      var map =  new AMap.Map('container',
          {
            zoom: 12,//级别
            // center: [lonCenter, latCenter],//中心点坐标
          })
      var position = new AMap.LngLat(lon, lat)  // 标准写法
      // 简写 var position = [116, 39]; 
      map.setCenter(position)
      }
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