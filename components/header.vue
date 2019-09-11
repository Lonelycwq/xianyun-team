<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
      </div>

      <el-row type="flex" class="navs">
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/post">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel">
          酒店
        </nuxt-link>
        <nuxt-link to="/air">
          国内机票
        </nuxt-link>
      </el-row>

      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">
          登录 / 注册
        </nuxt-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`" alt="">
            {{ $store.state.user.userInfo.user.nickname }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="/user/center.vue">
                个人中心
              </nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="exit">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$store.state)
  },
  methods: {
    exit () {
      // 调用清除本地存储方法
      this.$store.commit('user/clearUserInfo')
      this.$message.success('退出成功')
      // 跳转登录页
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 2px #ddd;
  .main{
    width: 1000px;
    margin: 0 auto;
  }
  .logo{
    img{
      width: 156px;
      height: 42px;
      vertical-align: middle;
      cursor: pointer;
      // display: block;
      // line-height: 42px
    }
  }
  .navs{
    flex: 1;
    margin-left:10px;
    a{
      padding: 0 15px;
      height: 60px;
      &:hover{
        color: #409eff;
        border-bottom: 5px solid #409eff;
        transition: all .5s;
        box-sizing: border-box;
      }
    }
    .nuxt-link-exact-active{
      background: #409eff;
      color: #fff;
      transition: all .5s;
      &:hover{
        color: #fff;
      }
    }
  }
  .el-dropdown {
    cursor: pointer;
    img{
      width: 30px;
      border-radius: 50%;
      vertical-align: middle;
      box-sizing: border-box;
      &:hover{
        border: 2px solid #ff0
      }
    }
  }
}
</style>
