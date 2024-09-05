<template>
  <div class="common-layout">
    <el-container>
      <el-header class="nav-header">
        <NavHeader/>
      </el-header>
      <el-container>
        <el-aside width="95px" class="nav-aside">
          <AsideMenu/>
        </el-aside>
        <el-main>
          <DishCard/>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <NavBottom/>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {ElContainer, ElHeader, ElAside, ElMain} from 'element-plus';
import NavBottom from "@/components/navigation/NavBottom.vue";
import NavHeader from "@/components/navigation/NavHeader.vue";
import AsideMenu from "@/components/navigation/AsideMenu.vue";
import DishCard from "@/components/dish/DishCard.vue";

// 创建响应式数据
const loading = ref(false);
const finished = ref(false);
const list = ref([]);
const error = ref(false);
const total = ref('');
const dishName = ref('');

// 生命周期钩子
onMounted(() => {
  dishName.value = '';
});

</script>

<style lang="less" scoped>
.common-layout {
  //background-color: #c6e2ff;
}

.container {
  padding: 0 12px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-main {
  margin: 150px 0 60px 85px;
  padding: 5px 0 10px 10px;
}

.nav-header {
  background-color: #f64f4f;
  padding: 0 0 0 10px;
  height: 150px;
  position: fixed;
  z-index: 99999;
}

.nav-aside {
  margin-top: 150px;
  left: 0;
  height: 100%;
  background-color: #ececec;
  position: fixed;
}
</style>
