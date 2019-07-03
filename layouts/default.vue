<template>
  <div class="default-layout">
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
</style>

