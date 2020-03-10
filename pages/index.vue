<template>
  <main class="home-page">
    <section class="hero-banner">
      <InfoOverlay />
      <div class="hero-content">
        <div class="hero-title">
          Лучший способ
          <br />готовить дома
        </div>
        <div class="hero-subtitle">Доставка продуктов с рецептами</div>
        <nuxt-link to="/dinners" class="btn btn-colored"
          >Выбрать меню</nuxt-link
        >
        <a class="btn btn-transparent" @click="scrollSmoothTo"
          >Узнать подробнее</a
        >
      </div>
    </section>
    <section class="how-it-works" ref="how">
      <div class="container">
        <h5 class="section-title">Как это работает?</h5>
        <div class="features">
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_1.svg" />
            </div>
            <div class="feature-title">Выбирайте блюда на ваш вкус</div>
            <div class="feature-text">
              Каждую неделю 36 новых рецептов от шеф-поваров и диетологов
            </div>
          </div>
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_2.svg" />
            </div>
            <div class="feature-title">Получайте коробку с продуктами</div>
            <div class="feature-text">
              В удобный вам день и интервал — доставка бесплатная
            </div>
          </div>
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_3.svg" />
            </div>
            <div class="feature-title">Готовьте за 20-40 минут</div>
            <div class="feature-text">
              Свежие ингридиенты лучшего качества и наглядные фоторецепты
            </div>
          </div>
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_4.svg" />
            </div>
            <div class="feature-title">Сохраняйте гибкость</div>
            <div class="feature-text">
              Настройте график поставок, с учетом вашего графика, выходных и
              отпуска
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="menu-of-the-week">
      <div class="container">
        <DatesSlider />
        <MenuTabs />
      </div>
      <div :style="{ backgroundColor: '#f9f9f9' }">
        <div class="container">
          <DinnersThumbsSlider :active-menu-data="activeMenuData" />
          <div class="btn-group">
            <nuxt-link to="/dinners" class="btn btn-colored"
              >Смотреть меню</nuxt-link
            >
            <nuxt-link to="/comparison" class="btn btn-transparent btn-black"
              >Сравнить меню</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
    <section class="chefs">
      <div class="container">
        <div class="section-title">Наши шеф-повара</div>
        <div class="section-subtitle">
          Вот кто придумывает для вас идеальные блюда
        </div>
        <ChefsThumbsSlider />
        <nuxt-link to="/true-chef" class="btn btn-colored btn-centred"
          >подробнее</nuxt-link
        >
      </div>
    </section>
    <section class="rating">
      <div class="rating-box">
        <div class="rating-title">4,9</div>
        <div class="rating-stars">
          <span class="rating-star">
            <svg
              height="32"
              width="32"
              viewBox="0 0 32 32"
              class="vue-star-rating-star"
              step="1"
            >
              <linearGradient id="bv65d8" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="100%" stop-color="#FFC73F" />
                <stop offset="100%" stop-color="#E1E1E1" />
              </linearGradient>
              <filter
                id="dhcns8"
                height="130%"
                width="130%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="0" result="coloredBlur" />
                <feMerge>
                  <feM in="coloredBlur" />
                  <feM in="SourceGraphic" />
                </feMerge>
              </filter>
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#fff"
                filter="url(#dhcns8)"
                style
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#999"
                stroke-width="0"
                stroke-linejoin="miter"
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
              />
            </svg>
          </span>
          <span class="rating-star">
            <svg
              height="32"
              width="32"
              viewBox="0 0 32 32"
              class="vue-star-rating-star"
              step="1"
            >
              <linearGradient id="bv65d8" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="100%" stop-color="#FFC73F" />
                <stop offset="100%" stop-color="#E1E1E1" />
              </linearGradient>
              <filter
                id="dhcns8"
                height="130%"
                width="130%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="0" result="coloredBlur" />
                <feMerge>
                  <feM in="coloredBlur" />
                  <feM in="SourceGraphic" />
                </feMerge>
              </filter>
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#fff"
                filter="url(#dhcns8)"
                style
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#999"
                stroke-width="0"
                stroke-linejoin="miter"
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
              />
            </svg>
          </span>
          <span class="rating-star">
            <svg
              height="32"
              width="32"
              viewBox="0 0 32 32"
              class="vue-star-rating-star"
              step="1"
            >
              <linearGradient id="bv65d8" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="100%" stop-color="#FFC73F" />
                <stop offset="100%" stop-color="#E1E1E1" />
              </linearGradient>
              <filter
                id="dhcns8"
                height="130%"
                width="130%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="0" result="coloredBlur" />
                <feMerge>
                  <feM in="coloredBlur" />
                  <feM in="SourceGraphic" />
                </feMerge>
              </filter>
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#fff"
                filter="url(#dhcns8)"
                style
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#999"
                stroke-width="0"
                stroke-linejoin="miter"
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
              />
            </svg>
          </span>
          <span class="rating-star">
            <svg
              height="32"
              width="32"
              viewBox="0 0 32 32"
              class="vue-star-rating-star"
              step="1"
            >
              <linearGradient id="bv65d8" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="100%" stop-color="#FFC73F" />
                <stop offset="100%" stop-color="#E1E1E1" />
              </linearGradient>
              <filter
                id="dhcns8"
                height="130%"
                width="130%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="0" result="coloredBlur" />
                <feMerge>
                  <feM in="coloredBlur" />
                  <feM in="SourceGraphic" />
                </feMerge>
              </filter>
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#fff"
                filter="url(#dhcns8)"
                style
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#999"
                stroke-width="0"
                stroke-linejoin="miter"
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
              />
            </svg>
          </span>
          <span class="rating-star">
            <svg
              height="32"
              width="32"
              viewBox="0 0 32 32"
              class="vue-star-rating-star"
              step="1"
            >
              <linearGradient id="bv65d8" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="100%" stop-color="#FFC73F" />
                <stop offset="100%" stop-color="#E1E1E1" />
              </linearGradient>
              <filter
                id="dhcns8"
                height="130%"
                width="130%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="0" result="coloredBlur" />
                <feMerge>
                  <feM in="coloredBlur" />
                  <feM in="SourceGraphic" />
                </feMerge>
              </filter>
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#fff"
                filter="url(#dhcns8)"
                style
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
                stroke="#999"
                stroke-width="0"
                stroke-linejoin="miter"
              />
              <polygon
                points="16.40131979370215,24.601979690553225,6.760419002466604,29.66998750680719,8.602492231796777,18.935323701829134,0.802639587404299,11.333311977448185,11.581381939327931,9.76698593714963,16.40131979370215,0,21.22125764807637,9.76698593714963,32,11.333311977448185,24.200147355607523,18.935323701829134,26.042220584937695,29.66998750680719,16.40131979370215,24.601979690553225"
                fill="url(#bv65d8)"
              />
            </svg>
          </span>
        </div>
        <div class="rating-desc">
          <div>Средняя оценка наших блюд клиентами</div>
          <div>
            Уже приготовлено:
            <b>7 127 567</b> блюд
          </div>
        </div>
      </div>
    </section>
    <section class="instagram">
      <div class="container">
        <div class="section-title">Тысячи людей уже готовят с Шефмаркет</div>
        <div class="section-subtitle mb4">
          Читайте отзывы здесь и по тегу #шефмаркет в инстаграм
        </div>
        <FeedSlider />
      </div>
    </section>
    <section class="mass-media">
      <div class="container">
        <MediaSlider />
      </div>
    </section>
  </main>
