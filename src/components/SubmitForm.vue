<script setup>

</script>

<template>
<el-form ref="formDialog" :model="dialogForm" :rules="formRules" label-width="40px">
  <el-row>
    <el-col>
      <el-form-item label="标题:" prop="title">
        <el-input v-modle="dialogForm.title" type="text" placeholder="请输入菜品名" maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="12">
      <el-form-item label="菜系">
        <el-select v-model="categoryLabel" @change="hanleCategory" placeholder="请选择菜系">
          <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-form-item label="上传菜品图片">
        <el-upload ref="upload" :limit="1" accept="image/jpeg,image/jpg" :auto-upload="false" action="#"
        :on-change="(file, fileList) => handleChange(file,fileList)" list-type="picture-card"
        :show-file-list="false" :disabled="!!pcImgId">
          <i class="el-icon-plus" v-if="!pcImgId"></i>
          <div class="mask">
            <div class="actions">
              <span title="预览">
                <i class="el-icon-zoom-in" @click.stop="pcImgDialog = true"></i>
              </span>
              <span title="移除">
                <i class="el-icon-delete" @click.stop="handleRemove(undefined, undefined,'pc')"></i>
              </span>
            </div>
          </div>
        </el-upload>
        <el-dialog :visible.sync="pcImgDialog" title="预览" width="800" append-to-body class="uploadDialog">
          <img :src="pcImgUrl" style="display: block; max-width: 100%; margin: 0 auto;">
        </el-dialog>
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
    <el-button type="primary" :loading="buttonLoading" @click="submitDialogForm">确定</el-button>
  </div>
</template>

<style scoped>

</style>
