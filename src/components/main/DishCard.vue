<template>
  <div v-if="total < 10">
    <div class="dish_list" v-for="item in list" :key="item.id">
      <el-card style="max-width: 480px" shadow="always">
        <el-row :gutter="10" space-between>
          <el-col :span="5">
            <div class="grid-content ep-bg-purple">
              <img
                  :src="item.imageUrl"
                  style="width: 130px; height: 130px; border-radius: 10px"
                  alt="haochi"
              />
            </div>
          </el-col>
          <el-col :span="12" :offset="7" style="padding-left: 0px">
            <div class="content-wrapper">
              <div class="content-row card-title">{{ item.name }}</div>
              <div class="content-row">
                <el-tag type="danger" size="small">{{
                    item.categoryName
                  }}
                </el-tag>
              </div>
              <div class="content-row">
                辣度:
                <img
                    v-for="n in item.heatLevel"
                    :key="n"
                    src="/public/hot.svg"
                    alt="hot"
                    class="icon"
                    style="margin: 5px 0 0 3px; width: 16px; height: 16px"
                />
              </div>
              <div class="content-row">
                <span style="color: #dedfe0">已点: {{ item.count }}</span>
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
  <div class="cart" v-show="cartCount > 0">
    <el-button class="cart-icon" @click="showShoppingCart">
      <el-icon size="15">
        <ShoppingCartFull/>
      </el-icon>
    </el-button>
    <span class="cart-count">{{ cartCount }}</span>
  </div>
  <!-- 购物车列表 -->
  <el-drawer
      :with-header="false"
      direction="btt"
      size="30%"
      v-model="isCartListVisible"
  >
    <div class="cart-list">
      <div class="cart-header">
        <el-checkbox v-model="isCheckAll" :indeterminate="isIndeterminate" @change="handleCheckAll">全选</el-checkbox>
        <el-button type="danger" @click="submitCart" >去出餐</el-button>
      </div>
      <div class="cart-item" v-for="(item, index) in currentList" :key="index">
        <el-row :gutter="10" space-between>
          <el-col :span="3" class="cart-item_col">
            <div class="checkbox-container">
              <el-checkbox v-model="item.isChecked" style="border-color: red"
                           @change="handleCheckItem(index, $event)"></el-checkbox>
            </div>
          </el-col>
          <el-col :span="4" class="cart-item_col">
            <div class="grid-content ep-bg-purple">
              <img style="width: 48px;height: 48px" :src="item.imageUrl" alt="item"/>
            </div>
          </el-col>
          <el-col :span="11">
            <div>{{ item.name }}</div>
            <div>数量: {{ item.currentCount }}</div>
          </el-col>
          <el-col :span="6" class="cart-item_col">
            <div class="content-row">
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
          </el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {closeToast, showLoadingToast} from "vant";
import {getDishPage} from "@/http/dish.js";
import {Minus, Plus, ShoppingCartFull} from "@element-plus/icons-vue";

export default {
  name: "DishCard",
  components: {ShoppingCartFull, Minus, Plus},
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: null,
      showResult: false,
      dishItem: {
        name: "",
        description: "",
      },
      isCartListVisible: false,
      currentList: [],
      isChecked: false,
      isIndeterminate: false,
      isCheckAll: true
    };
  },
  computed: {
    cartCount() {
      return this.list.reduce((total, item) => total + item.currentCount, 0);
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
      const toast = showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: "正在加载中...",
      });
      let queryParams = {
        pageNum: this.pageNum,
        pageSize: 10,
      };
      getDishPage(queryParams)
          .then(
              (res) => {
                this.list = [...this.list, ...res.data.records];
                this.loading = false;
                this.total = res.data.total;
                this.finished = this.list.length >= res.data.total;
              },
              (err) => {
                console.error(JSON.stringify(err));
                this.error = true;
              }
          )
          .catch((error) => {
            console.error(JSON.stringify(error));
            this.error = true;
          })
          .finally(closeToast());
    },
    onLoad() {
      this.pageNum++;
      this.getList();
    },
    handleAddClick(item) {
      const index = this.currentList.indexOf(item);
      if (index > -1) {
        this.currentList[index].currentCount++;
      } else {
        item.currentCount++;
        item.isChecked = true;
        this.currentList.push(item);
      }
    },
    handleSubtractClick(item) {
      const index = this.currentList.indexOf(item);
      this.currentList[index].currentCount--;
      if (this.currentList[index].currentCount === 0) {
        this.currentList.splice(index, 1);
        if (this.currentList.length === 0) {
          this.isCartListVisible = false;
        }
      }
    },
    handleCheckAll(val) {
      this.currentList.forEach(item => val ? item.isChecked = true : item.isChecked = false);
      this.isIndeterminate = false;
      this.isCheckAll = val;
    },
    handleCheckItem(idx, isChecked) {
      this.currentList[idx].isChecked = isChecked;
      const checkNum = this.currentList.filter(val => val.isChecked === false).length;
      this.isCheckAll = checkNum <= 0;
      this.isIndeterminate = checkNum === this.currentList.length ? false : !this.isCheckAll;
    },
    showShoppingCart() {
      this.isCartListVisible = !this.isCartListVisible;
    },
    submitCart() {
      console.log("@", this.currentList);
    }
  },
};
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
  margin-left: 5px;
  padding-bottom: 10px;

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

  .cart-button:hover {
    background-color: orangered;
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

.cart {
  position: fixed;
  bottom: 60px; /* 距离底部的距离 */
  right: 20px; /* 距离右侧的距离 */
  z-index: 10; /* 确保图标在页面内容的上方 */

  .cart-icon {
    background-color: #ffffff; /* 背景色 */
    border-radius: 50%; /* 圆形背景 */
    padding: 8px; /* 内边距 */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    cursor: pointer;
  }

  .cart-icon .el-icon {
    color: red;
  }

  .cart-count {
    position: absolute;
    display: block;
    top: -2px; /* 根据实际大小调整 */
    right: 25%; /* 与购物车图标的中心对齐 */
    background-color: red;
    color: white;
    font-size: 12px;
    padding: 1px 5px;
    border-radius: 50%;
    transform: translate(50%, -50%);
    text-align: center;
  }

  .cart-count::before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .cart-count span {
    display: inline-block;
    vertical-align: middle;
  }
}

.cart:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

.cart-list {
  padding: 10px;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.cart-header {
  display:flex;
  justify-content: space-between; /* 左右间隔分布 */
  align-items: center;
}

.cart-item {
  margin-bottom: 10px;
  padding: 5px;
  border-bottom: 1px solid #eee;
}

.el-drawer__header {
  margin-bottom: 0;
}

.cart-item_col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox-container {
  display: inline-block;
  position: relative;
}
</style>
