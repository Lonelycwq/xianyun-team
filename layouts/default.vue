<template>
  <div>
    <Header />
    <!-- 页面占位符 -->
    <nuxt />
    <Footer />
  </div>
</template>
<script>
// 引入头部组件
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  // 注册组件
  components: {
    Header, Footer
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*{
  padding: 0;
  margin: 0;
}
ul,li,ol{
  list-style: none;
}
i,em{
  font-style: normal;
}
a{
  /* 继承父级属性 */
  color: inherit;
  text-decoration: none;
}
a:hover{
  text-decoration: none;
}
</style>