</template>

<script>
import { db } from "@/plugins/firebase";
import { mapGetters } from "vuex";
import ChefsThumbsSlider from "@/components/Sections/ChefsThumbsSlider";
import DatesSlider from "@/components/Sections/DatesSlider";
import DinnersThumbsSlider from "@/components/Sections/DinnersThumbsSlider";
import FeedSlider from "@/components/Sections/FeedSlider";
import MediaSlider from "@/components/Sections/MediaSlider";
import InfoOverlay from "@/components/Sections/InfoOverlay";
import MenuTabs from "@/components/Sections/MenuTabs";
export default {
  head: {
    title: "Главная"
  },
  components: {
    DatesSlider,
    ChefsThumbsSlider,
    DinnersThumbsSlider,
    FeedSlider,
    MediaSlider,
    InfoOverlay,
    MenuTabs
  },
  data() {
    return {
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
  computed: {
    ...mapGetters({
      chefs: "chefs/getChefs",
      activeMenuData: "menu/getActiveMenuData",
      activeMenuSetName: "menu/getActiveMenuSetName"
    })
  },
  methods: {
    scrollSmoothTo() {
      const el = this.$refs.how;
      el.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss">
.home-page {
  .hero-banner {
    position: relative;
    background: url("~assets/img/hero-banner.jpg") no-repeat center center;
    background-size: cover;
    height: calc(100vh - 190px);
    width: 100%;
    display: flex;
    align-items: center;

    .btn {
      margin-right: 1rem;
    }
  }
  .hero-content {
    margin-left: 7rem;
  }
  .hero-title {
    font-family: "Regal", sans-serif;
    font-size: 6.8rem;
    line-height: 6.8rem;
    color: #fff;
    text-shadow: 0 3px 6px #454242;
    margin-bottom: 2rem;
  }
  .hero-subtitle {
    font-size: 2.2rem;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 3px 6px #454242;
    margin-bottom: 4rem;
  }
  .how-it-works {
    padding: 8rem 0;

    .section-title {
      margin-bottom: 3rem;
    }
  }
  .features {
    display: flex;
  }
  .feature {
    width: 25%;
  }
  .feature-image {
    width: 15rem;
    height: 15rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .feature-title {
    font-weight: 600;
    line-height: 2.4rem;
    text-align: center;
  }
  .feature-text {
    line-height: 2.4rem;
    text-align: center;
    padding: 0 1rem;
  }
  .btn-group {
    padding: 2rem 0 6rem 0;
    text-align: center;
  }
  .chefs {
    padding-top: 5rem;
    padding-bottom: 6rem;
  }
  .menu-of-the-week {
    .btn {
      margin-right: 1rem;
    }
  }
  .rating {
    background: linear-gradient(rgb(255, 255, 255) 50%, rgb(249, 249, 249) 50%);
    .rating-box {
      background-color: #fff;
      width: 45rem;
      margin: auto;
      text-align: center;
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.06);
      border-radius: 30px;
      padding: 4rem 0;
    }
    .rating-title {
      font-size: 5.5rem;
      line-height: 6rem;
      font-weight: 900;
      margin-bottom: 2rem;
    }
    .rating-stars {
      margin-bottom: 2rem;
    }
    .rating-star {
      margin: 0 0.5rem;
    }
    .rating-desc {
      font-size: 1.8rem;
      line-height: 3rem;
    }
  }
  .instagram {
    padding-top: 4rem;
    padding-bottom: 20rem;
    background-color: #f9f9f9;
  }
  .mass-media {
    padding-top: 6rem;
    padding-bottom: 8rem;
  }
}
</style>
