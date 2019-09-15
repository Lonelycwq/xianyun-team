<template>
  <div class="container">
    <h4>评论</h4>
    <input type="text" placeholder="说点什么吧..." v-model="addCommentObj.content" >
    <div class="commit">
      <div class="upload">
        <el-upload
          action="http://127.0.0.1:1337/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          name="files"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      </div>
      <div class="submit_button" @click="submitComment">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    follow:{
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      addCommentObj:{
        content:'',
        pics:[],
        post:this.$route.query.id,       //攻略id
        follow: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods:{
    // 设置请求头的token,文件上传组件内部封装了异步操作
    // addToken(){
    //   let mytoken = this.$store.state.user.userInfo.token
    //   return { Authorization: `Bearer ${mytoken}` }
    // },
    // 文件上传之前的钩子，参数为上传的文件，若返回 false 或 Promise 且被 reject 则停车上传
    beforeUpload(file){
      // 上传格式为"image/",即图片格式
      if(file.type.indexOf('image/') !== 0){
        this.$message.error('请上传正确格式的图片，如jpg/jpeg/png格式')
        return false
      }
      if(file.size / 1024 > 1000 ){
        this.$message.error("上传图片不能超过1MB")
        return false
      }
    },
    // 点击时显示预览
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    // 文件列表移除文件时的钩子
    // file为文件移除的对象，并未在存储中进行移除
    handleRemove(file, fileList) {
      fileList.forEach((e,i)=> {
        // 如果未上传成功，则不触发，避免报错，因为取消当前上传操作，会触发handleRemove
        if(!file.response){
          return
        }
        let temp = file.url
        for(var i = 0; i < this.pics.length; i++){
          if(this.pics[i] === temp ){
            this.pics.splice(i,1)
            return
          }
        }
      });
    },
    // 文件上传成功时的钩子
    handleSuccess(response,file, fileList){
        if(file.status==='success'){
          this.addCommentObj.pics.push(response[0])
        } else {
          this.$message.error('图片上传失败')
        }
    },
    submitComment(){
      this.$axios({
        url: "/comments",
        method: 'post',
        data:this.addCommentObj,
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      })
      .then( res=>{
        // console.log(res)
        if(res.status === 200 ){
          this.$message.success('新增成功！')
          this.addCommentObj.comment = '',
          this.addCommentObj.follow = '',
          this.addCommentObj.pics = []
          this.$emit('updInit','')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 1000px;
    margin: 0 auto;
    h4{
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: normal;
      color:#000;
      line-height: 24px;
      width:700px;
      height: 24px;
    }
    input{
      box-sizing: border-box;
      width:700px;
      height: 44px;
      padding: 5px 15px;
      margin-bottom: 10px;
      color:#606266;
      border:1px solid #dcdfe6;
      border-radius: 4px; 
      &:focus{
        outline: 1px solid #429efd;
        -moz-outline-radius: 4px;
      }
    }
    .commit{
      position: relative;
      width:700px;
      margin-bottom: 30px;
      /deep/ .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
      }
      /deep/ .el-upload-list__item-actions{
        width: 100px;
        height: 100px;
      }
      /deep/ .el-upload-list__item{
        width: 100px;
        height: 100px;
      }
      .submit_button{
        position: absolute;
        top:0;
        right: 0;
        background-color: #409eff;
        padding: 7px 15px;
        color: #fff;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
        &:active{
          background-color: #3b8ee4;
        }
      }
    }
  }
</style>