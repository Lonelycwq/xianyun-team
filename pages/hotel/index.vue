<template>
  <div>
<<<<<<< HEAD
=======
    <!-- 酒店地图 -->
    <HotelMap :data="hotelData"/>
>>>>>>> d604b76b71db5d53b1790b01d0f3c0d76d9d1256
    <!-- 酒店列表 -->
    <HotelList :data="hotelData"/>
  </div>
</template>

<script>
import HotelList from "@/components/hotel/hotelList";
import HotelMap from "@/components/hotel/hotelMap";
export default {
  components: {
    HotelMap,
    HotelList
  },
  data() {
    return {
      hotelData: {}
    };
  },
  mounted() {
    // this.$route.query.city = 74
    // console.log(this.$route.query);
    this.$axios({
      url: "/hotels"
    }).then(res=>{
      // console.log(res);
      this.hotelData = res.data.data
    })
  }
};
</script>

<style>
</style>