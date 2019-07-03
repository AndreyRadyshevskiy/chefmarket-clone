<template>
  <header class="app-header">
    <TopLine/>
    <Navbar/>
    <Categories v-if="showCats"/>
  </header>
</template>

<script>
import TopLine from "@/components/Header/TopLine";
import Navbar from "@/components/Header/Navbar";
import Categories from "@/components/Header/Categories";

export default {
  components: {
    TopLine,
    Navbar,
    Categories
  },
  computed: {
    showCats() {
      return this.$route.path.lastIndexOf("/blog", 0) === 0;
    }
  }
};
</script>

<style lang="scss">
.app-header {
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
}
</style>

