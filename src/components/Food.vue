<template>
  <div class="container" id="main">
    <button @click="getList()">请求数据</button>
    <Waterfall :list="listData" :width="240" :hasAroundGutter="false" style="max-width: 1260px">
      <template #item="{ item, url, index }">
        <div class="card">
          <LazyImg :url="url" style="border-radius: 8px" @click="toMain"/>
          <div class="footer">
            <a class="title"><span>这是具体内容</span></a>
          </div>
        </div>
      </template>
    </Waterfall>
  </div>
  <el-backtop :right="50" :bottom="50"/>
  <NavBottom/>
</template>
<script setup>
import {Waterfall, LazyImg} from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import NavBottom from "@/components/navigation/NavBottom.vue"
import {hello} from "@/http/api.js";
import {getDishList} from "@/http/dish.js";

const router = useRouter();

const listData = [
  {src: "http://106.54.32.95:7080/xianyukuai.jpg"},
  {src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.cGc4c8dVlqnfV3uwcS1IogHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
];

const list = ref([]);

const toMain = () => {
  router.push({path: "/home"});
};

const getList = function () {
  getDishList().then((res) => {
    console.log(JSON.stringify(res));
    // listData.list = res.data;
    list.value = listData;
    console.log(JSON.stringify(list));
  }, (err) => {
    console.log(JSON.stringify(err));
  });
}
</script>

<style lang="less" scoped>
.loading-text {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
  margin: auto;
  padding: 20px 0;
  font-size: 16px;
}

.container {
  padding: 0 12px;
}
</style>
