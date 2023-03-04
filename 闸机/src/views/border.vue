<template>
	<div class="bColor">
		<div class="container">
			<div class="background-img">
				<div class="box">
					<!-- transform渲染会卡顿 -->
					<!-- <span></span>
					<span></span>
					<span></span>
					<span></span> -->
					<div class="content" v-show="!showVideo"><h2 style="margin: 40% auto">Show Your Face !</h2></div>
					<div class="content" v-show="showVideo">
						<video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay style="position: absolute;left: 0;top: 0;object-fit:cover;"></video>
						<canvas style="display:none;left: 0;top: 0" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
					</div>
				</div>
				<img src="../assets/target.png" style="position: absolute;right: 40%;top:20%;width: 100px;height: 100px" />
				<div>
					<div style="width: 395px;height: 270px;position: absolute;right: 5%;top:10%;background: white">
						<h2 style="margin: 15% 0" align="center" v-show="!imgSrc" v-html="status"></h2>
						<div v-show="imgSrc" class="img_bg_camera"><img :src="imgSrc" alt class="tx_img" style="width: 395px;height: 270px;" /></div>
					</div>
					<img src="../assets/tv.png" style="position: absolute;right: -42px;top:-7%;width: 600px;height: 540px" />
				</div>
				<div style=" ">
					<div>
						<el-input
							placeholder="请输入会议号"
							v-model="websockId"
							clearable
							id="websocket"
							style="width: 160px;position: absolute;right: 21%;bottom:18%"
						></el-input>
					</div>
<!-- 					<div><el-input placeholder="请输入姓名" v-model="inputName" clearable id="name" style="width: 160px;position: absolute;right: 24%;bottom:15%"></el-input></div>
					<div style="margin-top: 10px">
						<el-input placeholder="请输入ID" v-model="inputId" clearable id="id" style="width: 160px;position: absolute;right: 10%;bottom:15%"></el-input>
					</div> -->
				</div>

				<el-button @click="clickWebsocket()" type="success" style="right: 15%;bottom:18%;position:absolute;">连接</el-button>
				<br />
				<el-button @click="closeWebsocket()" type="success" style="right: 7%;bottom:18%;position:absolute;">断开连接</el-button>
				<br />
				<!-- <el-button @click="addImage()" type="success" style="right: 4%;bottom:15%;position:absolute;">录入</el-button> -->
				<br />
				<el-button @click="getCompetence()" type="primary" style="right: 7%;bottom:8%;position:absolute;">打开摄像头</el-button>
				<el-button @click="stopNavigator()" type="warning" style="right: 17%;bottom:8%;position:absolute;">关闭摄像头</el-button>
				<!-- <el-button @click="setImage()" type="success" style="right: 23%;bottom:5%;position:absolute;">识别</el-button> -->
				<el-button @click="checkFace()" type="warning" style="right: 27%;bottom:8%;position:absolute;">检测人脸</el-button>
				<!-- <el-button @click="open(1)" style="right: 30%;bottom:5%;position:absolute;">Closes automatically</el-button> -->
			</div>
		</div>
	</div>
