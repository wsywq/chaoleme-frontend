<template>
  <div class="sidebar">
    <!--    <span>开饭！！！</span>-->
    <el-menu background-color="#ececec" unique-opened>
      <el-menu-item style="padding-left: 5px;" index="1" @click="handleMenuItemClick('1')">
        好评亲一个
        <img class="menu-img" src="/kiss.svg" alt="kiss">
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="2" @click="handleMenuItemClick('2')">
        <!--        <el-icon color="#409efc">-->
        <!--          <Food/>-->
        <!--        </el-icon>-->
        健康时蔬
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="3" @click="handleMenuItemClick('3')">
        大口吃肉
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="4" @click="handleMenuItemClick('3')">
        <!--        <i class="el-icon-setting"></i>-->
        滋补养生汤
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="5" @click="handleMenuItemClick('3')">
        暖胃营养粥
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="6" @click="handleMenuItemClick('3')">
        炸物
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="7" @click="handleMenuItemClick('3')">
        大口干饭
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="8" @click="handleMenuItemClick('3')">
        饮品不能少
      </el-menu-item>
      <el-menu-item style="padding-left: 8px;" index="9" @click="handleMenuItemClick('3')">
        套餐
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
  border-radius: 6px;
}

.el-menu-item {
  border-bottom: 1px solid #dedfe0;
  border-radius: 3px;
}

.el-menu-item:not(.is-disabled):hover {
  background-color: #f5f5f5;
  color: #409eff;
  font-weight: bold;
  border-left: 4px solid red;
}

.menu-img {
  width: 20px;
  height: 20px;
}

</style>
