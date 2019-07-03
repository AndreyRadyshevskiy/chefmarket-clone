<template>
  <div class="admin-layout">
    <el-container :style="{height: '100%'}">
      <el-aside width="250px">
        <AdminAside/>
      </el-aside>
      <el-main>
        <nuxt/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "@/components/Admin/AdminAside";
export default {
  components: {
    AdminAside
  }
};
</script>

<style lang="scss">
.admin-layout {
  width: 100%;
  height: 100vh;
}
</style>



