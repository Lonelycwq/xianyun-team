<template>
  <!-- 写游记富文本框组件 -->
  <div class="textContent">
    <h2>发表新攻略</h2>
    <span>分享你的个人游记，让更多人看到哦！</span>
    <el-form class="createInfo">
      <!-- 标题输入框 -->
      <div>
        <el-form-item>
          <el-input placeholder="请输入标题" class="input-with" v-model="addPostInfo.title"></el-input>
        </el-form-item>
      </div>
      <!-- 富文本框 -->
      <div id="richText">
        <VueEditor :config="config" ref="vueEditor" />
      </div>
      <!-- id隐藏域 -->
      <input type="hidden" v-model="draftId" />
      <!-- 城市选择 -->
      <el-form-item label="选择城市">
        <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
        <!-- select：在下拉框中选中时候时候触发的事件 -->
        <el-autocomplete
          :fetch-suggestions="queryCitySearch"
          placeholder="请搜索您想发表的游玩城市哦"
          @select="handleCitySelect"
          @blur="handleCityBlur"
          class="inputWith"
          v-model="cityName"
        ></el-autocomplete>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="addPost">发布</el-button>
        <el-button class="addArticle" @click="draftPost">保存到草稿</el-button>
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
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
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
          url: "http://localhost:1337/upload",
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
          url: "http://157.122.54.189:9095/upload",
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
      },
      // 新增文章数据=>初始化
      addPostInfo: {
        title: "", // 文章标题
        content: "", // 文章内容
        city: null // 城市名称
      },
      draftId: 1, // form表单对象id
      // (城市名称)的城市id
      cityName: "",
      // 城市下拉数组
      cityList: [],
      time: ""
    };
  },
  // 注册富文本框组件
  components: {
    VueEditor
  },
  methods: {
    // 城市搜索建议事件=>value输入框的值,callback回调函数=>必须调用，参数的值会显示在下拉框中(调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性)
    queryCitySearch(value, callback) {
      if (!value) {
        // 传递空数组不会出现下拉框
        callback([]);
        return;
      }
      // 根据用户的输入请求建议城市
      this.$axios({
        url: "/airs/city",
        // get参数
        params: {
          // 输入框的关键字
          name: value
        }
      }).then(res => {
        // console.log(res);
        // 数组
        const { data } = res.data;
        // 城市id
        this.addPostInfo.city = res.data.data[0].id;
        // 给数组中每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性
          v.value = v.name;
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
        });

        // 把转换后的数组赋值城市下拉数组
        this.cityList = newData;
        //显示到下拉列表中
        callback(newData);
      });
    },
    // 目标城市下拉选择时触发
    handleCitySelect(item) {
      // 把选择的值设置给addPostInfo
      this.cityName = item.value;
    },
    // 城市输入框失去焦点时候触发
    handleCityBlur() {
      this.cityName = this.cityList[0] ? this.cityList[0].value : "";
    },
    // 点击发布事件
    addPost() {
      // 判断非空
      if (!this.addPostInfo.title) {
        this.$message.error("标题不能为空哦！");
        return;
      }
      if (!this.$refs.vueEditor.editor.root.innerHTML) {
        this.$message.error("内容不能为空哦！");
        return;
      }
      if (!this.cityName) {
        this.$message.error("城市不能为空哦！");
        return;
      }
      this.addPostInfo.content = this.$refs.vueEditor.editor.root.innerHTML;
      // 请求新增文章接口
      this.$axios({
        url: "/posts",
        method: "POST",
        // 设置请求头
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: this.addPostInfo
      }).then(res => {
        console.log(res);
        // 保存新增文章数据(重新赋值)
        this.addPostInfo = res.data;
        // 提示用户
        this.$message({
          message: "新增攻略成功",
          type: "success"
        });
        // 跳转到攻略列表页
        this.$router.push({ path: "/post" });
      });
    },
    // 点击保存草稿事件
    draftPost() {
      // 富文本框对应的数据
      this.addPostInfo.content = this.$refs.vueEditor.editor.root.innerHTML;
      // 判断非空
      if (!this.addPostInfo.title) {
        this.$message.error("标题不能为空哦！");
        return;
      }
      if (!this.$refs.vueEditor.editor.root.innerHTML) {
        this.$message.error("内容不能为空哦！");
        return;
      }
      if (!this.cityName) {
        this.$message.error("城市不能为空哦！");
        return;
      }
      // 判断是否有id
      if (!this.item.id) {
        // 获取store里面的草稿文章数据数组 => 修改store里面每个对象的id，让其自增
        const arrDraft = [...this.$store.state.post.draftPost];
        // console.log(arrDraft);
        if (arrDraft.length !== 0) {
          let lastObj = arrDraft.slice(arrDraft.length - 1);
          // 设置当前草稿id
          this.draftId = lastObj[0].id + 1;
        }
        // 时间处理
        this.time = new Date();
        // 转换时间格式
        this.time =
          this.time.getFullYear() +
          "-" +
          (this.time.getMonth() + 1) +
          "-" +
          this.time.getDate();
        let newObj = {
          ...this.addPostInfo,
          draftTime: this.time,
          cityName: this.cityName,
          id: this.draftId
        };
        // 重新保存数据到store
        this.$store.commit("post/setDraftPost", newObj);
      } else {
        // 调用store里面的数据
        let DraftArr = [...this.$store.state.post.draftPost] || [];
        // console.log(arrDraft);
        if (DraftArr.length !== 0) {
          let lastObj = DraftArr.slice(DraftArr.length - 1);
          // 设置当前草稿id
          this.draftId = lastObj[0].id + 1;
        }
        // 判断是否是草稿数据
        if (
          this.addPostInfo.title !== this.item.title &&
          this.addPostInfo.content !== this.item.content &&
          this.$refs.vueEditor.editor.root.innerHTML !== this.item.content &&
          this.cityName !== this.item.cityName
        ) {
          return;
        } else if (this.item.id === DraftArr.id) {
          // 遍历找出对应的index
          let index = this.DraftArr.findIndex(v => {
            return v.id = this.item.id;
          });
          this.addPostInfo.content = this.$refs.vueEditor.editor.root.innerHTML;
          // 时间处理
          this.time = new Date();
          // 转换时间格式
          this.time =
            this.time.getFullYear() +
            "-" +
            (this.time.getMonth() + 1) +
            "-" +
            this.time.getDate();
          let newObjInfo = {
            ...this.addPostInfo,
            draftTime: this.time,
            cityName: this.cityName,
            id: this.draftId
          };
          // 替换
          this.DraftArr.splice(index, 1, newObjInfo);
        }
        // 重新保存数据到store
        this.$store.commit("post/setNowDraft", DraftArr);
      }
      // 把表单清空=>重置表单
      this.addPostInfo.title = "";
      this.$refs.vueEditor.editor.root.innerHTML = "";
      this.cityName = "";
      this.addPostInfo.city = null;
      this.addPostInfo.content = "";
    }
  },
  mounted() {
    // 把表单清空=>重置表单
    this.addPostInfo.title = "";
    this.$refs.vueEditor.editor.root.innerHTML = "";
    this.cityName = "";
    this.addPostInfo.city = null;
    this.addPostInfo.content = "";
  },
  watch: {
    item() {
      const newObj = this.item;
      // 赋值
      this.draftId = newObj.draftId;
      this.addPostInfo.title = newObj.title;
      this.$refs.vueEditor.editor.root.innerHTML = newObj.content;
      this.cityName = newObj.cityName;
    }
  }
};
</script>

<style lang="less" scoped>
.textContent {
  width: 750px;
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
  .el-form-item .addArticle {
    color: orange;
  }
}
</style>