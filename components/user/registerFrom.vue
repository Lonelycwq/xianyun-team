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
        placeholder="用户名手机"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input
        v-model="form.captcha"
        placeholder="验证码"
      >
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input
        v-model="form.nickname"
        placeholder="你的名字"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input
        v-model="form.checkPassword"
        placeholder="确认密码"
        type="password"
      />
    </el-form-item>

    <el-button
      class="submit"
      type="primary"
      @click="handleRegSubmit"
    >
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    // 确认密码验证
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      form: {
        username: '', // 登录用户名/手机
        nickname: '', // 昵称
        captcha: '', // 手机验证码
        password: '', // 登录密码
        checkPassword: '' // 确认密码
      },
      // 表单规则
      // 表单规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '手机验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        checkPassword: [
          // 规则使用什么定义的方法
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha () {
      // 判断没有输入手机号则提示用户并终止
      if (!this.form.username) {
        this.$message.error('请输入手机号')
        return
      }
      // 发送请求获取验证码
      this.$axios({
        url: '/captchas',
        method: 'post',
        data: {
          tel: this.form.username
        }
      })
        .then((res) => {
          // console.log(res)
          // 结构出code属性
          const { code } = res.data
          // 弹框
          this.$alert(`验证码为${code}`, '提示')
          // this.$message.success('验证码为' + code)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 点击注册事件
    handleRegSubmit () {
      // console.log(this.$store)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 通过结构的方法使用一个变量存储对象中需要的属性
          // eslint-disable-next-line no-unused-vars
          const { checkPassword, ...rest } = this.form
          // console.log(rest)
          // 发送注册请求
          // this.$axios({
          //   url: '/accounts/register',
          //   method: 'post',
          //   data: rest
          // })
          //   .then((res) => {
          //     // console.log(res)
          //     // 将token值本地存储，注册成功后自动登录
          //     this.$store.commit('user/setUserInfo', res.data)
          //     // 注册成功提示
          //     this.$message.success('注册成功')
          //     // 注册成功后页面跳转
          //     this.$router.push('/')
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //     this.$message.error('注册失败')
          //   })
          // 调用登录方法传参
          this.$store.dispatch('user/register', rest)
            .then((res) => {
              console.log(res)
              // 成功提示
              this.$message.success('注册成功,正在登录并跳转')
              // 页面跳转
              setTimeout(() => {
                // 页面跳转并销毁上一个页面
                this.$router.replace('/')
              }, 1000)
            })
        } else {
          this.$message.error('注册失败')
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
