<template>
  <div class="recipes-list-page">
    <div class="admin-page-title">Рецепты</div>
    <el-table
      :data="recipes.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column width="800" label="Название" prop="title"></el-table-column>
      <el-table-column label="Автор" prop="chef.name"></el-table-column>
      <el-table-column label="Сложность" prop="difficulty"></el-table-column>
      <el-table-column label="Время приготовления" prop="cookTime" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Искать рецепт" />
        </template>
        <template slot-scope="scope">
          <el-tooltip content="Смотреть рецепт" placement="top" effect="light">
            <el-button circle icon="el-icon-view" @click="handleView(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="Редактировать рецепт" placement="top" effect="light">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="Удалить рецепт" placement="top" effect="light">
            <el-button
              circle
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="recipeVisible" width="80%">
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
          <el-tabs v-model="activeRecipeTab">
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
    </el-dialog>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  layout: "admin",
  data() {
    return {
      search: "",
      activeRecipeTab: "",
      activeRecipe: {
        chef: ""
      },
      recipeVisible: false,
      hi: {
        priv: 123,
        zdarov: 456
      }
    };
  },
  async asyncData() {
    let recipes = [];
    const recipesSnapshot = await db.collection("recipes").get();
    recipesSnapshot.forEach(recipe => {
      recipes.unshift(recipe.data());
    });

    return { recipes };
  },
  methods: {
    handleView(index, row) {
      this.recipeVisible = true;
      this.activeRecipe = row;
      console.log(index, row);
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "admin-create-recipe",
        params: { recipe: row }
      });
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm(
        `Вы действительно хотите безвозвратно удалить рецепт "${row.title}" ?`,
        "Удаление рецепта!",
        {
          confirmButtonText: "Удалить рецепт",
          cancelButtonText: "Отмена",
          type: "error"
        }
      )
        .then(async () => {
          try {
            await this.$store.dispatch("recipes/deleteRecipe", row.title);
          } catch (err) {
            console.log(err);
          }
          this.recipes.splice(index, 1);
          this.$message({
            type: "success",
            message: "Рецепт удален"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Удаление рецепта отменено"
          });
        });
      // this.recipes.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.recipes-list-page {
  .el-dialog__body {
    word-break: normal;
  }
  .recipe {
    &-header {
      display: flex;
      width: 126rem;
      margin: 6rem auto;
    }
    &-thumbnail {
      position: relative;
      width: 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      height: 58.2rem;
    }
    &-tags {
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
    &-content {
      width: 50%;
      padding: 5rem;
    }
    &-title {
      font-family: "RegalBlack", sans-serif;
      font-size: 4rem;
      margin-bottom: 2rem;
    }
    &-stats span {
      margin-right: 2.4rem;
      font-size: 1.2rem;
    }
    &-expires {
      color: #7f7f7f;
    }
    &-difficulty {
      font-weight: bold;
    }
    &-info {
      color: #7f7f7f;
      margin: 2.4rem 0;
      display: block;
    }
    &-stats-icon {
      margin-bottom: -2px;
      margin-right: 0.5rem;
    }
    &-chef::after {
      display: table;
      content: "";
      clear: both;
    }
    &-chef-thumb {
      float: left;
      width: 14rem;
      height: 14rem;
      margin-right: 4.8rem;
      border-radius: 50%;
      background: url("~assets/img/chefs/chef4.jpg") no-repeat center;
      background-size: cover;
    }
    &-chef-advice {
      font-size: 1.2rem;
      padding: 3.4rem;
    }
    &-chef-name {
      font-size: 1.2rem;
    }
    &-main {
      padding-top: 6rem;
    }
    &-tab-content {
      background-color: #f9f9f9;
      padding-top: 5rem;
    }
    &-ingredients {
      width: 80rem;
      margin: 0 auto;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    &-ingredient {
      text-align: center;
      span {
        display: block;
      }
      margin-bottom: 2rem;
    }
    &-ingredient-thumb {
      display: block;
      margin: 0 auto;
      border-radius: 50%;
      width: 14rem;
      height: 14rem;
    }
    &-ingredient-link {
      line-height: 2.4rem;
      font-size: 1.4rem;
      text-decoration: underline;
      text-decoration-style: dashed;
      text-underline-position: under;
      cursor: pointer;
    }
    &-step {
      width: 80rem;
      margin: 0 auto;
      display: flex;
    }
    &-step-thumb {
      width: 37.6rem;
      height: 25rem;
      margin-bottom: 4rem;
    }
    &-step-info {
      padding-left: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-step-num {
      font-family: Regal, sans-serif;
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    &-step-description {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
    &-step-time {
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
}
</style>

