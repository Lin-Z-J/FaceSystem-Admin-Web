<template>
  <div>
    <div class="user-info-head" @click="editCropper()">
      <img :src="options.img" title="点击上传头像" class="img-circle img-lg" />
    </div>
    <el-dialog
      :title="title"
      v-model="open"
      width="800px"
      append-to-body
      @opened="modalOpened"
      @close="closeDialog"
    >
      <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small"> 选择 </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button size="small" @click="changeScale(1)">+</el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button size="small" @click="changeScale(-1)">-</el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="3">
          <el-button size="small" @click="rotateLeft()">右旋转</el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="3">
          <el-button size="small" @click="rotateRight()">左旋转</el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import store from '@/store';
  import { ElMessage } from 'element-plus';

  import 'vue-cropper/dist/index.css';
  import { VueCropper } from 'vue-cropper';
  import { updateUser, searchOneUser, uploadFace2, uploadHead } from '@/api/user';
  import { netConfig } from '@/config/net.config.js';

  export default {
    components: {
      VueCropper,
    },
    // props: {
    //   user: {
    //     type: Object,
    //   },
    // },
    // props: ['user'],
    data() {
      return {
        user: {},
        headUrl: '',
        // 是否显示弹出层
        open: false,
        // 是否显示cropper
        visible: false,
        // 弹出层标题
        title: '修改头像',
        options: {
          // img: '',
          // img:
          //   netConfig.baseURL + store.getters.avatar === ''
          //     ? 'http://localhost:8089/src/assets/avatar.jpg'
          //     : netConfig.baseURL + store.getters.avatar, //裁剪图片的地址
          // img: netConfig.baseURL + store.getters.avatar,
          img: store.getters.avatar,
          // img: 'http://localhost:8089/src/assets/avatar.jpg',
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 200, // 默认生成截图框宽度
          autoCropHeight: 200, // 默认生成截图框高度
          fixedBox: true, // 固定截图框大小 不允许改变
        },
        previews: {},
      };
    },
    mounted() {
      // console.log(store.getters.avatar);
      this.getUser();
      // console.log('222')
      // console.log(store.getters.avatar)
      // console.log(this.faceUrl);
      // console.log(netConfig.baseURL);
    },
    methods: {
      getUser() {
        searchOneUser().then((response) => {
          const { data } = response;
          this.user = data[0];
          // console.log(data);
          this.headUrl = netConfig.baseURL + this.user.headUrl;
          this.options.img = netConfig.baseURL + this.user.headUrl;
          // console.log(this.faceUrl);
          // this.roleGroup = response.roleGroup;
          // this.postGroup = response.postGroup;
        });
      },
      // 编辑头像
      editCropper() {
        this.open = true;
      },
      // 打开弹出层结束时的回调
      modalOpened() {
        this.visible = true;
      },
      // 覆盖默认的上传行为
      requestUpload() {},
      // 向左旋转
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
      // 向右旋转
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },
      // 图片缩放
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
      // 上传预处理
      beforeUpload(file) {
        if (file.type.indexOf('image/') == -1) {
          ElMessage({
            showClose: true,
            message: '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。',
            type: 'error',
          });
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.options.img = reader.result;
          };
        }
      },
      // 上传图片
      uploadImg() {
        this.$refs.cropper.getCropBlob((data) => {
          var reader = new FileReader();
          reader.readAsDataURL(data);
          var _this = this;

          reader.onload = function () {
            uploadHead({ base46Str: reader.result }).then((response) => {
              _this.getUser();
              // console.log(response);
              _this.options.img = netConfig.baseURL + response.data.src + response.data.picName;
              _this.open = false;
              // this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
              // store.commit('SET_AVATAR', this.options.img);
              ElMessage({
                showClose: true,
                message: '修改成功',
                type: 'success',
              });
              _this.visible = false;
            });
          };
        });
      },
      // 实时预览
      realTime(data) {
        this.previews = data;
      },
      // 关闭窗口
      closeDialog() {
        this.options.img = this.headUrl;
        this.visible = false;
      },
    },
  };
</script>
<style scoped lang="scss">
  .user-info-head {
    position: relative;
    display: inline-block;
    height: 120px;
    // background: url('../../../../assets/images/404.png');
  }

  .user-info-head:hover:after {
    content: '+';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: #eee;
    background: rgba(0, 0, 0, 0.5);
    font-size: 24px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    line-height: 110px;
    border-radius: 50%;
  }

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    -webkit-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 4px #ccc;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;
  }

  .img-lg {
    width: 120px;
    height: 120px;
  }

  .img-circle {
    border-radius: 50%;
  }
</style>
