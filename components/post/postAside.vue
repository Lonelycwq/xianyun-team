<template>
  <div class="post-left" @mouseleave="childhide">
    <div class="nav">
      <div class="menuList" @mouseover="childshow($event)">
        <ul>
          <li v-for="(item,index) in menuList" :key="index" :data-id="index">
            {{ item.type }}
          </li>
        </ul>
        <div v-show="showindex" class="children">
          <div v-for="(childitem,index2) in childrenList" :key="index2" class="childitem">
            <nuxt-link class="span1" :to="`/post?city=${childitem.city}`">{{ index2+1 }}</nuxt-link>
            <nuxt-link class="span2" :to="`/post?city=${childitem.city}`">{{ childitem.city }}</nuxt-link>
            <nuxt-link class="span3" :to="`/post?city=${childitem.city}`">{{ childitem.desc }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="tuijian">
      <h4>推荐城市</h4>
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {     
      currentIndex: 0,
      menuList: [],
      childrenList: [],
      showindex: false,
    }
  },
  methods:{
    // 鼠标离开事件隐藏弹出
    childhide() {
      this.showindex = false
    },
    // 鼠标移入事件显示对应弹出并设置展示数组
    childshow(e) {
      this.showindex = true
      // 判断鼠标移入的目标没有id则设置默认索引的数值数据
      if (!e.target.dataset.id) {
        this.childrenList = this.menuList[this.currentIndex].children
      } else {
        // 有id则将这个id设置为索引，然后重新获取数组
        this.currentIndex = e.target.dataset.id
        this.childrenList = this.menuList[this.currentIndex].children
      }
    }
  },
  mounted(){
    // 发送请求获取侧边栏数据
    this.$axios({
      url: '/posts/cities'
    }).then((res) => {
      // console.log(res)
      // 数组赋值
      this.menuList = res.data.data
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
  .post-left{
    width: 260px;
    z-index: 9;
    .nav {
      width: 100%;
      .menuList{
        position: relative;
        border-left: 1px solid #ccc;
        li{
          padding-left: 20px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          border-top: 1px solid #ccc;
          border-right: 1px solid #ccc;
          cursor: pointer;
          &:hover{
            border-right:1px solid #fff;
            color: orange;
          }
          &:last-child{
            border-bottom: 1px solid #ccc;
          }
        }
      }
      .children{
        position: absolute;
        top: 0;
        right: -311px;
        z-index: -1;
        padding: 0 5px;
        width: 300px;
        border: 1px solid #ccc;
        background: #fff;
        .childitem{
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          .span1{
            margin-left: 10px;
            color: orange;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
          }
          .span2{
            margin-left: 10px;
            color: orange;
            font-size: 16px;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
          .span3{
            margin-left: 10px;
            color: #ccc;
            font-size: 14px;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
    .tuijian{
      margin-top: 15px;
      h4{
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: 300;
        border-bottom: 1px solid #ccc;
      }
      img{
        width: 100%;
      }
    }
  }
</style>