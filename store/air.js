// state 代表数据
// mutations 同步修改state的数据
// actions 异步修改state的数据

// 使用export const暴露state
export const state = {
  infoData: {
    seat_infos: {}
  },
  allPrice: 0
}
export const mutations = {
  // 设置用户信息,mutations下的方法第一个参数固定为state,第二个参数data为传入的参数
  setInfoData (state, data) {
    // 将仓库的infoData重新赋值为传入的值
    state.infoData = data
  },
  setAllPrice (state, price) {
    // 将仓库的allPrice重新赋值为传入的值
    state.allPrice = price
  }
}
