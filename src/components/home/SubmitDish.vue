<template>
  <el-form :model="dialogForm" label-width="40px">
    <el-row>
      <el-col>
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogForm.name" type="text" placeholder="请输入菜品名" maxlength="200"
                    show-word-limit></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜系">
          <el-select v-model="dialogForm.categoryId" placeholder="请选择菜系">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="辣度">
          <el-select v-model="dialogForm.heatLevel" placeholder="请选择辣度">
            <el-option v-for="item in heatLevelList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="美图">
          <el-upload :limit="1" accept="image/jpeg,image/jpg"
                     :auto-upload="false"
                     action="#"
                     :on-change="(file, fileList) => handleChange(file,fileList)"
                     :on-remove="handleRemove"
                     list-type="picture"
                     :disabled="!!imgUrl">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="做法" prop="content">
          <el-input type="textarea" v-model="dialogForm.description" maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" :loading="submitLoading" @click="submitForm">提交</el-button>
  </div>
</template>

<script setup>

import { ref, reactive, nextTick, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getCategoryList } from "@/http/category.js";
import { uploadFile } from "@/http/common.js";
import { addDish } from "@/http/dish.js";
import { compress } from "@/utils/compress.js";

const heatLevelList = ref([1, 2, 3, 4, 5]);
const dialogForm = ref({
  name: '',
  categoryId: '',
  imageUrl: '',
  description: '',
  heatLevel: 1
});
const rules = reactive({
  title: [{required: true, message: '标题不能为空', trigger: 'blur'}]
});
const categoryList = ref({});
const imgUrl = ref('');
const uploadImage = ref(null);
const showImgDialog = ref(false);
const submitLoading = ref(false);

// 组件挂载时获取分类列表
nextTick(() => {
  getCategoryList().then(res => {
    categoryList.value = res.data;
  });
});

// 处理图片上传和压缩
const handleChange = (file, fileList) => {
  // 回显
  imgUrl.value = URL.createObjectURL(file.raw);
  // 调用自定义的压缩方法
  compress(file.raw, function (val) {
    let newFile = new File([val], file.name, { type: file.raw.type });
    uploadImage.value = newFile; // 直接赋值
    console.log('newFileURL', URL.createObjectURL(val));
  });
};

// 处理图片移除
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

// 提交表单
const submitForm = () => {
  const formData = new FormData();
  formData.append("image", uploadImage.value);
  submitLoading.value = true;
  uploadFile(formData).then(res => {
    dialogForm.value.imageUrl = res.data;
    addDish(dialogForm.value).then(result => {
      if (result.code === 200) {
        // 清空提交数据
        dialogForm.value = {
          name: '',
          categoryId: '',
          imageUrl: '',
          description: '',
          heatLevel: 1
        };
        ElMessage.success('添加菜品成功');
      }
    }, error => {
      console.log(JSON.stringify(error));
      ElMessage.error('添加菜品失败，请稍后重试');
    });
    submitLoading.value = false;
  }, err => {
    ElMessage.error('上传图片失败，请稍后重试');
    console.log(JSON.stringify(err));
    submitLoading.value = false;
  });
};

</script>

<style scoped>
</style>