</template>
<script>
import { h } from 'vue';
import { ElNotification, ElMessage } from 'element-plus';
import './tracking-min.js';
import './face-min.js';
import axios from 'axios';
export default {
	name: 'border',
	data() {
		return {
			videoWidth: 565,
			videoHeight: 565,
			showVideo: false,
			imgSrc: '',
			thisCancas: null,
			websockId: '',
			thisContext: null,
			thisVideo: null,
			openVideo: false,
			inputName: '',
			inputId: '',
			trackerTask: null,
			ws: null,
			wsIsclose: true,
			ischeckface: false,
			tracker: null,
			startTime: '2022-08-11 01:52',
			endTime: '2022-08-11 01:53',
			signTime: '2022-08-11 01:51',
			theme: '主题',
			status: '会议未连接',
			isStart: 0
		};
	},
	watch: {},
	methods: {
		closeWebsocket() {
			var _this = this;
			_this.wsIsclose = true;
			_this.ws.close();
		},
		listing() {
			ElMessage({
				message: '会议连接成功',
				type: 'success'
			});
		},
		no_start() {
			var _this = this;
			var run = function() {
				var d = new Date(_this.startTime);
				function p(s) {
					return s < 10 ? '0' + s : s;
				}
				if (_this.startTime != null) {
					if (_this.isStart == 0) {
						var t = new Date(_this.signTime) - new Date();
						if (t <= 0) {
							_this.isStart = 1;
							setTimeout(run, 1000);
							return;
						}
						var waiteTime = Math.trunc(t / 3600000) + '小时' + Math.trunc((t % 3600000) / 60000) + '分钟' + Math.trunc((t % 60000) / 1000) + '秒';
						_this.status =
							"<h5><font color='orange'>" +
							_this.theme +
							'</font></h5>' +
							'<br>' +
							"<h5>会议开始时间：<br><font color='green'>" +
							_this.startTime +
							'</font></h5><br>' +
							"<h6>距离开始签到还剩：<font color='red'>" +
							waiteTime +
							'</font></h6>';
						setTimeout(run, 1000);
					} else if (_this.isStart == 1) {
						var t = new Date(_this.startTime) - new Date();
						if (t <= 0) {
							_this.isStart = 2;
							setTimeout(run, 1000);
							return;
						}
						_this.status =
							"<h5><font color='orange'>" +
							_this.theme +
							'</font></h5>' +
							'<br>' +
							"<h5>会议开始时间：<br><font color='green'>" +
							_this.startTime +
							'</font></h5><br>' +
							'<h5>请刷脸进行签到</h5>';
						setTimeout(run, 1000);
					} else if (_this.isStart == 2) {
						var t = new Date(_this.endTime) - new Date();
						if (t <= 0) {
							_this.isStart = 3;
							setTimeout(run, 1000);
							return
						}
						_this.status = "<h4><font color='orange'>" + _this.theme + '</font></h4><br>' + '<h5>会议进行中</h5><br><h5>请刷脸进行签到</h5>';
						setTimeout(run, t);
					} else if (_this.isStart == 3) {
						_this.status = "<h4><font color='orange'>" + _this.theme + '</font></h4><br>' + '<h4>会议已结束</h4>';
					}
				}
			};
			run();
		},
		open(name) {
			var time = new Date();
			ElNotification({
				title: '签到成功',
				message: h(
					'i',
					{
						style: 'color: teal'
					},
					name,
					'     ' + time.toLocaleString()
				)
			});
		},
		clickWebsocket() {
			var _this = this;
			_this.websockId = document.getElementById('websocket').value;
			_this.ws = new WebSocket('ws://www.saigoumvp.work:7107/api/websocket/' + _this.websockId);
			_this.ws.onopen = evt => {
				_this.wsIsclose = false;
				if (_this.ischeckface) {
					_this.trackerTask = tracking.track('#videoCamera', _this.tracker, {
						camera: true
					});
				}
			};
			_this.ws.onmessage = msg => {
				var json = JSON.parse(msg.data);
				var data = JSON.parse(json.data);
				if (json.code == 200) {
					_this.imgSrc = 'data:image/png;base64,' + data.base64; //赋值并预览图片
					_this.open(data.name);
					setTimeout(function() {
						_this.imgSrc = '';
					}, 2000);
				} else if (json.code == 201) {
					_this.startTime = data.startTime;
					_this.endTime = data.endTime;
					_this.signTime = data.signTime;
					_this.theme = data.theme;
					_this.isStart = 0;
					_this.listing();
					_this.no_start();
				} else if (json.code == 202) {
					ElMessage.error('不存在该会议号');
					_this.status = '会议未连接';
					_this.startTime = null;
					_this.endTime = null;
					_this.signTime = null;
					_this.theme = null;
					_this.isStart = 0;
					
				}
			};
			_this.ws.onclose = msg => {
				_this.wsIsclose = true;
				if (_this.ischeckface) {
					_this.trackerTask.stop();
					ElMessage({
						message: '关闭人脸检测',
						type: 'warning'
					});
				}
				ElMessage({
					message: '会议连接断开',
					type: 'warning'
				});
				_this.status = '会议未连接';
				_this.startTime = null;
				_this.endTime = null;
				_this.signTime = null;
				_this.theme = null;
				_this.isStart = 0;
			};
		},

		checkFace() {
			var _this = this;
			var video = document.getElementById('videoCamera');
			var canvas = document.getElementById('canvasCamera');
			var context = canvas.getContext('2d');

			if (!_this.ischeckface) {
				ElMessage({
					message: '开启人脸检测',
					type: 'success'
				});
				_this.ischeckface = true;
				_this.tracker = new tracking.ObjectTracker('face');
				_this.tracker.setInitialScale(4);
				_this.tracker.setStepSize(2);
				_this.tracker.setEdgesDensity(0.1);

				_this.trackerTask = tracking.track('#videoCamera', _this.tracker, {
					camera: true
				});

				_this.tracker.on('track', function(event) {
					if (event.data.length <= 0) {
						// console.log("未检测到人脸")
						return;
					}
					// console.log("检测到")
					context.clearRect(0, 0, canvas.width, canvas.height);
					event.data.forEach(function(rect) {
						if (!_this.wsIsclose && (_this.isStart == 1 || _this.isStart == 2)) {
							context.strokeStyle = '#a64ceb';

							_this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight);
							// 获取图片base64链接
							var image = _this.thisCancas.toDataURL();
							// image/png、image/jpeg、image/webp
							//_this.imgSrc = image; //赋值并预览图片
							//console.log(image)
							var form = new FormData();
							var json = {
								data: {
									Type: 'BASE64',
									base64: image.replace(/^data:image\/\w+;base64,/, ''),
									//image.replace(/^data:image\/\w+;base64,/, ""),
									meetingid: _this.websockId
								}
							};

							form.append('data', JSON.stringify(json));
							var time = new Date().getTime();

							var ws = _this.ws;

							ws.send(JSON.stringify(json));
							console.log('Send face_image to JAVA', json.data.meetingid);
							_this.wsIsclose = true;
							setTimeout(function() {
								_this.wsIsclose = false;
							}, 1000);
						}else if(!_this.wsIsclose&&(_this.isStart==0||_this.isStart==3)){
							ElMessage({
								message: '请在会议签到时间内签到',
								type: 'warning'
							});
							_this.wsIsclose = true;
							setTimeout(function() {
								_this.wsIsclose = false;
							}, 2000);
						}
					});
				});
			}
		},

		// 调用权限（打开摄像头功能）
		getCompetence() {
			var _this = this;
			if (!_this.showVideo) {
				_this.showVideo = true;
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
					navigator.mediaDevices.getUserMedia = function(constraints) {
						// 首先获取现存的getUserMedia(如果存在)
						var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
						// 有些浏览器不支持，会返回错误信息
						// 保持接口一致
						if (!getUserMedia) {
							//不存在则报错
							return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
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
						transform: 'scaleX(-1)'
					}
				};
				navigator.mediaDevices
					.getUserMedia(constraints)
					.then(function(stream) {
						// 旧的浏览器可能没有srcObject
						if ('srcObject' in _this.thisVideo) {
							_this.thisVideo.srcObject = stream;
						} else {
							// 避免在新的浏览器中使用它，因为它正在被弃用。
							_this.thisVideo.src = window.URL.createObjectURL(stream);
						}
						_this.thisVideo.onloadedmetadata = function(e) {
							_this.thisVideo.play();
						};
					})
					.catch(err => {
						_this.showVideo = false;
						console.log(err);
					});
			}
		},
		//  绘制图片（拍照功能）
		addImage() {
			var _this = this;
			// canvas画图
			if (!_this.showVideo) {
				ElMessage.error('摄像头未打开');
			} else {
				_this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight);
				// 获取图片base64链接
				var image = this.thisCancas.toDataURL();
				// image/png、image/jpeg、image/webp
				_this.imgSrc = image; //赋值并预览图片
				var form = new FormData();
				var json = {
					Type: 'BASE64',
					base64: image.replace(/^data:image\/\w+;base64,/, ''),
					userid: document.getElementById('id').value,
					name: document.getElementById('name').value
				};
				form.append('data', JSON.stringify(json));

				axios({
					method: 'post',
					url: 'http://www.saigoumvp.work:5001/addface',
					// url: 'http://127.0.0.1:5001/addface',
					data: form,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(result => {
					console.log(result.data);
				});
				setTimeout(function() {
					_this.imgSrc = '';
				}, 2000);
			}
		},
		setImage() {
			var _this = this;
			// canvas画图
			if (!_this.showVideo) {
				ElMessage.error('摄像头未打开');
			} else {
				_this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight);
				// 获取图片base64链接
				var image = this.thisCancas.toDataURL();
				// image/png、image/jpeg、image/webp
				_this.imgSrc = image; //赋值并预览图片
				var form = new FormData();
				var json = {
					Type: 'BASE64',
					base64: image.replace(/^data:image\/\w+;base64,/, '')
				};
				form.append('data', JSON.stringify(json));
				axios({
					method: 'post',
					url: 'http://www.saigoumvp.work:5001/searchface',
					// url: 'http://127.0.0.1:5001/searchface',
					data: form,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(result => {
					console.log(result.data);
				});
				setTimeout(function() {
					_this.imgSrc = '';
				}, 1500);
			}
		},
		// 关闭摄像头
		stopNavigator() {
			if (this.showVideo) {
				this.thisVideo.srcObject.getTracks()[0].stop();
				this.showVideo = false;
			}
			if (this.ischeckface) {
				// 取消监听
				this.trackerTask.stop();
				this.ischeckface = false;
			}
			ElMessage({
				message: '人脸检测关闭',
				type: 'success'
			});
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
				type: mime
			});
		}
	}
};
</script>
<style>
.bColor {
	height: 100vh;
	background: #e8cbc0;
	/* fallback for old browsers */
	background: -webkit-linear-gradient(to right, rgb(232, 203, 192), rgb(99, 111, 164));
	/* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, rgb(232, 203, 192), rgb(99, 111, 164));
	/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	overflow: hidden;
}

* {
	margin: 0;
	padding: 0;
}

.container {
	padding-top: 20px;
	padding-bottom: 20px;
}

.background-img {
	/* background-image: url("../assets/image/dribbble.png"); */
	height: 600px;
	width: 1200px;
	background-repeat: no-repeat;
	background-size: cover;
	margin: 2% auto;
	padding: 20px;
	border: 1px solid #2a3cad;
	border-radius: 4px;
	box-shadow: 0 0 5px #2a3cad;
	position: relative;
}

