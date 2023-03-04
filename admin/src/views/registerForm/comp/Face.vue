<template>
  <!--  <el-row>
    <el-col :span="12" style="margin: auto"> -->
  <div style="background-color: ">
    <!-- 拍照 -->
    <div class="camera_outer">
      <video
        id="videoCamera"
        :width="videoWidth"
        :height="videoHeight"
        autoplay
        style="
          margin: auto;
          box-shadow: rgb(0 0 0 / 12%) 0px 0px 12px;
          display: block;
          margin-bottom: 30px;
        "
      ></video>
      <canvas
        style="display: none"
        id="canvasCamera"
        :width="videoWidth"
        :height="videoHeight"
      ></canvas>
      <div v-if="imgSrc" class="img_bg_camera">
        <!-- <p>效果预览</p> -->
        <img
          :src="imgSrc"
          alt
          class="tx_img"
          style="
            margin: auto;
            box-shadow: rgb(0 0 0 / 12%) 0px 0px 12px;
            display: block;
            margin-bottom: 30px;
          "
        />
      </div>
      <div
        class="button"
        style="
          margin: auto;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          height: 100%;
        "
      >
        <!-- <el-button @click="getCompetence()" type="primary" v-if="faceOpen">打开摄像头</el-button> -->
        <el-button @click="setImage()" type="primary" circle v-if="faceOpen">拍照</el-button>

        <el-button @click="getCompetence()" v-if="!faceOpen">重新拍照</el-button>
        <el-button @click="onSubmit()" type="primary" v-if="!faceOpen">确认上传</el-button>

        <!-- <el-button @click="getCompetence()" type="primary">打开摄像头</el-button> -->
        <!-- <el-button @click="stopNavigator()" type="warning">关闭摄像头</el-button> -->
        <!-- <el-button @click="setImage()" type="success">拍照</el-button> -->
        <!-- <el-button type="primary" @click="onSubmit()">提交</el-button> -->
      </div>
    </div>
  </div>
  <!--    </el-col>
  </el-row> -->
</template>

<script>
  import { netConfig } from '@/config/net.config.js';
  import store from '@/store';
  import axios from 'axios';
  import { uploadFaceEmail } from '@/api/user';
  // import Taking from '../../../assets/Taking.jpeg';

  export default {
    props: {
      active: Number,
    },
    data() {
      return {
        //摄像头打开
        faceOpen: true,

        src: '',
        // netConfig.baseURL + store.getters.faceUrl === netConfig.baseURL
        //   ? Taking
        //   : netConfig.baseURL + store.getters.faceUrl,
        updateFacePCOpen: false,
        // 是否显示弹出层
        open: false,
        form: {},
        // 拍照
        // videoWidth: 250,
        // videoHeight: 350,
        videoWidth: 400,
        videoHeight: 420,
        imgSrc: '',
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        openVideo: false,
      };
    },
    // mounted() {
    //   // console.log(this.$route.query.id)
    // },
    mounted() {
      // console.log(this.active);
      if (this.active == 2) {
        // this.getCompetence(); //进入页面就调用摄像头
      }
    },
    methods: {
      OpenCompetence(e) {
        // console.log(e);
        this.getCompetence();
      },
      updateFacePC() {
        this.updateFacePCOpen = true;
      },
      updateFace() {
        this.open = true;
      },
      // 关闭摄像头
      stopNavigator() {
        this.thisVideo.srcObject.getTracks()[0].stop();
      },

      onSubmit() {
        this.$emit('FaceChanged', this.imgSrc);

        // uploadFaceEmail({
        //   base46Str: this.imgSrc,
        //   id:,
        //   username:,
        // }).then((response) => {
        //   this.$emit('FaceChanged', 3);
        //   console.log(response); // this.open = false;
        //   // this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
        //   // store.commit('SET_AVATAR', this.options.img);
        //   ElMessage({
        //     showClose: true,
        //     message: '修改成功',
        //     type: 'success',
        //   });
        //   this.open = false;
        // });

        // 隐藏摄像头
        document.getElementById('videoCamera').style.display = 'none';
        // 关闭摄像头
        // this.stopNavigator();
        this.thisVideo.srcObject.getTracks()[0].stop();
      },

      // 调用权限（打开摄像头功能）
      getCompetence() {
        //显示拍照按钮
        this.faceOpen = true;

        this.imgSrc = '';

        var _this = this;
        _this.thisCancas = document.getElementById('canvasCamera');
        _this.thisContext = this.thisCancas.getContext('2d');
        _this.thisVideo = document.getElementById('videoCamera');
        _this.thisVideo.style.display = 'block';
        // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia =
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              //不存在则报错
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        var constraints = {
          audio: false,
          video: {
            width: this.videoWidth,
            height: this.videoHeight,
            transform: 'scaleX(-1)',
          },
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ('srcObject' in _this.thisVideo) {
              _this.thisVideo.srcObject = stream;
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play();
            };
          })
          .catch((err) => {
            // console.log(err);
          });
      },
      //  绘制图片（拍照功能）
      setImage() {
        // 隐藏按钮
        this.faceOpen = false;

        var _this = this;
        // 隐藏摄像头
        _this.thisVideo.style.display = 'none';

        // canvas画图
        _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight);
        // 获取图片base64链接
        var image = this.thisCancas.toDataURL('image/png');
        // image/png、image/jpeg、image/webp
        _this.imgSrc = image; //赋值并预览图片

        // console.log(image)

        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8080/SSMDemo_war_exploded/uploadImage.spring',
        //   data: {
        //     s: _this.imgSrc,
        //   },
        //   // data: JSON.parse(_this.imgSrc)
        // }).then((result) => {
        //   console.log(result.data);
        // });

        // uploadFace({ base46Str: _this.imgSrc }).then((response) => {
        //   console.log(response); // this.open = false;
        //   // this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
        //   // store.commit('SET_AVATAR', this.options.img);
        //   ElMessage({
        //     showClose: true,
        //     message: '修改成功',
        //     type: 'success',
        //   });
        //   // this.visible = false;
        // });

        //关闭摄像头
        this.stopNavigator();
        this.thisVideo.srcObject.getTracks()[0].stop();
      },

      // base64转文件，此处没用到
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {
          type: mime,
        });
      },
    },
  };
</script>

<style>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    /* width: 480px; */
  }

  .header-box {
    width: 100%;
    height: 50px;
    text-align: center;
  }

  .content-box {
    width: 100%;
    height: 400px;
    text-align: center;
  }

  footer-box {
    width: 100%;
    height: 50px;
    text-align: center;
  }

  .justify-content-between {
    -webkit-box-pack: justify !important;
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
  }
</style>

<style scoped lang="scss">
  .text-center {
    text-align: center;
  }

  .user-info-head {
    position: relative;
    display: inline-block;
    height: 120px;
    // background: url('../../../../assets/images/404.png');
  }

  // .user-info-head:hover:after {
  //   content: '更换人脸';
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   color: #eee;
  //   background: rgba(0, 0, 0, 0.5);
  //   font-size: 24px;
  //   font-style: normal;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   cursor: pointer;
  //   line-height: 110px;
  //   border-radius: 50%;
  // }

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
