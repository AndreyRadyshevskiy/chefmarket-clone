<template>
  <div class="menu-tabs">
    <nuxt-link
      to="/comparison"
      class="choose-link"
      v-if="$route.name == 'dinners'"
      >Что выбрать?</nuxt-link
    >
    <span
      v-for="(set, index) in menuSetNames"
      :key="index"
      :class="[activeMenuSetName == set ? 'active' : '', 'menu-tab-name']"
      @click="fetchMenuSetRecipes"
      >{{ set }}</span
    >
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
      activeMenuSetName: "menu/getActiveMenuSetName"
    })
  },
  methods: {
    fetchMenuSetRecipes(e) {
      const b = e.target.textContent;
      this.$store.commit("menu/setActiveMenuSetName", b);
      this.$store.dispatch("menu/fetchActiveMenuData");
      console.log(this.$route);
    }
  }
};
</script>

<style lang="scss">
.menu-tabs {
  position: sticky;
  top: -1px;
  text-align: center;
  z-index: 1;
  background-color: #fff;

  .menu-tab-name,
  .choose-link {
    display: inline-block;
    font-size: 1.9rem;
    padding: 1.2rem 2.3rem;
    cursor: pointer;
  }
  .choose-link {
    color: #59b958;
  }
  .menu-tab-name.active {
    border-bottom: 2px solid #59b958;
  }
}
</style>
