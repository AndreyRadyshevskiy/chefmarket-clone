<template>
  <div class="chefs-page">
    <div class="container">
      <h1 class="section-title">Наши шеф-повара</h1>
      <div class="section-subtitle">
        Наши шеф-повара не просто круто готовят. У каждого своя фишка: кто-то
        отвечает за домашнюю кухню, кто-то — за японскую, есть и
        повар-вегетарианец, и настоящий ЗОЖник! Найдите своего
      </div>
      <no-ssr>
        <div class="chefs-slider">
          <swiper :options="swiperOption" ref="swiper">
            <swiper-slide v-for="(chef, index) in chefs" :key="index">
              <div class="slide-image-box">
                <img :src="chef.avatar" alt class="slide-image" />
              </div>
              <div class="slide-content">
                <div class="chef-name">{{ chef.name }}</div>
                <p class="chef-info">{{ chef.info }}</p>
                <img src="@/assets/img/quote.svg" />
                <p class="chef-quote">{{ chef.quote }}</p>
              </div>
            </swiper-slide>
          </swiper>
          <el-button
            icon="el-icon-back"
            circle
            class="button-prev"
            slot="button-prev"
          ></el-button>
          <el-button
            icon="el-icon-right"
            circle
            class="button-next"
            slot="button-next"
          ></el-button>
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    chefs() {
      return this.$store.getters["chefs/getChefs"];
    },
    swiperOption() {
      return {
        slidesPerView: 1,
        initialSlide: this.$route.query.index ? this.$route.query.index : 0,
        loop: true,
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev"
        }
      };
    }
  }
};
</script>

<style lang="scss">
.chefs-page {
  padding: 6rem 0;
  .section-subtitle {
    font-size: 1.6rem;
    line-height: 2.4rem;
    max-width: 74rem;
    text-align: left;
    margin: 0 auto;
  }
  .chefs-slider {
    width: 90rem;
    margin: 0 auto;
    position: relative;
  }
  .swiper-container {
    width: 76rem;
    padding-top: 2.5rem;
    padding-bottom: 5rem;
  }
  .swiper-slide {
    display: flex;
    justify-content: space-between;
  }
  .slide-image {
    width: 27.5rem;
    height: auto;
  }
  .slide-content {
    padding-left: 8.7rem;
  }
  .chef-name {
    font-family: RegalBlack, sans-serif;
    font-size: 4rem;
    line-height: 4.6rem;
    color: #333;
  }
  .chef-info {
    font-size: 1.4rem;
    margin: 1rem 0 4rem 0;
  }
  .chef-quote {
    padding-top: 1rem;
    padding-left: 2rem;
    font-size: 1.2rem;
    line-height: 2rem;
  }
}
</style>
