<template>
  <div class="weather-container">
    <div>
      <div>
        <img src="/calendar.svg" alt="calendar" class="weather-icon"/>
        今天是{{ year }}年{{ month }}月{{ date }}号
      </div>
      <div>
        <img src="/location.svg" alt="location" class="weather-icon"/>
        {{ weatherForm.city }}
      </div>
      <div>
        <i :class="iconStyle" />
        天气：{{ weatherForm.text }}
      </div>
      <div>
        <img src="/temperature.svg" alt="lowest" class="weather-icon"/>温度：{{ weatherForm.temp }}
      </div>
      <div>
        <img src="/temperature.svg" alt="highest" class="weather-icon"/>体感温度：{{ weatherForm.feelsLike }}
      </div>
    </div>
  </div>
</template>

<script setup>

import {nextTick, ref} from "vue";
import {getTodayWeather} from "@/http/Weather.js";
import {getUserLocation} from "@/utils/geo.js";

const now = new Date();

// 获取当前时间的年份、月份、日期等
const year = now.getFullYear();
const month = now.getMonth() + 1; // 注意月份是从0开始的
const date = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

const weatherForm = ref({});
const iconStyle = ref("");

fetchData();

function fetchData() {
  getUserLocation().then(res => {
    let queryParams = {
      location: res.longitude + "," + res.latitude
    };
    getTodayWeather(queryParams).then(result => {
      weatherForm.value = result.data;
      // 拼接基础样式和和风天气图标
      iconStyle.value = `weather-icon qi-${result.data.icon}`;
    }).catch(er => {
      console.error(`get weather failed ${JSON.stringify(er)}`);
    });
  });
}

</script>

<style scoped>
.weather-container {

}

.weather-icon {
  margin: 5px 0 0 3px;
  width: 25px;
  height: 25px;
  padding-top: 10px;
  display: inline-block;
  text-align: center;
}
</style>
