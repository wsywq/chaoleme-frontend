<template>
  <div class="container" id="main">
    <button @click="getList()">请求数据</button>
    <p>{{ listData.list }}</p>
    <Waterfall :list="list" :width="240" :hasAroundGutter="false" style="max-width: 1260px">
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

const router = useRouter();

const list = ref([
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.cGc4c8dVlqnfV3uwcS1IogHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"},
  {src: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"},
  {src: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"},
  {src: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"},
  {src: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"},
  {src: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"},
  {src: "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"},
  {src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse3-mm.cn.bing.net/th/id/OIP-C.YzEeJqgWky6RQMatrMd6-gHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse3-mm.cn.bing.net/th/id/OIP-C.YzEeJqgWky6RQMatrMd6-gHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
  {src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.cGc4c8dVlqnfV3uwcS1IogHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
]);

const toMain = () => {
  router.push({path: "/home"});
};

const listData = reactive({
  list: ""
})
const getList = function () {
  hello().then((res) => {
    console.log(JSON.stringify(res));
    listData.list = res.data;
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
