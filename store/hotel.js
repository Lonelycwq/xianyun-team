export const state = () => {
  return {
    // 酒店信息对象
    hotelData: {},
    // 风景地图数据
    scenicDisArr:[],
    // 交通地图数据
    trafficDisArr: [],
    // 用来显示地图的数据
    displayArr: [],
    // tab栏的显示状态
    activeName: 'scenic'
  }
}
export const mutations = {
  // 设置酒店信息
  setHotelData(state,data) {
    state.hotelData = data 
  },
  // 设置风景地图数据
  setScenicDisArr(state,data) {
    state.scenicDisArr = data
  },
  // 设置风景地图数据
  setTrafficDisArr(state,data) {
    state.trafficDisArr = data
  },
  // 设置显示地图的数据
  setDisplayArr(state,data) {
    state.displayArr = data
  },
  resetData(state) {
    state.activeName = 'scenic'
  }
  // ,
  // 卸载组件时清除store
  // clearData(state) {
  //   state.hotelData = {},
  //   state.scenicDisArr = [],
  //   state.trafficDisArr = [],
  //   state.displayArr = []
  // }
  
}