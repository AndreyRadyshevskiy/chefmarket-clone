<template>
  <div class="container">
    <div class="dinners-menu">
      <div class="dates-slider">
        <el-carousel
          indicator-position="none"
          height="150px"
          arrow="always"
          :loop="false"
          :autoplay="false"
          @change="switchDates"
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
        </el-carousel>
      </div>

      <!-- <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="menu-tabs">
        <el-tab-pane label="Оригинальное" name="first">Оригинальное</el-tab-pane>
        <el-tab-pane label="Семейное" name="second">Семейное</el-tab-pane>
        <el-tab-pane label="20 минут" name="third">20 минут</el-tab-pane>
        <el-tab-pane label="Баланс" name="fourth">Баланс</el-tab-pane>
      </el-tabs>-->
      <div class="menu-sets" @click="setActiveMenuSet($event)">
        <span class="menu-set">Что выбрать?</span>
        <span class="menu-set">Оригинальное</span>
        <span class="menu-set">Семейное</span>
        <span class="menu-set">20 минут</span>
        <span class="menu-set">Баланс</span>
      </div>

      <div class="recipes-grid">
        <!-- <RecipeThumb
          v-for="(recipe, index) in menuActiveSet.recipes"
          :key="index"
          :recipe="recipe"
        />-->
      </div>
      <!-- <el-carousel
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
      </el-carousel>-->
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import RecipeThumb from "@/components/Recipes/RecipeThumb";
export default {
  components: { RecipeThumb },
  data() {
    return {
      // activeIndex: 1,
      // slider: {
      //   index: 0,
      //   sliderData: {}
      // },
      activeMenuSet: "Оригинальное"
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
  methods: {
    setActiveMenuSet(e) {
      this.activeMenuSet = e.target.textContent;
    },
    switchDates(i1, i2) {
      console.log(i1, i2);
    }
    // switchDinners(index) {
    //   console.log(index);
    //   this.activeIndex = index;
    //   console.log(this.$refs.mainCarousel.setActiveItem(this.activeIndex));
    // console.log(this.$refs.datesSlider.activeIndex);
    // }
  }
};
</script>

<style lang="scss">
.dates-slider {
  .sold-out {
    font-size: 14px;
    color: #7f7f7f;
  }
}
</style>

