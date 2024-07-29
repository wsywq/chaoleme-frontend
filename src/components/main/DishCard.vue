<template>
  <div v-if="total < 10">
    <div class="dish_list" v-for="item in list" :key="item.id">
      <el-card style="max-width: 480px" shadow="always">
        <!--        <template #header>-->
        <!--          <div class="dish-header">-->
        <!--            <span>{{ item.name }}</span>-->
        <!--            <el-tag type="danger" size="small">{{ item.categoryName }}</el-tag>-->
        <!--          </div>-->
        <!--        </template>-->
        <el-row :gutter="10" space-between>
          <el-col :span="5">
            <div class="grid-content ep-bg-purple">
              <img
                  :src="item.imageUrl"
                  style="width: 130px; height:130px; border-radius: 10px;"
                  alt="haochi"/>
            </div>
          </el-col>
          <el-col :span="12" :offset="7" style="padding-left:0px">
            <div class="content-wrapper">
              <!--              <div class="content-row">{{ item.description }}</div>-->
              <div class="content-row card-title">{{ item.name }}</div>
              <div class="content-row">
                <el-tag type="danger" size="small">{{ item.categoryName }}</el-tag>
              </div>
              <div class="content-row">
                辣度:
                <img
                    v-for="n in item.heatLevel"
                    :key="n"
                    src="/public/hot.svg"
                    alt="hot"
                    class="icon"
                    style="margin:5px 0 0 3px;width: 16px;height:16px"
                />
              </div>
              <div class="content-row">
                <span style="color:#dedfe0">已点: {{ item.count }}</span>
                <div class="cart-container">
                  <div class="cart-control">
                    <el-button
                        class="cart-button"
                        style="border: 2px solid red"
                        @click="handleSubtractClick(item)"
                        :disabled="item.currentCount === 0"
                    >
                      <el-icon :size="10" color="red">
                        <Minus/>
                      </el-icon>
                    </el-button>
                    <span class="count">{{ item.currentCount }}</span>
                    <el-button
                        class="cart-button"
                        type="danger"
                        @click="handleAddClick(item)"
                    >
                      <el-icon :size="10">
                        <Plus/>
                      </el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>

import {closeToast, showLoadingToast} from "vant";
import {getDishPage} from "@/http/dish.js";
import {Minus, Plus} from "@element-plus/icons-vue";

export default {
  name: "DishCard",
  components: {Minus, Plus},
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
    },
    handleAddClick(item) {
      item.currentCount++;
      // console.log(JSON.stringify(item));
    },
    handleSubtractClick(item) {
      if (item.currentCount) {
        item.currentCount--;
      }
      // console.log(JSON.stringify(item));
    },
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

.el-card {
  --el-card-padding: 10px;
}

.content-wrapper {
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 设置为多行排列 */
  justify-content: space-around; /* 均分空间 */
  height: 100%;

  .content-row {
    flex: 1; /* 每个 .row 占一行 */
    display: flex;
    justify-content: left; /* 内容在 .row 内居中 */
  }

  .card-title {
    font-weight: bold;
  }
}

.cart-container {
  display: flex;
  justify-content: flex-end; /* 将控件放在容器的右侧 */
  padding: 0 0 10px 10px;

  .cart-control {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .cart-button {
    border-radius: 50%; /* 圆形按钮 */
    padding: 5px; /* 减小内边距 */
    margin-left: 5px;
    font-size: 12px; /* 减小字体大小 */
    height: 20px; /* 可以设置一个固定的高度 */
    width: 20px;
    border: none;
  }

  /* 禁用按钮的样式 */

  .cart-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .count {
    margin: 0 10px; /* 数量显示，与按钮保持一定间距 */
    font-size: 16px;
  }
}

</style>
