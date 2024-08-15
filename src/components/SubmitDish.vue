<template>
  <el-form :model="dialogForm" :rules="formRules" label-width="40px">
    <el-row>
      <el-col>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="dialogForm.title" type="text" placeholder="请输入菜品名" maxlength="200"
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
        <el-form-item label="上传菜品图片">
          <el-upload :limit="1" accept="image/jpeg,image/jpg"
                     :auto-upload="false"
                     action="#"
                     :before-upload="compressImage"
                     :on-change="(file, fileList) => handleChange(file,fileList)"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     list-type="picture"
                     :show-file-list="false" :disabled="!!pcImgId">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="内容：" prop="content">
          <el-input type="textarea" v-model="dialogForm.content" maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" :loading="submitLoading" @click="submitForm">确定</el-button>
  </div>
</template>

<script>

import {getCategoryList} from "@/http/category.js";
import {ElMessage} from "element-plus";
import {uploadFile} from "@/http/common.js";
import {addDish} from "@/http/dish.js";

export default {
  name: "SubmitDish",
  components: {},
  data() {
    return {
      heatLevelList: [1, 2, 3, 4, 5],
      dialogForm: {
        name: '',
        categoryId: '',
        imageUrl: '',
        description: '',
        heatLevel: 1
      },
      rules: {
        title: [{required: true, message: '标题不能为空', trigger: 'blur'}]
      },
      categoryList: {},
      imgUrl: '',
      uploadImage: undefined,
      showImgDialog: false,
      submitLoading: false,
    };
  },
  computed() {

  },
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      getCategoryList().then(res => {
        this.categoryList = res.data;
      }, err => {
        console.log('get category failed =' + JSON.stringify(err));
      });
    },
    compressImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            // 创建canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 设置canvas尺寸为172x172
            canvas.width = 172;
            canvas.height = 172;
            // 清除画布内容
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 将图片绘制到canvas上
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 压缩图片并转换为Blob
            canvas.toBlob((blob) => {
              resolve(blob);
            }, 'image/jpeg', 0.8); // JPEG格式，质量设置为0.8
          };
          img.onerror = (error) => {
            reject(error);
            ElMessage.error('图片加载失败');
          };
        };

        reader.onerror = (error) => {
          reject(error);
          ElMessage.error('图片读取失败');
        };
      });
    },
    handleChange(file, fileList) {
      this.imgUrl = file.url;
      this.uploadImage = file.raw;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(uploadFile, uploadFiles) {
      console.log(uploadFile, uploadFiles);
    },
    submitForm() {
      let formData = new FormData();
      formData.append("image", this.uploadImage);
      uploadFile(formData).then(res => {
        this.dialogForm.imageUrl = res.data;
        addDish(this.dialogForm).then(result => {
          console.log(JSON.stringify(result));
        }, error => {
          console.log(JSON.stringify(error));
        })
      }, err => {
        console.log(JSON.stringify(err));
      })
    }
  }
}

</script>

<style scoped>
.mask {
  opacity: 0;
  position: absolute;
  top: 0;
  width: 148px;
  height: 148px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
}

.mask:hover {
  opacity: 1;
}
</style>
