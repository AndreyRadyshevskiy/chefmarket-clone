<template>
  <div class="feed-slider">
    <no-ssr>
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="(slide, index) in 7" :key="index">
          <div class="slide-inner">
            <div class="slide-image"></div>
            <div class="slide-content">
              <div class="author"><span class="green">@</span>boookayanny</div>
              <div class="time">месяц назад</div>
              <p class="text">Привет, меня зовут Яна, и я едаголик!</p>
              <p class="text">
                Готова поспорить, что многие люди, глядя на наши с мужем
                кулинарные эксперименты и постоянные поиски вкусных мест,
                думают, что мы слишком расточительные да и просто очень ленивые,
                чтобы готовить дома и экономить.
              </p>
              <p class="text">
                К слову, мы готовим дома часто - минимум 5 раз в неделю(привет
                сервису @chefmarket), зато еда вкусная и разнообразная. Никаких
                блюд приготовленных на неделю вперед, которые надоедают через
                пару дней. У нас каждый день новый...
              </p>
              <a href="https://instagram.com" class="link"
                >Читать в instagram</a
              >
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <el-button icon="el-icon-back" circle class="button-prev"></el-button>
      <el-button icon="el-icon-right" circle class="button-next"></el-button>
      <!-- swiper2 Thumbs -->
      <swiper
        :options="swiperOptionThumbs"
        class="gallery-thumbs"
        ref="swiperThumbs"
      >
        <swiper-slide
          v-for="(slide, index) in 7"
          :key="index"
          class="slide"
        ></swiper-slide>
      </swiper>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev"
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 30,
        slidesPerView: 7,
        touchRatio: 0.2,
        centeredSlides: true,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
      this.swiperTop = this.$refs.swiperTop.swiper;
    });
  }
};
</script>

<style lang="scss" scoped>
.feed-slider {
  position: relative;
  height: 50rem;
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .slide-inner {
    padding: 2rem;
    display: flex;
  }
  .slide-image {
    width: 35rem;
    height: 35rem;
    background: url("~assets/img/feed/feed1.jpg") no-repeat center;
    background-size: cover;
    margin-right: 3rem;
  }
  .slide-content {
    flex: 1;
  }
  .gallery-top {
    height: calc(80% - 10px) !important;
    width: 104.4rem;
    margin-bottom: 5rem;
    background-color: #fff;
  }
  .gallery-thumbs {
    height: 32% !important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    filter: grayscale(100%);
    opacity: 0.75;
    background: url("~assets/img/feed/feed1.jpg") no-repeat center;
    background-size: cover;
    cursor: pointer;
    transition: all 0.2s;
  }
  .gallery-thumbs .swiper-slide-active,
  .gallery-thumbs .swiper-slide:hover {
    filter: grayscale(0%);
    opacity: 1;
  }
  .author {
    font-family: RegalBlack, sans-serif;
    font-size: 2.4rem;
    margin-bottom: 1rem;
    .green {
      color: #59b958;
    }
  }
  .time {
    font-size: 1.4rem;
    margin-bottom: 2.6rem;
  }
  .text {
    font-size: 1.4rem;
    margin-bottom: 2.4rem;
    line-height: 2.4rem;
  }
  .link {
    font-size: 1.4rem;
    color: #59b958;
    text-decoration: underline;
  }
  .button-prev {
    position: absolute;
    left: 0;
    top: 40%;
    transform: translateY(-40%);
    z-index: 199;
  }
  .button-next {
    position: absolute;
    top: 40%;
    right: 0;
    z-index: 199;
    transform: translateY(-40%);
  }
}
</style>
