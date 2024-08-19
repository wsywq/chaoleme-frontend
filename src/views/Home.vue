<script setup>
import Weather from "@/components/home/Weather.vue";
import {ref} from "vue";
import SubmitDish from "@/components/home/SubmitDish.vue";

const activeName = ref('1');
</script>

<template>
  <el-container>
    <el-header>
      <p>欢迎小美宝！</p>
    </el-header>
    <el-main>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template #title>
            <img src="/public/weather.svg" alt="weather" class="collapse-icon"/>快来看看今天的天气~~~
          </template>
          <template #default>
            <Weather/>
          </template>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <img src="/public/food.svg" alt="food" class="collapse-icon"/>新菜品研发成功！！！
          </template>
          <template #default>
            <SubmitDish/>
          </template>
        </el-collapse-item>
        <el-collapse-item title="Efficiency" name="3">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which helps
            the users to identify and frees them from memorizing and recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Controllability" name="4">
          <div>
            Decision making: giving advices about operations is acceptable, but do
            not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.collapse-icon {
  margin: 5px;
  width: 16px;
  height: 16px;
}
</style>
