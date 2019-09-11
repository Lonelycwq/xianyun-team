<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlighsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item,index) in dataList"
          :key="index"
          :data="item"
          :toggle="item.showRecommend"
          @handleChangeShow="handleChangeShow"
        />

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page="pageIndex"
            :page-sizes="[3, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>

import FlightsFilters from '@/components/air/flightsFilters'
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsAside from '@/components/air/flightsAside'
export default {
  components: {
    FlightsFilters, FlightsListHead, FlightsItem, FlightsAside
  },
  data () {
    return {
      // 请求机票列表返回的总数据
      flightsData: {
        info: {},
        options: {}
      },
      cacheFlighsData: {
        info: {},
        options: {}
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0
    }
  },
  watch: {
    $route () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // 请求航班列表
      this.$axios({
        url: '/airs',
        params: this.$route.query
      }).then((res) => {
        // console.log(res)
        this.flightsData = res.data
        this.cacheFlighsData = { ...res.data }
        this.dataList = this.flightsData.flights.slice(0, this.pageSize)
        this.dataList = this.dataList.map((e) => {
          e.showRecommend = false
          return e
        })
        this.total = res.data.total
      }).catch((err) => {
        console.log(err)
      })
    },
    setDataList (arr) {
      this.flightsData.flights = arr
      this.dataList = this.flightsData.flights.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex)
      this.pageIndex = 1
      this.total = arr.length
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.dataList = this.flightsData.flights.slice(0, val)
      this.dataList.forEach((e) => {
        e.showRecommend = false
      })
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.dataList = this.flightsData.flights.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex)
      this.dataList.forEach((e) => {
        e.showRecommend = false
      })
    },
    handleChangeShow (id) {
      this.dataList = this.dataList.map((v) => {
        if (v.id === id) {
          v.showRecommend = !v.showRecommend
        }
        return v
      })
    }
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
