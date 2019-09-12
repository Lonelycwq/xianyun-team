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
            <span class="span1" @click="setCity(childitem.city)">{{ index2+1 }}</span>
            <span class="span2" @click="setCity(childitem.city)">{{ childitem.city }}</span>
            <span class="span3" @click="setCity(childitem.city)">{{ childitem.desc }}</span>
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
    childhide() {
      this.showindex = false
    },
    childshow(e) {
      this.showindex = true
      if (!e.target.dataset.id) {
        this.childrenList = this.menuList[this.currentIndex].children
      } else {
        this.currentIndex = e.target.dataset.id
        this.childrenList = this.menuList[this.currentIndex].children
      }
    },
    setCity(city){
      this.$emit('setCity',city)
    }
  },
  mounted(){
    this.$axios({
      url: '/posts/cities'
    }).then((res) => {
      // console.log(res)
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