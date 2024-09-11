<template>
  <el-table :data="orderList" style="width: 100%">
    <el-table-column prop="checkoutTime" label="出餐时间" width="180"/>
    <el-table-column prop="dishName" label="菜品" width="180"/>
    <!--    <el-table-column prop="dishImage" label="Address" />-->
  </el-table>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getTodayOrder} from "@/http/order.js";
import {ElMessage} from "element-plus";

const orderList = ref([]);
const getOrder = () => {
  getTodayOrder().then(res => {
    if (res.data.length > 0) {
      orderList.value = res.data;
    } else {
      ElMessage.success("今日未点餐哦，快去看看菜吧");
    }

  }, err => {
    console.log(`get today order failed:${JSON.stringify(err)}`);
    ElMessage.error("获取今日订单失败，请稍后再试");
  });
};

onMounted(() => {
  getOrder();
})

</script>

<style scoped>

</style>
