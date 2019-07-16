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
    <section class="dinners">
      <div class="container">
        <div class="dates-slider">
          <el-carousel
            indicator-position="none"
            height="150px"
            arrow="always"
            :loop="false"
            :autoplay="false"
          >
            <el-carousel-item>
              <div class="title">Меню на 4 - 10 июня</div>
              <div
                class="section-subtitle"
              >Эти блюда уже распроданы. Пожалуйста, выберете меню на следующую неделю</div>
            </el-carousel-item>
            <el-carousel-item>
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
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="Оригинальное" name="first">Оригинальное</el-tab-pane>
        <el-tab-pane label="Семейное" name="second">Семейное</el-tab-pane>
        <el-tab-pane label="20 минут" name="third">20 минут</el-tab-pane>
        <el-tab-pane label="Баланс" name="fourth">Баланс</el-tab-pane>
        <el-tab-pane label="Еще блюда" name="fifth">Еще блюда</el-tab-pane>
      </el-tabs>
      <!-- <div class="dinners-menu-tabs">
        <a href="#" class="tabs-link">Оригинальное</a>
        <a href="#" class="tabs-link">Семейное</a>
        <a href="#" class="tabs-link">20 минут</a>
        <a href="#" class="tabs-link">Баланс</a>
        <a href="#" class="tabs-link">Eще блюда</a>
      </div>-->
      <div class="dinners-slider">
        <div class="container">
          <el-carousel
            type="card"
            height="620px"
            indicator-position="none"
            arrow="always"
            :loop="false"
            :autoplay="false"
          >
            <el-carousel-item v-for="slide in 3" :key="slide">
              <div class="slider-image">
                <div class="slider-tags">
                  <span class="slider-tag">#До 20 минут</span>
                  <span class="slider-tag">#Без духовки</span>
                  <span class="slider-tag">#Азия</span>
                </div>
              </div>
              <div class="slider-footer">
                <div class="dish-day">
                  <span class="cook">Готовить</span>
                  <span class="day">1 - 5</span>
                  <span class="day">день</span>
                </div>
                <div class="slider-data">
                  <h6
                    class="slider-title"
                  >Мидии в устричном соусе со шпинатной лапшой и стружкой тунца «Бонито»</h6>
                  <div class="slider-stats">
                    <img src="~/assets/img/dinners/svg/pot.svg" />
                    <span class="weight">450г</span>
                    <img src="~/assets/img/dinners/svg/time-half.svg" />
                    <span class="time">20 минут</span>
                    <img src="~/assets/img/dinners/svg/cook2.svg" />
                    <span class="difficulty">Готовить легко</span>
                    <span class="kkal">На 100г блюда: 109 кКалб 6.0 | 5.0 | 10.0 БЖУ</span>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="btn-group">
            <nuxt-link to="/" class="btn btn-colored">Смотреть меню</nuxt-link>
            <nuxt-link to="/" class="btn btn-transparent btn-black">Сравнить меню</nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="cooks">
      <h5 class="section-title">Наши шеф-повара</h5>
      <div class="section-subtitle">придумывают для вас идеальные блюда</div>
      <div class="container">
        <div class="slider-container">
          <div class="button-wrapper">
            <el-button @click="slidePrev" icon="el-icon-back" circle></el-button>
          </div>
          <hooper :itemsToShow="3" :centerMode="true" :infiniteScroll="true" ref="cookCarousel">
            <slide>
              <nuxt-link to="chef" class="slide-inner">
                <img class="slide-image" src="~/assets/img/cooks/cook1.jpg" />
                <div class="slide-name">Пьер Дюкан</div>
              </nuxt-link>
            </slide>
            <slide>
              <div class="slide-inner">
                <img class="slide-image" src="~/assets/img/cooks/cook2.jpg" />
                <div class="slide-name">Лодыгина Юлия</div>
              </div>
            </slide>
            <slide>
              <div class="slide-inner">
                <img class="slide-image" src="~/assets/img/cooks/cook3.jpg" />
                <div class="slide-name">Василий Емельяненко</div>
              </div>
            </slide>
            <slide>
              <div class="slide-inner">
                <img class="slide-image" src="~/assets/img/cooks/cook1.jpg" />
                <div class="slide-name">Пьер Дюкан</div>
              </div>
            </slide>
            <slide>
              <div class="slide-inner">
                <img class="slide-image" src="~/assets/img/cooks/cook2.jpg" />
                <div class="slide-name">Лодыгина Юлия</div>
              </div>
            </slide>
            <slide>
              <div class="slide-inner">
                <img class="slide-image" src="~/assets/img/cooks/cook3.jpg" />
                <div class="slide-name">Василий Емельяненко</div>
              </div>
            </slide>
          </hooper>
          <div class="button-wrapper">
            <el-button @click="slideNext" icon="el-icon-right" circle></el-button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  head: {
    title: "Главная"
  },
  components: {
    Hooper,
    Slide
  },
  methods: {
    slidePrev() {
      this.$refs.cookCarousel.slidePrev();
    },
    slideNext() {
      this.$refs.cookCarousel.slideNext();
    }
  }
};
</script>

