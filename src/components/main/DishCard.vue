<template>
  <div v-if="total < 10">
    <div class="dish_list" v-for="item in list" :key="item.id">
      <el-card style="max-width: 480px" shadow="always">
        <template #header>
          <div class="dish-header">
            <span>{{ item.name }}</span>
            <el-tag type="danger" size="small">{{ item.categoryName }}</el-tag>
          </div>
        </template>
        <el-row :gutter="10" space-between>
          <el-col :span="10">
            <div class="grid-content ep-bg-purple">
              <img
                  :src="item.imageUrl"
                  style="width: 160px; height:160px; border-radius: 10px;"
                  alt="haochi"/>
            </div>
          </el-col>
          <el-col :span="8" :offset="6">
            <div class="content-wrapper">
              <div class="content-row">{{ item.description }}</div>
              <div class="content-row" style="color:#dedfe0">已点: 0</div>
              <div class="content-row">
                <img style="width: 32px;height:32px" src="/public/love.svg" alt="love"/>
              </div>
            </div>
<!--            <div class="content-wrapper">-->
<!--              -->
<!--              -->
<!--            </div>-->
<!--            <div class="img-wrapper">-->
<!--              -->
<!--            </div>-->
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>

import {closeToast, showLoadingToast} from "vant";
import {getDishPage} from "@/http/dish.js";

export default {
  name: "DishCard",
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: null,
      showResult: false,
      dishItem: {
        name: "",
        description: ""
      }
    }
  },
  computed: {},
  created() {
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
    }
  }
}


</script>

<style lang="less" scoped>
.dish_list {
  padding: 6px 6px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
}

.dish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
  }
}

.content-wrapper {
  display: flex;          /* 使用 Flexbox 布局 */
  flex-direction: column; /* 设置为多行排列 */
  justify-content: space-around; /* 均分空间 */
  height: 100%;

  .content-row {
    flex: 1;                /* 每个 .row 占一行 */
    display: flex;
    justify-content: left; /* 内容在 .row 内居中 */
    align-items: left;
  }
}



</style>
