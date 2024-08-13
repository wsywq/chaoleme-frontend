<script setup>
import Weather from "@/components/main/Weather.vue";
</script>

<template>
  <el-container>
    <el-header>
      <p>欢迎小美宝！</p>
    </el-header>
    <el-main>
      <template #default>
        <Weather/>
      </template>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
