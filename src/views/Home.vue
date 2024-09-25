<script setup>
import Weather from "@/components/home/Weather.vue";
import {ref} from "vue";
import SubmitDish from "@/components/home/SubmitDish.vue";
import Order from "@/components/home/Order.vue";
import Chat from "@/components/home/Chat.vue";

const activeName = ref('1');
</script>

<template>
  <el-container>
    <el-header class="background-image">
      <div>
        <p>欢迎小美宝！</p>
      </div>
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
        <el-collapse-item name="3">
          <template #title>
            <img src="/public/order.svg" alt="order" class="collapse-icon"/>看看今天要吃的菜吧^.^
          </template>
          <template #default>
            <Order/>
          </template>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template #title>
            <img src="/public/chat.svg" alt="order" class="collapse-icon"/>ChatGPT
          </template>
          <template #default>
            <Chat/>
          </template>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<style scoped>
.collapse-icon {
  margin: 5px;
  width: 25px;
  height: 25px;
}

.background-image {
  background-image: url('/public/ahead.jpg');
  background-size: cover; /* 根据需要设置 */
  background-position: center; /* 根据需要设置 */
}

</style>
