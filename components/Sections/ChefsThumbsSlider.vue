<template>
  <div class="chefs-slider">
    <no-ssr>
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide v-for="(chef, index) in chefs" :key="index">
          <nuxt-link :to="{path: 'true-chef', query: {index: index}}" class="slide-inner">
            <div class="slide-image" :style="{backgroundImage: 'url(' + chef.avatar + ')'}"></div>
            <div class="slide-name">{{chef.name}}</div>
          </nuxt-link>
        </swiper-slide>
      </swiper>
      <el-button icon="el-icon-back" circle class="button-prev" @click="swiper.slidePrev()"></el-button>
      <el-button icon="el-icon-right" circle class="button-next" @click="swiper.slideNext()"></el-button>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    // const index = this.activeIndex;
    return {
      swiper: null,
      swiperOption: {
        slidesPerView: 3,
        loop: true,
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.swiper = this.$refs.swiper.swiper;
    });
  },
  // created() {
  //   this.swiperOption = {
  //     slidesPerView: 3,
  //     loop: true,
  //     navigation: {
  //       nextEl: ".button-next",
  //       prevEl: ".button-prev"
  //     },
  //     initialSlide: this.activeIndex - 1
  //   };
  // },
  computed: {
    chefs() {
      return this.$store.getters["chefs/getChefs"];
    },
    activeIndex() {
      return this.$route.query.index;
    }
  }
};
</script>

<style lang="scss">
.chefs-slider {
  position: relative;
  padding-top: 2.5rem;
  padding-bottom: 5rem;

  .swiper-container {
    width: 1026px;
  }
  .slide-inner {
    display: block;
    margin: 0 2.5rem;
  }
  .slide-image {
    width: 100%;
    height: 26rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .slide-name {
    font-family: RegalBlack, sans-serif;
    font-size: 2rem;
    color: #333;
    padding-top: 1.6rem;
    text-align: center;
  }
  .button-prev {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 199;
  }
  .button-next {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 199;
    transform: translateY(-50%);
  }
}
</style>
