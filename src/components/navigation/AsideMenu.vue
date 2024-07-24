<template>
  <div class="sidebar">
    <!--    <span>开饭！！！</span>-->
    <el-menu background-color="gainsboro" unique-opened>
      <el-menu-item style="padding-left: 15px" index="1-1" @click="handleMenuItemClick('1-1')">
        <el-icon color="#409efc">
          <Dish/>
        </el-icon>
        菜品
      </el-menu-item>
      <el-menu-item  style="padding-left: 15px" index="2-1" @click="handleMenuItemClick('2-1')">
        <el-icon color="#409efc">
          <Food/>
        </el-icon>
        套餐
      </el-menu-item>
      <el-menu-item style="padding-left: 15px" index="3-1" @click="handleMenuItemClick('3-1')">
        <i class="el-icon-setting"></i>
        最爱
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {Dish, Food} from "@element-plus/icons-vue";

const handleMenuItemClick = (index) => {
  console.log('Menu item clicked:', index);
}
</script>

<style lang="less">
.sidebar {
  width: 100%;
  height: auto;
  left: 0;
  top: 0;
  overflow-y: auto; /* 如果内容过多，允许垂直滚动 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); /* 轻微的阴影效果 */
  margin-top: 16px;
  border-radius: 6px;
}

.el-menu_list {
  padding-left: 0px;
}

.el-menu_item {
  padding-left: 0;
}


</style>
