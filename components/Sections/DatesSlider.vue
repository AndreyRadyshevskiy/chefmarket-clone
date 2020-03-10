<template>
  <div class="dates-slider">
    <el-carousel
      indicator-position="none"
      height="150px"
      arrow="always"
      :loop="false"
      :autoplay="false"
      :initial-index="activeDateIndex"
      @change="fetchDateRecipes"
    >
      <el-carousel-item
        class="dates-container"
        v-for="date in dates"
        :key="date.status"
      >
        <div class="title">Меню на {{ date.dates }}</div>

        <div v-if="date.status > 0" class="section-subtitle">
          Доставка этого меню доступна только с {{ date.deliveryDates }}
        </div>
        <div v-else class="section-subtitle sold-out">
          Эти блюда уже распроданы. Пожалуйста, выберете меню на следующую
          неделю
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      dates: "menu/getDates",
      activeDateIndex: "menu/getActiveDateIndex"
    })
  },
  methods: {
    fetchDateRecipes(index) {
      this.$store.commit("menu/setActiveDateIndex", index);
      this.$store.dispatch("menu/fetchActiveMenuData");
    }
  }
};
</script>

<style lang="scss">
.dates-slider {
  .el-carousel {
    margin-bottom: 2rem;
  }
  .sold-out {
    font-size: 14px;
    color: #7f7f7f;
  }
  .dates-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
