<template>
  <div class="dinners-menu">
    <el-carousel
      type="card"
      height="620px"
      indicator-position="none"
      arrow="always"
      :loop="false"
      :autoplay="false"
      class="dinners-slider"
    >
      <el-carousel-item v-for="(recipe, index) in activeMenuData" :key="index">
        <div class="slider-image" :style="{backgroundImage: 'url(' + recipe.thumbnail + ')'}">
          <div class="slider-tags">
            <span class="slider-tag" v-for="(tag, index) in recipe.tags" :key="index">{{tag}}</span>
          </div>
        </div>
        <div class="slider-footer">
          <div class="expires">
            <span class="cook">Готовить</span>
            <span class="day">{{recipe.expires.slice(0,-5)}}</span>
            <span class="day">день</span>
          </div>
          <div class="slider-data">
            <h6 class="slider-title">{{recipe.title}}</h6>
            <div class="slider-stats">
              <img src="~/assets/img/dinners/svg/pot.svg" />
              <span class="weight">{{recipe.weight}}г</span>
              <img src="~/assets/img/dinners/svg/time-half.svg" />
              <span class="time">{{recipe.cookTime}} минут</span>
              <img src="~/assets/img/dinners/svg/cook2.svg" />
              <span class="difficulty">{{recipe.difficulty}}</span>
              <span class="kkal">{{recipe.stats}}</span>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ["activeMenuData"]
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
      background-repeat: no-repeat;
      background-position: center;
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
      margin-right: 0.5rem;
      border-radius: 5px;
      color: #fff;
      font-size: 1.2rem;
    }
    .slider-footer {
      display: flex;
      height: 13rem;
      background-color: #fff;
    }
    .expires {
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
  .el-carousel__item--card.is-in-stage {
    cursor: auto;
  }
}
</style>

