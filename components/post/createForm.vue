<template>
  <!-- 写游记富文本框组件 -->
  <div class="textContent">
    <h2>发表新攻略</h2>
    <span>分享你的个人游记，让更多人看到哦！</span>
    <el-form class="createInfo">
      <!-- 标题输入框 -->
      <div>
        <el-form-item>
          <el-input placeholder="请输入标题" class="input-with"></el-input>
        </el-form-item>
      </div>
      <!-- 富文本框 -->
      <div id="richText">
        <VueEditor :config="config" ref="vueEditor" />
      </div>
      <!-- 城市选择 -->
      <el-form-item label="选择城市" class>
        <el-input placeholder="请搜索您想发表的游玩城市哦" class="inputWith"></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button  class="addArticle">保存到草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入下载好的富文本框包
// import VueEditor from "vue-word-editor";
// 需要单独引入样式
import "quill/dist/quill.snow.css";
// 加个判断再引入
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "richText",
  data() {
    return {
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  // 注册富文本框组件
  components: {
    VueEditor
  }
};
</script>

<style lang="less" scoped>
.textContent {
  h2 {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: normal;
  }
  span {
    display: block;
    margin-bottom: 20px;
    font-size: 12px;
    color: #ccc;
  }
  #richText > div {
    height: 450px;
    /deep/ .ql-container {
      height: 90%;
    }
  }
  .el-form-item {
    margin-top: 20px;
  }
  .el-form-item .inputWith {
    width: 250px;
  }
  .el-form-item .addArticle{
    color: orange;
  }
}
</style>