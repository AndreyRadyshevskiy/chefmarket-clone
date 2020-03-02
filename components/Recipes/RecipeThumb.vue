<template>
  <div class="recipe-thumb">
    <el-card>
      <div
        class="recipe-image"
        :style="{backgroundImage: 'url(' + recipe.thumbnail + ')'}"
        @click="goToRecipe(recipe.title)"
      >
        <div class="recipe-tags">
          <span class="recipe-tag" v-for="(tag,index) in recipe.tags" :key="index">{{tag}}</span>
        </div>
      </div>
      <div class="recipe-footer">
        <h6 class="recipe-title">{{recipe.title}}</h6>
        <div class="recipe-expires">
          Готовить
          <b>{{recipe.expires}}</b>
        </div>
        <div class="recipe-stats">
          <img src="~/assets/img/dinners/svg/pot.svg" />
          <span class="weight">{{ recipe.weight }}г</span>
          <img src="~/assets/img/dinners/svg/time-half.svg" />
          <span class="time">{{ recipe.cookTime }} мин</span>
          <img src="~/assets/img/dinners/svg/cook2.svg" />
          <span class="difficulty">{{ recipe.difficulty}}</span>
        </div>
      </div>
    </el-card>
    <div class="btn-group" v-if="['create-menu'].includes($route.name)">
      <el-button type="primary" size="small" icon="el-icon-edit">Редактировать</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="removeRec(recipe)">Удалить</el-button>
    </div>
  </div>
</template>

<script>
import slugify from "slugify";
import { mapGetters } from "vuex";
export default {
  props: ["recipe"],
  computed: {
    ...mapGetters({
      activeMenuSetName: "menu/getActiveMenuSetName"
    })
  },
  methods: {
    removeRec(recipe) {
      this.$emit("removeRecipe", recipe);
    },
    goToRecipe(recipe) {
      const recSlug = slugify(recipe, { lower: true });
      const menuSetNameSlug = slugify(this.activeMenuSetName, { lower: true });
      this.$router.push(`/dinners-${menuSetNameSlug}/${recSlug}`);
    }
  }
};
</script>

<style lang="scss">
.recipe-thumb {
  .el-card {
    height: 100%;
  }
  .el-card__body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .recipe-image {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 200px;
    position: relative;
  }
  .recipe-tags {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }
  .recipe-tag {
    background-color: rgba(122, 124, 130, 0.8);
    padding: 0.5rem;
    border-radius: 5px;
    color: #fff;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
  .recipe-footer {
    display: flex;
    flex-direction: column;
    padding: 2.4rem;
    flex-grow: 1;
  }

  .recipe-title {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.4rem;
    padding-top: 1rem;
    padding-bottom: 2.4rem;
    margin-bottom: auto;
  }
  .recipe-expires {
    font-size: 1.2rem;
    padding-bottom: 2.4rem;
    margin-top: 1rem;
  }
  .recipe-stats {
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
  .btn-group {
    padding: 2rem 0;
    text-align: center;
  }
}
</style>

