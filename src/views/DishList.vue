<template>
  <div class="common-layout">
    <el-container>
      <el-header class="nav-header">
        <template #default>
          <NavHeader/>
        </template>
      </el-header>
      <el-container>
        <el-aside width="85px" class="nav-aside">
          <template #default>
            <AsideMenu/>
          </template>
        </el-aside>
        <el-main>
          <div v-if="total < 10">
            <div class="dish_list" @click="goDetail(item)" v-for="item in list" :key="item.id">
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


export default {
  name: "DishList",
  components: {NavHeader, AsideMenu, Share, Dish, Location, NavBottom},
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

.dish_list {
  padding: 6px 6px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;

  .top {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 360px;
      vertical-align: middle;
    }

    .dish_image {
      display: block;
      margin: 0 auto;
    }

    .dish_name {
      display: inline-block;
      max-width: 80px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // transform: translateY(3px);
    }

    span {
      font-size: 14px;
      font-weight: 500;
      color: #232323;
    }

    .tags {
      margin-left: auto;
    }

    .citys {
      max-width: 90px;
      margin-left: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .mid {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      font-size: 18px;
      font-weight: 500;
      color: #fc5034;
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .right {
      font-size: 11px;
      font-weight: 400;
      color: #373636;

      span {
        font-size: 18px;
        color: #373636;
        font-weight: 500;
      }
    }
  }

  .bottom {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      text-align: left;
    }

    p {
      width: 75px;
      text-align: right;
      font-size: 12px;
      font-weight: 400;
      color: #959595;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.dish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
  }
}

.el-main {
  margin:150px 0 0 85px;
  padding: 10px 0 10px 10px;
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
  background-color: gainsboro;
  position: fixed;
}
</style>
