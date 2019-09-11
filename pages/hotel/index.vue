<template>
  <div>
    酒店模块
    <div id="container" />
  </div>
</template>

<script>
export default {
  mounted () {
    window.onLoad = function () {
      // eslint-disable-next-line no-undef
      const map = new AMap.Map('container', {
        zoom: 11, // 级别
        center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D'// 使用3D视图
      })
      // // eslint-disable-next-line no-undef
      // const marker = new AMap.Marker({
      //   position: [116.39, 39.9]// 位置
      // })
      // map.add(marker)// 添加到地图
      const content = '<div class="marker-route marker-marker-bus-from"></div>'
      // eslint-disable-next-line no-undef
      const marker = new AMap.Marker({
        content, // 自定义点标记覆盖物内容
        position: [116.397428, 39.90923], // 基点位置
        // eslint-disable-next-line no-undef
        offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
      })
      map.add(marker)
    }
    const url = 'https://webapi.amap.com/maps?v=1.4.15&key=0c88e1b02ee9dcb2db7f6a441057982d&callback=onLoad'
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>

<style lang="less" scoped>
#container {width:500px; height: 300px; }
</style>