<style lang="scss">
.hooper {
  height: auto;
  width: 1026px;
  margin: 0 auto;
}
.slider-container {
  display: flex;
  padding-top: 3rem;
}
.slide-inner {
  text-align: center;
}
.slide-name {
  font-family: RegalBlack, sans-serif;
  font-size: 2rem;
  padding-top: 2rem;
}
.button-wrapper {
  display: flex;
  align-items: center;
}
.home-page {
  .hero-banner {
    background: url("~assets/img/hero-banner.jpg") no-repeat center center;
    background-size: cover;
    height: calc(100vh - 190px);
    width: 100%;
    display: flex;
    align-items: center;
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
  .btn {
    margin-right: 1rem;
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
  .dates-slider {
    .el-carousel__container {
      width: 100%;
    }
    .el-carousel__item {
    }
  }
  .el-tabs {
    width: 70rem;
    margin: 0 auto;
  }
  .el-tabs__item.is-active {
    color: #59b958;
  }
  .el-tabs__nav-wrap::after {
    background-color: #fff;
  }
  .el-tabs__active-bar {
    background-color: #59b958;
  }
  .el-tabs__item:hover {
    color: #59b958;
  }
  .dinners-menu-tabs {
    padding-top: 4rem;
    text-align: center;

    .tabs-link {
      display: inline-block;
      color: #333;
      padding-bottom: 2rem;
      margin-right: 2rem;

      &:hover {
        color: #59b958;
      }
    }
  }
  .dinners-slider {
    background-color: #f9f9f9;
    padding-top: 4rem;
    padding-bottom: 8rem;

    .el-carousel {
      margin-bottom: 2rem;
    }

    .el-carousel__arrow {
      background-color: rgba(35, 45, 56, 0.5);
    }
    .el-carousel__item--card {
      filter: brightness(60%);
      box-shadow: 0 4px 10px 0 hsla(0, 0%, 83%, 0.5);
    }
    .el-carousel__item--card.is-active {
      width: 71%;
      transform: translateX(20.5%) !important;
      filter: brightness(100%);
      margin-bottom: 1rem;
      height: 610px;

      .kkal {
        display: block;
      }

      .slider-title {
        font-size: 2rem;
      }
    }
    .slider-image {
      background: url("~assets/img/dinners/dish1.jpeg") no-repeat center center;
      background-size: cover;
      width: 100%;
      height: 490px;
      position: relative;
    }
    .slider-tags {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
    }
    .slider-tag {
      background-color: rgba(122, 124, 130, 0.8);
      padding: 0.5rem;
      border-radius: 5px;
      color: #fff;
      font-size: 1.2rem;
    }
    .slider-footer {
      display: flex;
      height: 13rem;
      background-color: #fff;
    }
    .dish-day {
      flex: 0 0 130px;
      background: url("~assets/img/dinners/svg/calendar_large.svg") no-repeat
        top 1.6rem center;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .cook {
        font-size: 0.9rem;
        opacity: 0.5;
        line-height: 1.4;
      }
      .day {
        font-family: RegalBlack, sans-serif;
        font-size: 2rem;
        line-height: 0.8;
      }
    }
    .slider-data {
      padding-top: 2rem;
      padding-bottom: 3.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .slider-title {
      font-size: 1.8rem;
      font-weight: 400;
      padding-right: 8rem;
    }
    .slider-stats {
      font-size: 1.2rem;
      display: flex;
      align-items: flex-end;

      img {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.6rem;
      }
    }

    .weight,
    .time,
    .difficulty {
      margin-right: 2rem;
    }
    .difficulty {
      font-weight: 900;
    }
    .kkal {
      font-size: 1rem;
      color: #7f7f7f;
      display: none;
    }
  }
  .dish-item {
    width: 83rem;
    height: 60rem;
    display: flex;
    flex-direction: column;
  }
  .dish-image {
    background: url("~assets/img/dinners/dish1.jpeg") no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 46rem;
  }
  .btn-group {
    text-align: center;
  }
  .cooks {
    padding-top: 5rem;
    padding-bottom: 6rem;

    .cook-name {
      font-family: RegalBlack, sans-serif;
      font-size: 2rem;
      text-align: center;
      padding-top: 1.6rem;
    }
    .cook-image {
      width: 29.2rem;
      height: 26rem;
    }
  }
}
</style>

