<template>
  <div class="nav-header">
    <div class="nav-avatar_left">
      <el-avatar size="large" src="/avatar2.jpg"></el-avatar>
      <span>乐乐小公主</span>
    </div>
    <div class="nav-title">
      <span>专属餐厅上线咯</span>
      <div>
        <img class="nav-title_img" src="/sun.svg" alt="sun">
        <img class="nav-title_img" src="/sun.svg" alt="sun">
        <img class="nav-title_img" src="/sun.svg" alt="sun">
      </div>
    </div>
    <div class="nav-avatar_right">
      <el-avatar size="large" src="/avatar1.jpg"></el-avatar>
      <span>羊哈哈的小跟班</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less">
.nav-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;

  span {
    display:block;
    color: white;
  }
}

.nav-title,
.nav-avatar_left,
.nav-avatar_right {
  display: flex;
  flex-direction: column; // 垂直排列子元素
  align-items: center; // 水平居中对齐
  flex: 0 1 auto;
}

.nav-title {
  margin-bottom: 10px;
}


.nav-avatar_left{
  margin:0 0 0 20px;
}

.nav-avatar_right{
  margin-right:20px;
}

.nav-title_img{
  width: 20px;
  height: 20px;
}
</style>
