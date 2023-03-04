<template>
  <!--  <el-form-item label="人脸照片">
    <el-upload
      ref="upload"
      :action="action"
      name="face"
      :headers="myHeaders"
      list-type="picture-card"
      :limit="0"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
    >
    </el-upload>
  </el-form-item> -->

  <el-row>
    <el-col :span="24">
      <el-form-item label="用户人脸">
        <img :src="ADDfaceUrl" class="el-upload-list__item-thumbnail" />
        <el-upload
          ref="upload"
          action="#"
          :limit="1"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :on-change="onAddChange"
        >
          <el-button type="primary" style="margin-left: 20px">上传人脸</el-button>
        </el-upload>
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmitAddUser()">取消</el-button>
          <el-button type="primary" @click="SubmitAddUser()">确定</el-button>
        </span>
      </template>
    </el-col>
  </el-row>
</template>
<script>
  import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken';
  import { netConfig } from '@/config/net.config.js';
  import { ElMessage } from 'element-plus';
  import { uploadFace1 } from '@/api/user.js';
  export default {
    data() {
      return {
        ADDfaceUrl: '',
        action: netConfig.baseURL + '/user/uploadFace1',
        myHeaders: {
          token: getAccessToken(),
        },
        showfilelist: false,
        //文件上传的参数
        dialogImageUrl: netConfig.baseURL + '',
        dialogVisible: false,
        //图片列表（用于在上传组件中回显图片）
        fileList: [
          // {
          // 	name: '',
          // 	url: ''
          // },
          // {
          // 	name: 'food.jpeg',
          // 	url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ],
      };
    },
    methods: {
      // 覆盖默认的上传行为
      requestUpload() {},
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
            // this.options.img = reader.result;
          };
        }
      },
      onExceed() {},
      // beforeUpload() {},
      //成功返回方法
      handleSuccess(res, file) {
        // http://localhost:8080/SSMDemo_war_exploded/upload/20220507212730WechatIMG501.jpeg
        // console.log(res);
        // console.log(res.data);
        // console.log(file);
        ElMessage({
          showClose: true,
          message: '图片上传成功',
          type: 'success',
        });
        // console.log(res);
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `请勿频繁上传图片操作，您已经选择 ${files.length} 个文件，真的需要重新上传，请刷新页面`
        );
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
    },
  };
</script>
<style scoped></style>
