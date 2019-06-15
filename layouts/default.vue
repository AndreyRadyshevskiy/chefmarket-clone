<template>
  <div class="app-wrapper">
    <div class="app-header">
      <TopLine />
      <Navbar />
    </div>
    <div class="app-main">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import TopLine from '@/components/Header/TopLine'
import Navbar from '@/components/Header/Navbar'
import Footer from '@/components/Footer/Footer'

export default {
  components: {
    TopLine,
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">

.app-header {
  position: relative;
  background: #fff;
}
</style>

