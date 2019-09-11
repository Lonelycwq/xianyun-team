import { Message } from 'element-ui'
// 用于处理axios的请求拦截插件
export default ({ $axios, redirect }) => {
  // 拦截错误，onError用于错误监听
  $axios.onError((res) => {
    // 返回一个错误的对象，对象下有一个response属性可以访问错误信息
    // 结构出错误信息和状态码
    const { message, statusCode } = res.response.data
    if (statusCode === 400) {
      Message.error(message)
    }
    if (statusCode === 401 || statusCode === 403) {
      Message.error('请先登录!')
      redirect('/user/login')
    }
  })
}
