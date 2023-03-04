<template>
  <!--  -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>人脸信息</span>
        <!--     <el-button class="button" text @click="updateFace()">图片上传人脸信息</el-button>
        <el-button class="button" text @click="updateFace()">拍照上传人脸信息</el-button> -->
      </div>
    </template>
    <div class="text-center">
      <div class="user-info-head">
        <img :src="option.img" title="上传人脸" class="img-circle img-lg" />
      </div>
    </div>
    <el-row>
      <el-col
        :span="10"
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
        <el-button @click="updateFacePC()" type="primary">图片上传人脸信息</el-button>
        <el-button @click="updateFace()" type="warning">拍照上传人脸信息</el-button>
      </el-col>
    </el-row>

    <el-dialog v-model="updateFacePCOpen" title="图片上传人脸信息">
      <!-- style="border: 1px solid" -->
      <!-- <uploadFace></uploadFace> -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户人脸">
            <div class="user-info-head">
              <!-- <img :src="ADDfaceUrl" class="el-upload-list__item-thumbnail" /> -->
              <img :src="ADDfaceUrl" title="上传人脸" class="img-circle img-lg" />
            </div>
            <el-upload
              action="#"
              :on-change="onAddChange"
              :show-file-list="false"
              :http-request="requestUpload"
            >
              <el-button type="primary" style="margin-left: 20px">上传人脸</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateFacePCOpen = false">取消</el-button>
          <el-button type="primary" @click="SubmitupdateFace()">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="open" title="拍照上传人脸信息">
      <el-row>
        <el-col :span="12" style="margin: auto">
          <div style="background-color: ; height: ">
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
                <el-button @click="getCompetence()" type="primary" v-show="showOpen" v-if="faceOpen"
                  >打开摄像头</el-button
                >
                <el-button
                  @click="stopNavigator()"
                  type="warning"
                  v-show="showOpen"
                  v-if="!faceOpen"
                  >关闭摄像头</el-button
                >

                <el-button @click="setImage()" type="success" v-show="showp" v-if="showOpen"
                  >拍照</el-button
                >
                <!-- <el-button type="primary" @click="onSubmit()">提交</el-button> -->
                <el-button @click="getCompetence()" v-if="!showOpen">重新拍照</el-button>
                <el-button @click="onSubmit()" type="primary" v-if="!showOpen">确认上传</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
  import { netConfig } from '@/config/net.config.js';
  import store from '@/store';
  import axios from 'axios';
  import { uploadFace2 } from '@/api/user';
  // import uploadFace from './uploadFace.vue';
  import Taking from '../../../assets/Taking.jpeg';
  import { ElMessage, ElMessageBox } from 'element-plus';
  // import {} from '@/api/user.js';
  import { updatePassword, updateUser, searchOneUser, uploadFace1 } from '@/api/user';
  // import { computed, nextTick, ref } from 'vue';
  export default {
    // components: {
    //   uploadFace,
    // },
    data() {
      return {
        //
        user: {},
        ADDfaceUrl: '',
        fileFace: '',
        updateFacePCOpen: false,
        //打开摄像头才显示拍照
        showp: false,
        faceOpen: true,
        showOpen: true,
        option: {
          img: '',
        },
        // 是否显示弹出层
        open: false,
        form: {},
        // 拍照
        videoWidth: 250,
        videoHeight: 350,
        imgSrc: '',
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        openVideo: false,
      };
    },
    mounted() {
      // console.log(this.$route.query.id)
      this.getUser();
    },
    methods: {
      // 覆盖默认的上传行为
      requestUpload() {},
      getUser() {
        searchOneUser().then((response) => {
          const { data } = response;
          this.user = data[0];
          // console.log('this.user', this.user);
          this.ADDfaceUrl = netConfig.baseURL + this.user.faceUrl;
          this.option.img = netConfig.baseURL + this.user.faceUrl;
        });
      },
      //新增上传人脸
      onAddChange(file, fileList) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
        //这里我需要上传mp3文件，所以做了限制
        const extension = testmsg === 'mp3';
        // if (!extension) {
        // 	this.$message({
        // 		message: '上传文件只能是mp3格式!',
        // 		type: 'warning'
        // 	});
        // 	return
        // }
        //将选取的文件拿到，这里需要根据自己业务来写
        this.fileFace = file;
        // console.log('file', file);
        // console.log('fileList', fileList);
        var that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function (e) {
          // that.fileList[0]=this.result
          // that.UpdatefaceBase46 = this.result;
          // that.option.img=this.result
          // that.ADDfaceUrl = this.result;
          that.option.img = reader.result;
          that.ADDfaceUrl = reader.result;
          // console.log('result', this.result);
        };
      },
      // // 上传预处理
      // beforeUpload(file) {
      //   if (file.type.indexOf('image/') == -1) {
      //     ElMessage({
      //       showClose: true,
      //       message: '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。',
      //       type: 'error',
      //     });
      //   } else {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = () => {
      //       this.options.img = reader.result;
      //     };
      //   }
      // },
      //提交新增
      async SubmitupdateFace() {
        if (this.fileFace == '') {
          ElMessage({
            showClose: true,
            message: '请先上传人脸图片，再确定',
            type: 'warning',
          });
        } else {
          //自定义上传
          const form = new FormData();
          //将选取的文件插入formdata中
          form.append('face', this.fileFace.raw);
          var that = this;
          await uploadFace1(form).then((response) => {
            this.getUser();
            this.$router.go(0);
            // that.src = this.ADDfaceUrl;
            // that.src = '123';
            // console.log('that.src', that.src);
            this.option.img = netConfig.baseURL + response.data.src + response.data.picName;

            // console.log('图片上传成功', response);
            this.updateFacePCOpen = false;
            ElMessage({
              showClose: true,
              message: '图片上传成功',
              type: 'success',
            });
          });
          await this.getUser();
        }
      },

      // handleRefresh() {
      //   store.dispatch('setting/setRouterView', false);
      //   nextTick(() => {
      //     store.dispatch('setting/setRouterView', true);
      //   });
      // },
      updateFacePC() {
        this.updateFacePCOpen = true;
      },
      updateFace() {
        this.open = true;
      },
      // 关闭摄像头
      stopNavigator() {
        this.showp = false;
        this.faceOpen = true;
        this.thisVideo.srcObject.getTracks()[0].stop();
      },

      onSubmit() {
        // (store.getters.faceUrl = this.imgSrc),
        ElMessageBox.confirm('是否确认上传?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            uploadFace2({
              base46Str: this.imgSrc,
            }).then((response) => {
              // console.log(response); // this.open = false;
              this.getUser();
              this.option.img = this.imgSrc;
              // this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
              // store.commit('SET_AVATAR', this.options.img);
              this.$router.go(0);
              ElMessage({
                showClose: true,
                message: '修改成功',
                type: 'success',
              });
              // this.visible = false;
              this.open = false;
              this.showp = false;
              this.faceOpen = true;
              this.showOpen = true;
              // location.reload();
              // this.handleRefresh();
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });

        // 隐藏摄像头
        document.getElementById('videoCamera').style.display = 'none';
        // 关闭摄像头
        this.stopNavigator();
      },

      // 调用权限（打开摄像头功能）
      getCompetence() {
        //显示拍照
        (this.showp = true),
          //隐藏打开按钮
          (this.faceOpen = false);
        //隐藏前面和拍照
        this.showOpen = true;
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
        //隐藏前面和拍照
        this.showOpen = false;
        //关闭摄像头
        // this.stopNavigator();
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