.content h2 {
	font-size: 19px;
}

.box {
	position: absolute;
	top: 50%;
	left: 26%;
	transform: translate(-50%, -50%);
	width: 600px;
	height: 600px;
	background: #111845a6;
	box-sizing: border-box;
	overflow: hidden;
	box-shadow: 0 20px 50px rgb(23, 32, 90);
	border: 2px solid #2a3cad;
	color: white;
	padding: 20px;
}

.box:before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.1);
	transition: 0.5s;
	pointer-events: none;
}

.box:hover:before {
	left: -50%;
	transform: skewX(-5deg);
}

.box .content {
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border: 1px solid #f0a591;
	padding: 20px;
	text-align: center;
	box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
}

.box span {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: block;
	box-sizing: border-box;
}

.box span:nth-child(1) {
	transform: rotate(0deg) translateZ(0);
}

.box span:nth-child(2) {
	transform: rotate(90deg) translateZ(0);
}

.box span:nth-child(3) {
	transform: rotate(180deg) translateZ(0);
}

.box span:nth-child(4) {
	transform: rotate(270deg) translateZ(0);
}

.box span:before {
	content: '';
	position: absolute;
	width: 100%;
	height: 2px;
	background: #50dfdb;
	animation: animate 4s linear infinite;
}

@keyframes animate {
	0% {
		transform: scaleX(0);
		transform-origin: left;
	}

	50% {
		transform: scaleX(1);
		transform-origin: left;
	}

	50.1% {
		transform: scaleX(1);
		transform-origin: right;
	}

	100% {
		transform: scaleX(0);
		transform-origin: right;
	}
}
</style>
