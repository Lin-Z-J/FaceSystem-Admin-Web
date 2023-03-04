<template>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>参会人员信息录入</span>
        <!-- <el-button class="button" text>Operation button</el-button> -->
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <div style="background-color:;height: 550px;">

          <!-- 拍照 -->

          <div class="camera_outer">
            <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay
              style="margin: auto;padding: 50px; box-shadow:0px 0px 12px rgba(0, 0, 0, 0.12);"></video>
            <canvas style="display: none" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
            <div v-if="imgSrc" class="img_bg_camera" style="margin: auto;padding: 50px;">
              <p>效果预览</p>
              <img :src="imgSrc" alt class="tx_img" />
            </div>
            <div class="button">
              <el-button @click="getCompetence()" type="primary">打开摄像头</el-button>
              <el-button @click="stopNavigator()" type="warning">关闭摄像头</el-button>
              <el-button @click="setImage()" type="success">拍照</el-button>
            </div>
          </div>


        </div>
      </el-col>




      <el-col :span="12">
        <div style="background-color:;height: 550px;">
          <el-row :gutter="20">
            <el-form ref="form" :model="form" label-width="80px" style="margin: 150px 10px 10px;">

              <el-row>
                <el-col :span="24">
                  <el-form-item label="人员姓名" prop="nickName">
                    <el-input v-model="form.nickName" placeholder="admin" maxlength="30" />
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="手机号码" prop="nickName">
                    <el-input v-model="form.phonenumber" placeholder="15299999999" maxlength="30" />
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="1916269379@qq.com" maxlength="50" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="性别">
                    <el-select v-model="form.region" placeholder="男">
                      <el-option label="男" value="男"></el-option>
                      <el-option label="女" value="女"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="content">
                    <el-input type="textarea" v-model="form.content"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="onSubmit()">提交</el-button>
                <!-- <el-button>Cancel</el-button> -->
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        // 拍照
        videoWidth: 250,
        videoHeight: 350,
        imgSrc: "",
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        openVideo: false,
      }
    },
     mounted() {
        console.log(this.$route.query.id)
      },
    methods: {
      
      onSubmit(){},
      
      
      // 调用权限（打开摄像头功能）
      getCompetence() {
        var _this = this;
        _this.thisCancas = document.getElementById("canvasCamera");
        _this.thisContext = this.thisCancas.getContext("2d");
        _this.thisVideo = document.getElementById("videoCamera");
        _this.thisVideo.style.display = "block";
        // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function(constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              //不存在则报错
              return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
              );
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function(resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        var constraints = {
          audio: false,
          video: {
            width: this.videoWidth,
            height: this.videoHeight,
            transform: "scaleX(-1)",
          },
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in _this.thisVideo) {
              _this.thisVideo.srcObject = stream;
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = function(e) {
              _this.thisVideo.play();
            };
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //  绘制图片（拍照功能）
      setImage() {
        var _this = this;
        // 隐藏摄像头
        _this.thisVideo.style.display = "none";
        // canvas画图
        _this.thisContext.drawImage(
          _this.thisVideo,
          0,
          0,
          _this.videoWidth,
          _this.videoHeight
        );
        // 获取图片base64链接
        var image = this.thisCancas.toDataURL("image/png");
        // image/png、image/jpeg、image/webp
        _this.imgSrc = image; //赋值并预览图片
        // console.log(image)
        axios({
          method: 'post',
          url: 'http://localhost:8080/SSMDemo_war_exploded/uploadImage.spring',
          data: {
            s: _this.imgSrc
          }
          // data: JSON.parse(_this.imgSrc)
        }).then(result => {
          console.log(result.data)
        })

      },
      // 关闭摄像头
      stopNavigator() {
        this.thisVideo.srcObject.getTracks()[0].stop();
      },
      // base64转文件，此处没用到
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {
          type: mime
        });
      },
    },
  }
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
