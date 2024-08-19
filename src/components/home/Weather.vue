<template>
  <div class="weather-container">
    <div>
      <div>
        <img src="/calendar.svg" alt="calendar" class="weather-icon"/>
        今天是2024年8月13号
      </div>
      <div>
        <img src="/location.svg" alt="location" class="weather-icon"/>
        安徽合肥
      </div>
      <div>
        <img src="/suncloud.svg" alt="suncloud" class="weather-icon"/>
        天气
      </div>
      <div>
        <img src="/temperature.svg" alt="lowest" class="weather-icon"/>最低温度
      </div>
      <div>
        <img src="/temperature.svg" alt="highest" class="weather-icon"/>最高温度
      </div>
    </div>
  </div>
</template>

<script setup>

import {House, Location, Sunrise} from "@element-plus/icons-vue";
</script>

<style scoped>
.weather-container {

}

.weather-icon {
  margin: 5px 0 0 3px;
  width: 25px;
  height: 25px;
  padding-top: 10px;
}
</style>
