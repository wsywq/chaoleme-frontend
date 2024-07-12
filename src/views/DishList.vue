<script setup>
import {getDishList} from "@/http/dish.js";

export default {
  name: "DishList",
  data() {
    return {
      imgUrl: 'http://xxxx',
      loading: false,
      finished: false,
      list: [],
      pageNum: 1,
      error: false,
      text: '',
      total: '',
      showResult: false,
      dishName: ''
    }
  },
  computed() {

  },
  created() {
    this.dishName = '';
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
      const toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '正在加载中...',
      });
      getDishList().then(res => {
        console.log(JSON.stringify(res));
        this.list = res.data;
      }, err => {
        console.error(JSON.stringify(err));
      }).catch(error => {
        console.error(JSON.stringify(error));
      })
    },
    onLoad() {
      this.pageNum++;
      this.getList();
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="">
      <van-list v-if="total > 10" v-model="loading" :finished="finished" :error.sync="error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了..." :immediate-check="false" offset="100" @load="onLoad">
        <div class="dish_list" @click="goDetail(item)" v-for="item in list" :key="item.id">
          <div class="top">
            <img :src="imgUrl + item.path + '.png'">
            <span class="proName">{{ item.name }}</span>
            <van-tag class="tags" color="#fdeee9" text-color="#d17557">{{ item.categoryName }}</van-tag>
          </div>
        </div>
      </van-list>
      <div v-if="total < 10">
        <div class="dish_list" @click="goDetail(item)" v-for="item in list" :key="item.id">
          <div class="top">
            <img :src="imgUrl + item.path + '.png'">
            <span class="proName">{{ item.name }}</span>
            <van-tag class="tags" color="#fdeee9" text-color="#d17557">{{ item.categoryName }}</van-tag>
          </div>
        </div>
        <div class="van-list__finished-text">没有更多了</div>
      </div>
    </div>
  </div>
</template>

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
      width: 90px;
      height: 24px;
      vertical-align: middle;
    }

    .proName {
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
</style>
