<template>
  <div class="video-slider">
    <no-ssr>
      <swiper
        :options="swiperOption"
        ref="videoSwiper"
        class="video-swiper"
        @click.native="showVideoRecipe"
      >
        <swiper-slide v-for="(slide, index) in 3" :key="index">
          <img
            src="@/assets/img/how-it-works/play-button.svg"
            alt="кнопка воспроизведения"
            class="play-btn"
          />
          <img
            src="@/assets/img/how-it-works/rec-1.jpg"
            alt="Видео рецепт"
            class="video-slide-image"
          />
          <p class="slide-text">
            Пироженное "Павлова". Доставка
            <br />продуктов с рецептами Шефмаркет
          </p>
        </swiper-slide>
      </swiper>
      <el-button
        icon="el-icon-back"
        circle
        class="button-prev"
        @click="swiper.slidePrev()"
      ></el-button>
      <el-button
        icon="el-icon-right"
        circle
        class="button-next"
        @click="swiper.slideNext()"
      ></el-button>
    </no-ssr>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      center
      class="video-dialog"
    >
      <div class="section-title section-title--md">Видео рецепт</div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/c8em476MxgY"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video-frame"
      ></iframe>
      <el-button
        class="btn btn-transparent btn-black"
        @click="dialogVisible = false"
        >Назад</el-button
      >
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev"
        }
      },
      dialogVisible: false
    };
  },
  updated() {
    this.$nextTick(() => {
      this.swiper = this.$refs.videoSwiper.swiper;
    });
  },
  methods: {
    showVideoRecipe(event) {
      const slide = event.target.closest(".swiper-slide");
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss">
.video-slider {
  position: relative;
  width: 1140px;
  margin: 0 auto 6rem auto;
  .video-swiper {
    width: 1026px;
  }
  .swiper-slide {
    text-align: center;
    position: relative;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  .play-btn {
    position: absolute;
    top: 10%;
    left: 30%;
  }
  .video-slide-image {
    border-radius: 0;
    margin-bottom: 2rem;
  }
  .slide-text {
    line-height: 2.4rem;
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
  .el-dialog__body {
    text-align: center;
  }
  .video-frame {
    display: block;
    margin: 4rem auto;
  }
}
</style>
