<template>
  <WaterFallList :list="list">
    <template #item="{ item }">
      <div class="item">
        <img :src="item.url" :style="{ height: item.height + 'px' }" />
        <p>{{ item.title }}</p>
      </div>
    </template>
  </WaterFallList>
</template>

<script setup>
import { ref } from 'vue';
import WaterFallList from "@/components/waterfall/WaterFallList.vue";

// 由于瀑布流需要计算元素的高度进行绘制
// 图片的加载是异步的，无法第一时间计算，需要为其设置高度
const list = ref([
  { url: 'koumolusun.jpg', height: 200, title: '图片1' },
  { url: 'xianyukuai.jpg', height: 200, title: '图片2' },
  { url: 'lachaoluosi.jpg', height: 200, title: '图片3' },
  { url: 'baochaobocai.jpg', height: 200, title: '图片4' }
]);
</script>
