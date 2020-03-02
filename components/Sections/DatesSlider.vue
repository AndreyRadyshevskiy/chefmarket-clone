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
      <el-carousel-item class="dates-container" v-for="date in dates" :key="date.status">
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
    <div class="menu-sets">
      <span
        class="menu-set-name"
        v-for="(set,index) in menuSetNames"
        :key="index"
        :class="[(activeMenuSetName == set) ? 'active' : '']"
        @click="fetchMenuSetRecipes($event)"
      >{{set}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menuSetNames: ["Оригинальное", "Семейное", "20 минут", "Баланс"]
    };
  },
  computed: {
    ...mapGetters({
      dates: "menu/getDates",
      activeDateIndex: "menu/getActiveDateIndex",
      activeMenuSetName: "menu/getActiveMenuSetName"
    })
  },
  methods: {
    fetchDateRecipes(index) {
      this.$store.commit("menu/setActiveDateIndex", index);
      this.$store.dispatch("menu/fetchActiveMenuData");
    },
    fetchMenuSetRecipes(e) {
      let b = e.target.textContent;
      this.$store.commit("menu/setActiveMenuSetName", b);
      this.$store.dispatch("menu/fetchActiveMenuData");
    }
  }
};
</script>

<style lang="scss">
.dates-slider {
  .el-carousel {
    margin-bottom: 4rem;
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
  .menu-sets {
    text-align: center;
  }
  .menu-set-name {
    display: inline-block;
    font-size: 1.9rem;
    padding: 0 2.3rem 1.2rem;
    cursor: pointer;
  }
  .menu-set-name.active {
    border-bottom: 2px solid #59b958;
  }
}
</style>

