<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="form"
  >
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名/手机"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">
        忘记密码
      </nuxt-link>
    </p>

    <el-button
      class="submit"
      type="primary"
      @click="handleLoginSubmit"
    >
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      form: {
        username: '',
        password: ''
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // console.log(this.$store)
  },
  methods: {
    // 提交登录
    handleLoginSubmit () {
      // console.log(this.form)
      // 二次验证
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 发送登录请求
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'post',
          //   data: this.form
          // })
          //   .then((res) => {
          //     console.log(res)
          //     if (res.status === 200) {
          //       // 成功提示
          //       this.$message.success('登录成功')
          //       // 页面跳转
          //       this.$router.push('/')
          //       // 调用mutations下的setUserInfo方法
          //       // commit接受两个参数，一个为调用方法名，一个为参数数据
          //       // 找到某个模块下的方法使用/命名空间
          //       // token值存储
          //       this.$store.commit('user/setUserInfo', res.data)
          //       // localStorage.setItem('xianyunLogin', res.data.token)
          //     } else {
          //       this.$message.error('登录失败')
          //     }
          //   }).catch((err) => {
          //     console.log(err)
          //     this.$message.error('登录失败')
          //   })
          // 调用登录方法传参
          this.$store.dispatch('user/login', this.form)
            .then((res) => {
              console.log(res)
              // 成功提示
              this.$message.success('登录成功,正在跳转')
              // 页面跳转
              setTimeout(() => {
                // 页面跳转并销毁上一个页面
                // this.$router.replace('/')
                // 返回上一个页面
                this.$router.back()
              }, 1000)
            })
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
