<template>
  <div>
    <!-- 酒店列表 -->
    <HotelList :data="hotelData"/>
  </div>
</template>

<script>
import HotelList from "@/components/hotel/hotelList";
export default {
  components: {
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
      url: "/hotels",
      params: {
        city: this.$route.query.city
      }
    }).then(res=>{
      this.hotelData = res.data
    })
  }
};
</script>

<style>
</style>