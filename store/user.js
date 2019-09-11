// state 代表数据
// mutations 同步修改state的数据
// actions 异步修改state的数据

// 使用export const暴露state
export const state = {
  userInfo: {
    token: '',
    user: {}
  },
  airList: {}
}
export const mutations = {
  // 设置用户信息,mutations下的方法第一个参数固定为state,第二个参数data为传入的参数
  setUserInfo (state, data) {
    // 将仓库的userInfo重新赋值为传入的值
    state.userInfo = data
  },
  // 用于清空userinfo
  clearUserInfo (state) {
    state.userInfo = {
      token: '',
      user: {}
    }
  },
  getAirList (state, data) {
    state.airList = data
  }
}
export const actions = {
  // 登录方法
  login ({ commit }, data) {
    // 返回登录请求返回的值
    return this.$axios({
      url: '/accounts/login',
      method: 'post',
      data
    }).then((res) => {
      // 登录成功将返回的token和用户数据存入data
      const data = res.data
      // 调用setUserInfo方法存值到store
      commit('setUserInfo', data)
      // 返回data
      return data
    })
  },
  // 注册方法
  register ({ commit }, data) {
    // 返回注册请求返回的值
    return this.$axios({
      url: '/accounts/register',
      method: 'post',
      data
    }).then((res) => {
      // 注册成功将返回的token和用户数据存入data
      const data = res.data
      // 调用setUserInfo方法存值到store
      commit('setUserInfo', data)
      // 返回data
      return data
    })
  }
}
