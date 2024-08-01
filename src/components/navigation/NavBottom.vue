<script>
import {ref} from "vue";
import {defineComponent} from "vue";
import {Dish, Edit, HomeFilled, Present, Tools} from "@element-plus/icons-vue";

export default defineComponent({
  components: {Present, Dish, Tools, HomeFilled, Edit}
})

let footerList = ref([])
</script>

<template>
  <el-footer class="footerIcon">
    <el-row :gutter="20">
      <el-col :span="8">
        <router-link to="/home">
          <el-icon :size="20">
            <HomeFilled/>
          </el-icon>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link to="/dish">
          <el-icon>
            <Dish/>
          </el-icon>
        </router-link>
      </el-col>
      <!--      <el-col :span="6">-->
      <!--        <router-link to="/dish">-->
      <!--        <el-icon>-->
      <!--          <Tools/>-->
      <!--        </el-icon>-->
      <!--        </router-link>-->
      <!--      </el-col>-->
      <el-col :span="8">
        <router-link to="/about">
          <el-icon>
            <Present/>
          </el-icon>
        </router-link>
      </el-col>
    </el-row>
  </el-footer>
</template>

<style scoped>
.footerIcon {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  border-top: 1px solid gray;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
}

.el-row {
  margin: 20px 0 10px 0;
  display: flex;
  text-align: center;
  align-items: center;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
</style>
