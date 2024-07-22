<template>
  <!--  <div class="container">-->
  <!--    <div class="">-->
  <!--      <van-list v-if="total > 10" v-model="loading" :finished="finished" :error.sync="error"-->
  <!--                error-text="请求失败，点击重新加载"-->
  <!--                finished-text="没有更多了..." :immediate-check="false" offset="100" @load="onLoad">-->
  <!--        <div class="dish_list" @click="goDetail(item)" v-for="item in list" :key="item.id">-->
  <!--          <div class="top">-->
  <!--            <span class="dish_name">{{ item.name }}</span>-->
  <!--            <img :src="item.imageUrl">-->
  <!--            <van-tag class="tags" color="#fdeee9" text-color="#d17557">{{ item.categoryName }}</van-tag>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </van-list>-->
  <!--      <div v-if="total < 10">-->
  <!--        <div class="dish_list" @click="goDetail(item)" v-for="item in list" :key="item.id">-->
  <!--          <div class="top">-->
  <!--            <span class="dish_name">{{ item.name }}</span>-->
  <!--            <van-tag class="tags" color="#fdeee9" text-color="#d17557">{{ item.categoryName }}</van-tag>-->
  <!--            <div class="dish_image">-->
  <!--              <img :src="item.imageUrl">-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div>-->
  <!--            <el-card style="max-width: 480px">-->
  <!--              <template #header>{{ item.name }}</template>-->
  <!--              <img-->
  <!--                  :src="item.imageUrl"-->
  <!--                  style="width: 100%"-->
  <!--              />-->
  <!--            </el-card>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="van-list__finished-text">没有更多了</div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <van-popup v-model:show="showDishDetail" round :style="{ padding: '64px' }" >-->
  <!--      <van-cell>菜品详情</van-cell>-->
  <!--      <van-cell>{{ dishItem.name }}</van-cell>-->
  <!--      <van-cell>{{ dishItem.description }}</van-cell>-->
  <!--    </van-popup>-->
  <!--  </div>-->
  <!--  <el-backtop :right="10" :bottom="100" />-->
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <!--        <el-aside width="100px">-->
        <!--          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">-->
        <!--            <el-radio-button :value="false">expand</el-radio-button>-->
        <!--            <el-radio-button :value="true">collapse</el-radio-button>-->
        <!--          </el-radio-group>-->
        <!--        </el-aside>-->
        <el-main>
          <div v-if="total < 10">
            <div class="dish_list" @click="goDetail(item)" v-for="item in list" :key="item.id">
              <el-card style="max-width: 480px" shadow="always">
                <template #header>{{ item.name }}</template>
                <el-row :gutter="5">
                  <el-col :span="8">
                    <div class="grid-content ep-bg-purple">
                      <img
                          :src="item.imageUrl"
                          style="auto; height:auto"
                          alt="haochi"/>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content ep-bg-purple-light">
                      <el-tag type="primary">{{ item.categoryName }}</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content ep-bg-purple-light">
                      <el-text>{{ item.description }}</el-text>
                    </div>
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
  Setting,
} from '@element-plus/icons-vue'


export default {
  name: "DishList",
  components: {Location, NavBottom},
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
</style>
