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
import {getDishPage} from "@/http/dish.js";
import {showLoadingToast, closeToast} from 'vant';
import NavBottom from "@/components/navigation/NavBottom.vue";
import NavHeader from "@/components/navigation/NavHeader.vue";
import AsideMenu from "@/components/navigation/AsideMenu.vue";
import DishCard from "@/components/dish/DishCard.vue";

// 创建响应式数据
const imgUrl = ref('xxx');
const loading = ref(false);
const finished = ref(false);
const list = ref([]);
const pageNum = ref(1);
const error = ref(false);
const total = ref('');
const showResult = ref(false);
const dishName = ref('');
const showDishDetail = ref(false);
const dishItem = ref({name: "", description: ""});
const isCollapse = ref(true);

// 生命周期钩子
onMounted(() => {
  dishName.value = '';
});

// 方法
const getList = async () => {
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '正在加载中...',
  });
  try {
    const queryParams = {
      pageNum: pageNum.value,
      pageSize: 10
    };
    const res = await getDishPage(queryParams);
    list.value = [...list.value, ...res.data.records];
    loading.value = false;
    total.value = res.data.total;
    finished.value = list.value.length >= res.data.total;
  } catch (err) {
    console.error(JSON.stringify(err));
    error.value = true;
  } finally {
    closeToast(toast);
  }
};

// const onLoad = () => {
//   pageNum.value++;
//   getList();
// };

const goDetail = (item) => {
  showDishDetail.value = true;
  dishItem.value.name = item.name;
  dishItem.value.description = item.description;
};

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
