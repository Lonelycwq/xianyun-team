<template>
  <div class="detail-aside">
    <h3>相关攻略</h3>
    <div>
      <nuxt-link v-for="(item, index) in data" :key="index" class="aside-post" :to="`/post/detail?id=${item.id}`">
        <el-row type="flex" class="aside-list">
          <div class="aside-post-left">
            <img :src="`${item.images[0]}`" alt="">
          </div>
          <el-row class="aside-post-right" type="flex">
            <div>{{ item.title }}</div>
            <p><span>{{ item.updated_at | time }}</span>  <span>阅读：{{item.watch}}</span></p>
          </el-row>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    time (value) {
      const filtersTime = moment(value).format(`YYYY-MM-DD HH:MM`)
      return filtersTime
    }
  },
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  }
}
</script>

<style lang="less" scoped>
.detail-aside{
  h3{
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .aside-post{
    .aside-list{
      padding: 20px 0;
      .aside-post-left{
        width: 100px;
        height: 80px;
        margin-right: 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .aside-post-right{
        flex: 1;
        flex-flow: column;
        justify-content: space-around;
        div{
          line-height: 1.4em;
          height: 2.8em;
          overflow: hidden;
          width: 100%;
        }
        p{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
