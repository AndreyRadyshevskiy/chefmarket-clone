<template>
  <div class="recipe">
    <div class="recipe-header">
      <div
        class="recipe-thumbnail"
        :style="{backgroundImage: 'url(' + activeRecipe.thumbnail + ')'}"
      >
        <div class="recipe-tags">
          <span class="recipe-tag" v-for="(tag, index) in activeRecipe.tags">{{tag}}</span>
        </div>
      </div>
      <div class="recipe-content">
        <div class="recipe-title">{{activeRecipe.title}}</div>
        <div class="recipe-stats">
          <span class="recipe-expires">{{activeRecipe.expires}}</span>
          <span class="recipe-weight">
            <img class="recipe-stats-icon" src="~/assets/img/dinners/svg/pot.svg" />
            {{activeRecipe.weight}}г
          </span>
          <span class="recipe-time">
            <img class="recipe-stats-icon" src="~/assets/img/dinners/svg/time-half.svg" />
            {{activeRecipe.cookTime}} мин
          </span>
          <span class="recipe-difficulty">
            <img class="recipe-stats-icon" src="~/assets/img/dinners/svg/cook2.svg" />
            {{activeRecipe.difficulty}}
          </span>
          <span class="recipe-info">{{activeRecipe.stats}}</span>
        </div>
        <div class="recipe-chef">
          <div
            class="recipe-chef-thumb"
            :style="{backgroundImage: 'url(' + activeRecipe.chef.avatar + ')'}"
          ></div>
          <div class="recipe-chef-advice">{{activeRecipe.advice}}</div>
          <div class="recipe-chef-name">{{activeRecipe.chef.name}}, шеф повар</div>
        </div>
      </div>
    </div>
    <div class="recipe-main">
      <el-tabs>
        <el-tab-pane label="Мы привезем">
          <div class="recipe-tab-content">
            <div class="recipe-ingredients">
              <div
                v-for="(ingredient, index) in activeRecipe.ingredients"
                class="recipe-ingredient"
              >
                <img :src="ingredient.thumbnail" class="recipe-ingredient-thumb" />
                <span class="recipe-ingredient-link">{{ingredient.name}}</span>
                <span class="recipe-ingredient-weight">15 гр</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Рецепт">
          <div class="recipe-tab-content">
            <div class="recipe-step" v-for="(step, index) in activeRecipe.steps">
              <img :src="step.thumbnail" alt class="recipe-step-thumb" />
              <div class="recipe-step-info">
                <span class="recipe-step-num">Шаг {{index+1}}</span>
                <span
                  class="recipe-step-description"
                >Положите лапшу в кипящую подсоленную воду и варите в течение 7 минут, откиньте лапшу на дуршлаг, дайте стечь воде, сбрызните подсолнечным маслом и перемешайте.</span>
                <span class="recipe-step-time">7 мин</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Должно быть дома">
          <div class="recipe-tab-content">
            <div class="recipe-ingredients">
              <div v-for="(inv, index) in activeRecipe.inventory" class="recipe-ingredient">
                <img :src="inv.thumbnail" class="recipe-ingredient-thumb" />
                <span class="recipe-ingredient-link">{{inv.name}}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activeRecipe"]
};
</script>

<style lang="scss">
.recipe {
  .recipe-header {
    display: flex;
    width: 126rem;
    margin: 6rem auto;
  }
  .recipe-thumbnail {
    position: relative;
    width: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: 58.2rem;
  }
  .recipe-tags {
    position: absolute;
    left: 3rem;
    bottom: 2.2rem;
  }
  &-tag {
    background-color: rgba(136, 136, 136, 0.8);
    border-radius: 4px;
    color: #fff;
    margin-right: 0.5rem;
    padding: 0.5rem;
    font-size: 1.4rem;
  }
  .recipe-content {
    width: 50%;
    padding: 5rem;
  }
  .recipe-title {
    font-family: "RegalBlack", sans-serif;
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  .recipe-stats span {
    margin-right: 2.4rem;
    font-size: 1.2rem;
  }
  .recipe-expires {
    color: #7f7f7f;
  }
  .recipe-difficulty {
    font-weight: bold;
  }
  .recipe-info {
    color: #7f7f7f;
    margin: 2.4rem 0;
    display: block;
  }
  .recipe-stats-icon {
    margin-bottom: -2px;
    margin-right: 0.5rem;
  }
  .recipe-chef::after {
    display: table;
    content: "";
    clear: both;
  }
  .recipe-chef-thumb {
    float: left;
    width: 14rem;
    height: 14rem;
    margin-right: 4.8rem;
    border-radius: 50%;
    background: url("~assets/img/chefs/chef4.jpg") no-repeat center;
    background-size: cover;
  }
  .recipe-chef-advice {
    font-size: 1.2rem;
    padding: 3.4rem;
  }
  .recipe-chef-name {
    font-size: 1.2rem;
  }
  .recipe-main {
    padding-top: 6rem;
  }
  .recipe-tab-content {
    background-color: #f9f9f9;
    padding-top: 5rem;
  }
  .recipe-ingredients {
    width: 80rem;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .recipe-ingredient {
    text-align: center;
    span {
      display: block;
    }
    margin-bottom: 2rem;
  }
  .recipe-ingredient-thumb {
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    width: 14rem;
    height: 14rem;
  }
  .recipe-ingredient-link {
    line-height: 2.4rem;
    font-size: 1.4rem;
    text-decoration: underline;
    text-decoration-style: dashed;
    text-underline-position: under;
    cursor: pointer;
  }
  .recipe-step {
    width: 80rem;
    margin: 0 auto;
    display: flex;
  }
  .recipe-step-thumb {
    width: 37.6rem;
    height: 25rem;
    margin-bottom: 4rem;
  }
  .recipe-step-info {
    padding-left: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .recipe-step-num {
    font-family: Regal, sans-serif;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .recipe-step-description {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  .recipe-step-time {
    color: #7f7f7f;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs__nav {
    float: none;
    width: 34rem;
    margin: 0 auto;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__item:hover {
    color: #59b958;
  }
  .el-tabs__item.is-active {
    color: #59b958;
  }
  .el-tabs__active-bar {
    background-color: #59b958;
  }
}
</style>
