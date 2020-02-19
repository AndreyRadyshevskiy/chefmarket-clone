<template>
  <main class="home-page">
    <section class="hero-banner">
      <div class="hero-content">
        <div class="hero-title">
          Лучший способ
          <br />готовить дома
        </div>
        <div class="hero-subtitle">Доставка продуктов с рецептами</div>
        <nuxt-link to="/" class="btn btn-colored">Выбрать меню</nuxt-link>
        <nuxt-link to="/" class="btn btn-transparent">Узнать подробнее</nuxt-link>
      </div>
    </section>
    <section class="how-it-works">
      <div class="container">
        <h5 class="section-title">Как это работает?</h5>
        <div class="features">
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_1.svg" />
            </div>
            <div class="feature-title">Выбирайте блюда на ваш вкус</div>
            <div class="feature-text">Каждую неделю 36 новых рецептов от шеф-поваров и диетологов</div>
          </div>
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_2.svg" />
            </div>
            <div class="feature-title">Получайте коробку с продуктами</div>
            <div class="feature-text">В удобный вам день и интервал — доставка бесплатная</div>
          </div>
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_3.svg" />
            </div>
            <div class="feature-title">Готовьте за 20-40 минут</div>
            <div class="feature-text">Свежие ингридиенты лучшего качества и наглядные фоторецепты</div>
          </div>
          <div class="feature">
            <div class="feature-image">
              <img src="~/assets/img/how-it-works/how_4.svg" />
            </div>
            <div class="feature-title">Сохраняйте гибкость</div>
            <div
              class="feature-text"
            >Настройте график поставок, с учетом вашего графика, выходных и отпуска</div>
          </div>
        </div>
      </div>
    </section>
    <section class="menu-of-the-week">
      <div class="container">
        <div class="dates-slider">
          <el-carousel
            indicator-position="none"
            height="150px"
            arrow="always"
            :loop="false"
            :autoplay="false"
          >
            <el-carousel-item v-for="date in dates" :key="date.status">
              <div class="title">Меню на {{date.dates}}</div>

              <div
                v-if="date.status > 0"
                class="section-subtitle"
              >Доставка этого меню доступна только с {{date.deliveryDates}}</div>
              <div
                v-else
                class="section-subtitle sold-out"
              >Эти блюда уже распроданы. Пожалуйста, выберете меню на следующую неделю</div>
            </el-carousel-item>
            <!-- <el-carousel-item>
              <div class="title">Меню на 11 - 17 июня</div>
              <div
                class="section-subtitle"
              >Доставка возможна с 12 по 17 июня, выбирайте удобный вам день</div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="title">Меню на 18 - 24 июня</div>
              <div
                class="section-subtitle"
              >Доставка возможна с 18 по 24 июня, выбирайте удобный вам день</div>
            </el-carousel-item>-->
          </el-carousel>
        </div>
        <!-- <DinnersThumbsSlider /> -->
        <div class="btn-group">
          <nuxt-link to="/" class="btn btn-colored">Смотреть меню</nuxt-link>
          <nuxt-link to="/" class="btn btn-transparent btn-black">Сравнить меню</nuxt-link>
        </div>
      </div>
    </section>
    <section class="chefs">
      <div class="container">
        <div class="section-title">Наши шеф-повара</div>
        <div class="section-subtitle">придумывают для вас идеальные блюда</div>
        <ChefsThumbsSlider />
        <nuxt-link to="/true-chef" class="btn btn-colored btn-centred">подробнее</nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
import { db } from "@/plugins/firebase";
import ChefsThumbsSlider from "@/components/Sections/ChefsThumbsSlider";
import DinnersThumbsSlider from "@/components/Sections/DinnersThumbsSlider";
export default {
  head: {
    title: "Главная"
  },
  components: {
    ChefsThumbsSlider,
    DinnersThumbsSlider
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
  async asyncData() {
    let dates = [];
    const datesSnapshot = await db
      .collection("dates")
      .orderBy("status", "desc")
      .get();
    datesSnapshot.forEach(date => {
      dates.unshift(date.data());
    });
    return { dates };
  },
  computed: {
    chefs() {
      return this.$store.getters["chefs/getChefs"];
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.home-page {
  .hero-banner {
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
    margin: 4rem 0;
    text-align: center;
  }
  .chefs {
    padding-top: 5rem;
    padding-bottom: 6rem;
  }
}
</style>

