<template>
  <div id='box'>
  <div id="container" style="float:left;">
  </div>
  <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
  <el-tabs v-model="activeName" style="float:right;padding: 0 0 0 20px;width:330px;">
    <el-tab-pane label="风景" name="first">风景</el-tab-pane>
    <el-tab-pane label="交通" name="second">交通</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  mounted(){
    setTimeout(async ()=>{
    const { location } =this.$store.state.hotel.hotelData
    var lat = location.latitude
    var lon = location.longitude
    window.onLoad  = await function(){
    // var map = new AMap.Map('container',
    var map = new AMap.Map('container',
    {
      zoom:12,//级别
      center: [lon, lat],//中心点坐标
    })
    }
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=cedd1080cbba395ba9431a824814fec1&callback=onLoad'
      var api = document.createElement('script')
      api.charset ='utf-8'
      api.src = url
      document.head.appendChild(api);

    // await AMap.plugin(['AMap.Geocoder'],function(){//异步同时加载多个插件
    //     var geocoder = new AMap.Geocoder({
    //     city: "全国", //城市，默认：“全国”
    //     radius: 1000 //范围，默认：500
    //     });
    //     var local,loc_value
    //     //地理编码,返回地理编码结果
    //     geocoder.getLocation("江苏省南京市江宁滨江开发区", function(status, result) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             loc_value = result.geocodes["0"].location
    //             local = [loc_value.getLng(),loc_value.getLat()]
    //         }
    //         console.log(local)

    //         lat = local[1]
    //         lon = local[0]
    //     });
    //     });
        this.$axios({
          url:'https://restapi.amap.com/v3/place/text',
          params:{
            keyword:'',
            city:'南京',
            location:[118,31],
            types:'风景名胜',
            output:'json',
            page:1,
            offset:10,
            key:'55d9c901fc7e39012720304c9e599960'
          }
        })
        .then( res=>{
          console.log("风景", res )
        } )
        this.$axios({
          url:'https://restapi.amap.com/v3/place/text',
          params:{
            keyword:'',
            city:'南京',
            location:[118,31],
            types:'交通设施服务',
            output:'json',
            page:1,
            offset:10,
            key:'55d9c901fc7e39012720304c9e599960'
          }
        })
        .then( res=>{
          console.log("交通",res )
        } )
    },10)
  }
}
</script>

<style lang="less" scoped>
#container {
  width:650px;
  height: 360px;
  } 

</style>