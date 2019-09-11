<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div v-for="(item,index) in users" :key="index" class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              v-model="item.id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="身份证" value="1" :checked="true" />
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">
        添加乘机人
      </el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div v-for="(item, index) in infoData.insurances" :key="index" class="insurance-item">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleCheck(item.id)"
          />
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" placeholder="请输入手机号">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha" />
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">
          提交订单
        </el-button>
      </div>
    </div>
    <span v-show="false">{{ allPrice }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [{
        username: '',
        id: ''
      }],
      infoData: {},
      insurances: [],
      contactName: '',
      contactPhone: '',
      captcha: '',
      invoice: false,
      seat_xid: '',
      air: ''
    }
  },
  computed: {
    allPrice () {
      if (!this.infoData.seat_infos) {
        return 0
      }
      let price = 0
      // 机票单价，取座位信息的第一个价格
      price += this.infoData.seat_infos.org_settle_price
      // 燃油费
      price += this.infoData.airport_tax_audlet

      // 保险数据
      price += 30 * this.insurances.length
      price *= this.users.length
      // 把值存到store
      this.$store.commit('air/setAllPrice', price)
      return price
    }
  },
  mounted () {
    const { id, seat_xid } = this.$route.query
    this.$axios({
      url: `/airs/${id}`,
      params: { seat_xid }
    }).then((res) => {
      // console.log(res)
      this.infoData = res.data
      // 调用store的方法，把infoData存到store中
      this.$store.commit('air/setInfoData', this.infoData)
    })
  },
  methods: {
    // 添加乘机人
    handleAddUsers () {
      this.users.push({
        username: '',
        id: ''
      })
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)
    },
    handleCheck (id) {
      const index = this.insurances.indexOf(id)
      if (index > -1) {
        this.insurances.splice(index, 1)
      } else {
        this.insurances.push(id)
      }
    },
    // 发送手机验证码
    handleSendCaptcha () {
      // 判断没有输入手机号则提示用户并终止
      if (!this.contactPhone) {
        this.$message.error('请输入手机号')
        return
      }
      // 发送请求获取验证码
      this.$axios({
        url: '/captchas',
        method: 'post',
        data: {
          tel: this.contactPhone
        }
      })
        .then((res) => {
          // console.log(res)
          // 结构出code属性
          const { code } = res.data
          // 弹框
          this.$alert(`验证码为${code}`, '提示')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 提交订单
    handleSubmit () {
      // 判断没有输入手机号则提示用户并终止
      if (!this.users[0].username || !this.users[0].id) {
        this.$message.error('乘机人不能为空')
        return
      }
      if (!this.contactName) {
        this.$message.error('联系人不能为空')
        return
      }
      if (!this.contactPhone) {
        this.$message.error('手机号不能为空')
        return
      }
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      }
      this.$axios({
        url: '/airorders',
        method: 'post',
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data
      })
        .then((res) => {
          // console.log(res)
          this.$message.success('提交订单成功，正在跳转至支付页面')
          this.$router.push({
            path: '/air/pay',
            query: { id: res.data.data.id }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
