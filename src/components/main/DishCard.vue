<template>
  <div v-if="total < 10">
    <div class="dish_list" v-for="item in list" :key="item.id">
      <el-card style="max-width: 480px" shadow="always">
        <template #header>
          <div class="dish-header">
            <span>{{ item.name }}</span>
            <el-tag type="danger" size="small">{{ item.categoryName }}</el-tag>
          </div>
        </template>
        <el-row :gutter="10" space-between>
          <el-col :span="8">
            <div class="grid-content ep-bg-purple">
              <img
                  :src="item.imageUrl"
                  style="width: auto; height:auto; border-radius: 10px;"
                  alt="haochi"/>
            </div>
          </el-col>
          <el-col :span="10" :offset="6">
            <el-space direction="vertical">
              <el-text>{{ item.description }}</el-text>
            </el-space>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const list = reactive([]);




</script>

<style scoped>

</style>
