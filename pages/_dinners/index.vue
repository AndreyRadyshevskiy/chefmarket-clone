<template>
  <div class="menu-page">
    <div class="container">
      <div class="dinners-menu">
        <DatesSlider />
      </div>
    </div>
    <div :style="{backgroundColor: '#f9f9f9' }">
      <div class="recipes-grid">
        <RecipeThumb v-for="(recipe, index) in activeMenuData" :key="index" :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import { mapGetters } from "vuex";
import DatesSlider from "@/components/Sections/DatesSlider";
import RecipeThumb from "@/components/Recipes/RecipeThumb";
export default {
  validate({ params }) {
    return Boolean(params.dinners);
  },
  components: { RecipeThumb, DatesSlider },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dates: "menu/getDates",
      activeMenuData: "menu/getActiveMenuData",
      activeDateIndex: "menu/getActiveDateIndex",
      activeMenuSetName: "menu/getActiveMenuSetName"
    })
  }
};
</script>

<style lang="scss">
.menu-page {
  padding-top: 4rem;
  .recipes-grid {
    width: 126rem;
    margin: 0 auto;
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem 6rem;
    padding: 2rem 0;
  }
}
</style>

