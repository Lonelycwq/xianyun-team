export const state = () => {
  return {
    // 酒店信息对象
    hotelData: {}
  }
}
export const mutations = {
  // 设置酒店信息
  setHotelData(state,data) {
    state.hotelData = data 
  }
}