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
                     :before-upload="handleBeforeUpload"
                     :on-preview="handlePreview"
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
        console.log('开始压缩图片');
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
    handleBeforeUpload(file) {
      console.log('handle befoer upload');
      this.compressImage(file).then(compressedFile => {
        file = compressedFile;
        return true;
      }).catch(er => {
        console.log(`compress image file ${JSON.stringify(er)}`);
        ElMessage.error('图片压缩失败');
        return false;
      });
    },
    handleChange(file, fileList) {
      this.imgUrl = file.url;
      this.uploadImage = file.raw;
      // this.compressImage(file).then(compressedFile => {
      //   file = compressedFile;
      //
      // }).catch(er => {
      //   ElMessage.error('图片压缩失败');
      // });
      console.log(`compress image file ${JSON.stringify(file)}`);
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
          if(result.code === 200) {
            // 清空提交数据
            this.dialogForm = {
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
        })
      }, err => {
        ElMessage.error('上传图片失败，请稍后重试');
        console.log(JSON.stringify(err));
      })
    }
  }
}

</script>

<style scoped>
</style>
