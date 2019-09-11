<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select v-model="airport" size="mini" placeholder="起飞机场" @change="filterAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flightTimes" size="mini" placeholder="起飞时间" @change="filterAirport">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" size="mini" placeholder="航空公司" @change="filterAirport">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="airSize" size="mini" placeholder="机型" @change="filterAirport">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-tag
        v-if="airport !== ''"
        closable
        :disable-transitions="false"
        @close="handleCloseAirport"
      >
        {{ airport }}
      </el-tag>
      <el-tag
        v-if="flightTimes !== ''"
        closable
        :disable-transitions="false"
        @close="handleCloseTime"
      >
        {{ flightsTime }}
      </el-tag>
      <el-tag
        v-if="company !== ''"
        closable
        :disable-transitions="false"
        @close="handleCloseCompany"
      >
        {{ company }}
      </el-tag>
      <el-tag
        v-if="airSize !== ''"
        closable
        :disable-transitions="false"
        @close="handleCloseAirSize"
      >
        {{ airSize }}
      </el-tag>
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  // data表示组件可以接收的属性
    data: {
      // type用于声明属性的类型
      type: Object,
      // 如果没有传值，才用default的默认值
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      // 机型大小的选项
      airSizeList: [
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ],
      filterList: []
    }
  },
  computed: {
    flightsTime () {
      // let time = ''
      // if (!this.flightTimes) {
      //   const arr = this.flightTimes.split(',')
      //   time = `${arr[0]}:00 - ${arr[1]}:00`
      // }
      // console.log(this.flightTimes.split(',')[0] + ':00 - ' + this.flightTimes.split(',')[1] + ':00')
      return this.flightTimes.split(',')[0] + ':00 - ' + this.flightTimes.split(',')[1] + ':00'
    }
  },
  mounted () {
    // console.log(this.$store.state.user.airList)
    // this.filterList = [...this.data.flights]
  },
  methods: {
    handleCloseAirport () {
      this.airport = ''
      this.filterAirport()
    },
    handleCloseTime () {
      this.flightTimes = ''
      this.filterAirport()
    },
    handleCloseCompany () {
      this.company = ''
      this.filterAirport()
    },
    handleCloseAirSize () {
      this.airSize = ''
      this.filterAirport()
    },
    filterAirport () {
      const arr = this.data.flights.filter((e) => {
        let time = true
        if (this.flightTimes) {
          const [from, to] = this.flightTimes.split(',')
          const hours = +e.dep_time.split(':')[0]
          time = hours >= from && hours < to
        }
        // console.log(this.airport, this.flightTimes, this.company, this.airSize)
        return (this.airport ? e.org_airport_name === this.airport : true) && (this.company ? e.airline_name === this.company : true) && (this.airSize ? e.plane_size === this.airSize : true) && time
      })
      this.$emit('setDataList', arr)
    },
    // 选择机场时候触发
    handleAirport (value) {
      const arr = this.data.flights.filter((e) => {
        return e.org_airport_name === value
      })
      this.$emit('setDataList', arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {
      const [from, to] = value.split(',')
      const arr = this.data.flights.filter((e) => {
        const hours = +e.dep_time.split(':')[0]
        return hours >= from && hours < to
      })
      this.$emit('setDataList', arr)
    },

    // 选择航空公司时候触发
    handleCompany (value) {
      const arr = this.data.flights.filter((e) => {
        return e.airline_name === value
      })
      this.$emit('setDataList', arr)
    },

    // 选择机型时候触发
    handleAirSize (value) {
      const arr = this.data.flights.filter((e) => {
        return e.plane_size === value
      })
      this.$emit('setDataList', arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel () {
      this.airport = ''
      this.flightTimes = ''
      this.company = ''
      this.airSize = ''
      this.$emit('setDataList', this.$store.state.user.airList.flights)
    }
  }
}
</script>

<style scoped lang="less">
  .filters{
    margin-bottom:20px;
  }

  .filters-top{
    > div{
      /deep/ .el-select{
        margin-left:10px;
      }
    }
  }

  .filter-cancel{
    margin-top:10px;
    .el-tag{
      border-radius: 16px;
      line-height: 28px;
      height: 28px;
    }
  }
</style>
