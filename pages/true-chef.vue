<!--<template>
  <div class="container">
    <div class="chefs-slider">
      <no-ssr>
        <div v-swiper:swiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(chef, index) in chefs" :key="index">
              <nuxt-link :to="{path: 'true-chef', query: {index: index}}" class="slide-inner">
                <div class="slide-image" :style="{backgroundImage: 'url(' + chef.avatar + ')'}"></div>
                <div class="slide-name">{{chef.name}}</div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </no-ssr>
    </div>

    <nuxt-link to="/chefs" class="btn btn-colored btn-centred">подробнее</nuxt-link>
  </div>
</template>

<script>
// export default {
//   data() {
//     const index = this.activeIndex;
//     return {
//       swiperOption: {}
//     };
//   },
//   created() {
//     this.swiperOption = {
//       slidesPerView: 3,
//       loop: true,
//       centeredSlides: true,
//       navigation: {
//         nextEl: ".button-next",
//         prevEl: ".button-prev"
//       },
//       initialSlide: this.activeIndex
//     };
//   },
//   computed: {
//     chefs() {
//       return this.$store.getters["chefs/getChefs"];
//     },
//     activeIndex() {
//       return this.$route.query.index;
//     }
//   }
// };
// </script>

// <style lang="scss">
// // .chefs-slider {
// //   position: relative;
// //   padding-top: 2.5rem;
// //   padding-bottom: 5rem;

// //   .slide-inner {
// //     display: block;
// //     margin: 0 2.5rem;
// //   }
// //   .slide-image {
// //     width: 100%;
// //     height: 26rem;
// //     background-repeat: no-repeat;
// //     background-size: cover;
// //     background-position: center center;
// //   }
// //   .slide-name {
// //     font-family: RegalBlack, sans-serif;
// //     font-size: 2rem;
// //     color: #333;
// //     padding-top: 1.6rem;
// //     text-align: center;
// //   }
// //   .button-prev {
// //     position: absolute;
// //     left: 0;
// //     top: 50%;
// //     transform: translateY(-50%);
// //   }
// //   .button-next {
// //     position: absolute;
// //     top: 50%;
// //     right: 0;
// //     transform: translateY(-50%);
// //   }
// // }
// // .swiper-container {
// //   width: 1026px;
// // }
// </style>
