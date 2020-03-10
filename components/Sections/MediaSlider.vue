<template>
  <div class="media-slider">
    <no-ssr>
      <swiper :options="swiperOption" ref="mediaSwiper" class="slider-box">
        <swiper-slide>
          <div class="image-box">
            <img <img class="image" src="@/assets/img/media/media1.png" />
          </div>
          <div class="text">
            Как открылся Шефмаркет: большое интервью с создателями сервиса.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media2.png" />
          </div>
          <div class="text">
            Будет вкусно: "обеды- конструкторы" на работу Шефмаркет.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media3.png" />
          </div>
          <div class="text">
            Редактор "Еды" Ольга Астахова тестирует доставки диетического
            питания.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media4.png" />
          </div>
          <div class="text">
            Готовим дома: популярные сервисы доставки еды.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media5.png" />
          </div>
          <div class="text">
            Зачем на самом деле нужен детокс? Очищаемся вместе с Шефмаркет.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media6.png" />
          </div>
          <div class="text">
            Уже не знаете, чем порадовать близких на ужин? Шефмаркет - первый в
            России сервис по доставке продуктов под рецепт.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media7.png" />
          </div>
          <div class="text">
            Артемий Лебедев - о лучшем способе готовить дома.
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-box">
            <img class="image" src="@/assets/img/media/media8.png" />
          </div>
          <div class="text">
            Выбор LifeHacker: Шефмаркет - еда как в отличном ресторане, но
            приготовленная своими руками
          </div>
        </swiper-slide>
      </swiper>
      <el-button
        icon="el-icon-back"
        circle
        class="button-prev"
        @click="mediaSwiper.slidePrev()"
      ></el-button>
      <el-button
        icon="el-icon-right"
        circle
        class="button-next"
        @click="mediaSwiper.slideNext()"
      ></el-button>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 40,
        loop: true,
        // init: false,
        pagination: {
          nextEl: ".button-next",
          prevEl: ".button-prev"
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.mediaSwiper = this.$refs.mediaSwiper.swiper;
    });
  }
};
</script>

<style lang="scss">
.media-slider {
  position: relative;
  .slider-box {
    width: 105rem;
  }
  .image-box {
    padding: 0 2rem;
  }
  .image {
    display: block;
    width: 100%;
  }
  .text {
    background: url("~assets/img/quote.svg") no-repeat;
    padding: 2rem 1rem 0 2rem;
    font-size: 1.2rem;
    line-height: 2rem;
  }
}
</style>
