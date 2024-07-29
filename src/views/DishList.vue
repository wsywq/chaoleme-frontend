<template>
  <div class="common-layout">
    <el-container>
      <el-header class="nav-header">
        <template #default>
          <NavHeader/>
        </template>
      </el-header>
      <el-container>
        <el-aside width="95px" class="nav-aside">
          <template #default>
            <AsideMenu/>
          </template>
        </el-aside>
        <el-main>
          <template #default>
            <DishCard/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <NavBottom/>
</template>

<script>
import {getDishList, getDishPage} from "@/http/dish.js";
import {closeToast, showLoadingToast} from "vant";
import NavBottom from "@/components/navigation/NavBottom.vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Dish, Share,
} from '@element-plus/icons-vue'
import AsideMenu from "@/components/navigation/AsideMenu.vue";
import NavHeader from "@/components/navigation/NavHeader.vue";
import DishCard from "@/components/main/DishCard.vue";


export default {
  name: "DishList",
  components: {DishCard, NavHeader, AsideMenu, Share, Dish, Location, NavBottom},
  data() {
    return {
      imgUrl: 'xxx',
      loading: false,
      finished: false,
      list: [],
      pageNum: 1,
      error: false,
      text: '',
      total: '',
      showResult: false,
      dishName: '',
      showDishDetail: false,
      dishItem: {
        name: "",
        description: ""
      },
      isCollapse: true
    }
  },
  computed: {},
  created() {
    this.dishName = '';
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
      const toast = showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: '正在加载中...',
      });
      let queryParams = {
        pageNum: this.pageNum,
        pageSize: 10
      }
      getDishPage(queryParams).then(res => {
        this.list = [...this.list, ...res.data.records];
        this.loading = false;
        this.total = res.data.total;
        this.finished = this.list.length >= res.data.total;
      }, err => {
        console.error(JSON.stringify(err));
        this.error = true;
      }).catch(error => {
        console.error(JSON.stringify(error));
        this.error = true;
      }).finally(closeToast());
    },
    onLoad() {
      this.pageNum++;
      this.getList();
    },
    goDetail(item) {
      this.showDishDetail = true;
      this.dishItem.name = item.name;
      this.dishItem.description = item.description;
    }
  }
}
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
  margin:150px 0 60px 85px;
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
  margin-top:150px;
  left: 0;
  height: 100%;
  background-color: #ececec;
  position: fixed;
}
</style>
