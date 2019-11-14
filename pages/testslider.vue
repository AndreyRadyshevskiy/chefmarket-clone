<template>
  <div class="dinners-menu">
    <el-carousel
      indicator-position="none"
      height="150px"
      arrow="always"
      :loop="false"
      :autoplay="false"
      class="weeks-slider"
      @change="switchDinners"
    >
      <el-carousel-item>
        <div class="title">Меню на 4 - 10 июня</div>
        <div
          class="section-subtitle"
        >Эти блюда уже распроданы. Пожалуйста, выберете меню на следующую неделю</div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="title">Меню на 11 - 17 июня</div>
        <div class="section-subtitle">Доставка возможна с 12 по 17 июня, выбирайте удобный вам день</div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="title">Меню на 18 - 24 июня</div>
        <div class="section-subtitle">Доставка возможна с 18 по 24 июня, выбирайте удобный вам день</div>
      </el-carousel-item>
    </el-carousel>

    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="menu-tabs">
      <el-tab-pane label="Оригинальное" name="first">Оригинальное</el-tab-pane>
      <el-tab-pane label="Семейное" name="second">Семейное</el-tab-pane>
      <el-tab-pane label="20 минут" name="third">20 минут</el-tab-pane>
      <el-tab-pane label="Баланс" name="fourth">Баланс</el-tab-pane>
      <el-tab-pane label="Еще блюда" name="fifth">Еще блюда</el-tab-pane>
    </el-tabs>

    <el-carousel
      type="card"
      height="620px"
      indicator-position="none"
      arrow="always"
      :loop="false"
      :autoplay="false"
      class="dinners-slider"
      ref="mainCarousel"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      slider: {
        index: 0,
        sliderData: {}
      }
    };
  },
  methods: {
    switchDinners(index) {
      console.log(index);
      this.activeIndex = index;
      console.log(this.$refs.mainCarousel.setActiveItem(this.activeIndex));
      // console.log(this.$refs.datesSlider.activeIndex);
    }
  }
};
</script>

<style lang="scss">
.dinners-menu {
  .menu-tabs {
    width: 70rem;
    margin: 0 auto;
  }
  .el-tabs__item {
    font-size: 1.6rem;
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

  .dinners-slider {
    background-color: #f9f9f9;
    padding-top: 4rem;
    padding-bottom: 8rem;
    .btn {
      margin-right: 1rem;
    }
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
}
</style>

