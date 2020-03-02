<template>
  <div class="recipe-page">
    <div class="back-to-menu">
      <div class="container-lg">
        <nuxt-link class="link" to="/dinners">< НАЗАД В МЕНЮ</nuxt-link>
      </div>
    </div>
    <Recipe :activeRecipe="recipe" />
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import Recipe from "@/components/Recipes/Recipe";
export default {
  validate({ params }) {
    return Boolean(params.recipe);
  },
  components: {
    Recipe
  },
  async asyncData({ params }) {
    let recipe = [];
    const recipesSnapshot = await db
      .collection("recipes")
      .where("slug", "==", params.recipe)
      .get();

    recipesSnapshot.forEach(rec => {
      recipe.unshift(rec.data());
    });
    recipe = recipe[0];
    return { recipe };
  }
};
</script>

<style lang="scss">
.recipe-page {
  .back-to-menu {
    background-color: #f9f9f9;
    padding: 1rem;
  }
  .link {
    font-size: 1.2rem;
    text-decoration: none;
  }
}
</style>
