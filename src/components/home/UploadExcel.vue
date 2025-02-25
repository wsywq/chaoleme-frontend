<template>
  <el-upload
      class="upload-demo"
      action="#"
      :on-change="handleFileChange"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传 .xlsx 或 .xls 文件，且单文件不超过 5MB</div>
  </el-upload>
</template>

<script setup>
import {ref} from 'vue';
import {ElMessage} from 'element-plus';
import * as XLSX from 'xlsx';
import {uploadExcel} from "@/http/common.js";

const fileList = ref([]);
const parsedData = ref(null);
const uploadFileList = ref(null);
const uploadFileObj = ref('');

// 文件类型校验
const beforeUpload = (file) => {
  const isExcel = file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      'application/vnd.ms-excel';
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isExcel) {
    ElMessage.error('只能上传Excel文件!');
    return false;
  }
  if (!isLt5M) {
    ElMessage.error('文件大小不能超过5MB!');
    return false;
  }
  return true;
};

// 文件改变处理
const handleFileChange = (file, fileList) => {
  fileList.value = fileList.slice(-1); // 只保留最后一个文件
  console.log("File list = ", fileList);
  uploadFileList.value = fileList[0].raw;
  parseExcel(file); // 使用异步方法
};

// 解析Excel文件（已修复）
const parseExcel = async (file) => {
  try {
    // 1. 获取文件内容（兼容Element Plus最新API）
    const content = await file.content; // 返回 Blob 对象
    // 2. 转换为 ArrayBuffer
    const data = await new Response(content).arrayBuffer();
    // 3. 解析Excel
    const workbook = XLSX.read(data, {type: 'arraybuffer'});
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    parsedData.value = jsonData;
  } catch (error) {
    ElMessage.error('文件解析失败!');
    console.error('Excel解析错误:', error);
  }
};

// 提交上传
const submitUpload = async () => {
  console.log("filelist", fileList.value);
  // if (fileList.value.length === 0) {
  //   ElMessage.warning('请选择文件上传');
  //   return;
  // }

  const formData = new FormData();
  // formData.append('file', fileList.value[0]);
  // formData.append('data', JSON.stringify(parsedData.value));
  formData.append('file', uploadFileList.value);

  try {
    const response = await uploadExcel(formData);
    ElMessage.success('上传成功!');
    console.log('服务器响应:', response.data);
  } catch (error) {
    ElMessage.error('上传失败!');
    console.error('错误信息:', error);
  }
};
</script>

<style scoped>
.upload-demo {
  margin: 20px;
}
</style>
