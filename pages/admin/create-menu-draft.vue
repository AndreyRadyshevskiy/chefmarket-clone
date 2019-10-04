<template>
  <div class="create-menu-page-draft">
    <div class="admin-page-title">Составить меню</div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">Меню на 18 - 24 июля (прошлая неделя)</span>
        <div class="menu-tabs-wrapper">
          <el-input
            v-model="newMenuTab"
            placeholder="Введите название меню"
            class="menu-tabs-add"
            size="small"
          >
            <el-button slot="append" @click="addTab(menuActiveTab)" icon="el-icon-plus"></el-button>
          </el-input>
          <el-tabs v-model="menuActiveTab" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(tab, index) in menuTabs"
              :key="index"
              :label="tab.title"
              :name="tab.name"
            >
              <div class="recipes">
                <div class="recipes-add-section">
                  <span class="text">Выбрать рецепт:</span>
                  <el-select
                    v-model="recipeSelect"
                    filterable
                    placeholder="Выберете ингридиент"
                    ref="recipeSelect"
                  >
                    <el-option
                      v-for="(recipe, index) in recipes"
                      :key="index"
                      :label="recipe.title"
                      :value="recipe.title"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    @click="addRecipe(tab.title)"
                    :style="{marginLeft: '1rem'}"
                  ></el-button>

                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    class="m-left-auto"
                  >Удалить меню</el-button>
                  <el-button type="success" size="small" icon="el-icon-success">Сохранить меню</el-button>
                </div>
                <div class="recipes-grid">
                  {{week.menu}}
                  <RecipeThumb
                    v-for="(recipe, index) in week.menu[tab.title]"
                    :key="index"
                    :recipe="recipe"
                    @removeRecipe="removeRecipe"
                  />
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Оригинальное">
              <div class="recipes">
                <div class="recipes-add-section">
                  <span class="text">Выбрать рецепт:</span>
                  <el-select
                    v-model="recipeSelect"
                    filterable
                    placeholder="Выберете ингридиент"
                    ref="recipeSelect"
                  >
                    <el-option
                      v-for="(recipe, index) in recipes"
                      :key="index"
                      :label="recipe.title"
                      :value="recipe.title"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    @click="addRecipe"
                    :style="{marginLeft: '1rem'}"
                  ></el-button>-->
                  <el-button
                    class="recipe-button"
                    v-for="(ingr, index) in this.recipesList"
                    :key="index"
                    size="small"
                    plain
                    type="info"
                    @click="removerecipe"
                  >
                    {{ingr}}
                    <i class="el-icon-close"></i>
                  </el-button>

                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    class="m-left-auto"
                  >Удалить меню</el-button>
                  <el-button type="success" size="small" icon="el-icon-success">Сохранить меню</el-button>
                </div>
                <div class="recipes-grid">
                  <RecipeThumb
                    v-for="(recipe, index) in selectedRecipes"
                    :key="index"
                    :recipe="recipe"
                    @removeRecipe="removeRecipe"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Config">
        <span slot="label">Меню на 25 - 31 июля (текущая неделя)</span>
        Текущая неделя
      </el-tab-pane>
      <el-tab-pane label="Role">
        <span slot="label">Меню на 1 - 7 августа (следующая неделя)</span>
        Следующая неделя
      </el-tab-pane>
      <el-tab-pane label="Role">
        <span slot="label">Создать меню на неделю</span>
        Создать меню на неделю
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import RecipeThumb from "@/components/Recipes/RecipeThumb";
export default {
  layout: "admin",
  components: {
    RecipeThumb
  },
  data() {
    return {
      newMenuTab: "",
      week: {
        status: "currentWeek",
        menu: [
          {
            original: [
              {
                recipes: []
              }
            ]
          }
        ]
      },

      menuActiveTab: "original",
      menuTabs: ["Оригинальное", "Семейное", "20 Минут"],
      tabIndex: 2,

      recipeSelect: "",

      lastWeek: [],
      currentWeek: [],
      nextWeek: [],
      selectedRecipes: []
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
    addTab(targetName) {
      let newTabName = this.newMenuTab;
      this.menuTabs.push({
        title: newTabName,
        name: newTabName,
        content: "New Tab content"
      });
      this.menuActiveTab = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.menuTabs;
      let activeName = this.menuActiveTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.menuActiveTab = activeName;
      this.menuTabs = tabs.filter(tab => tab.name !== targetName);
    },
    addRecipe(menuTab) {
      if (this.recipeSelect) {
        const recipe = this.recipes.find(r => {
          return this.recipeSelect == r.title;
        });
        this.week.menu[menuTab] = [];
        this.week.menu[menuTab].push(recipe);
        console.log(this.week.menu);
        // this.week.menu[menuTab] = recipe;
        // console.log(this.week);
        // const menuObj = {};
        // menuObj[menuTab] = recipe;
        // this.week.menu.push(menuObj);

        //   this.selectedRecipes.push(recipe);
        //   this.recipeSelect = "";
        // } else {
        //   this.$message.warning("Выберете рецепт из списка");
      }
    },
    removeRecipe(recipe) {
      const filtered = this.selectedRecipes.filter(rec => {
        return rec.title !== recipe.title;
      });
      this.selectedRecipes = filtered;
    }
  }
};
</script>

<style lang="scss">
.create-menu-page {
  .menu-tabs-wrapper {
    position: relative;
  }
  .menu-tabs-add {
    position: absolute;
    right: 0;
    z-index: 1;
    width: 30rem;
  }
  .recipes {
    width: 126rem;
    margin: 0 auto;
  }
  .recipes-grid {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 6rem;
    padding: 6rem 0;
  }
  .text {
    font-size: 1.4rem;
    padding-left: 2rem;
    padding-right: 1rem;
  }
  .recipes-add-section {
    display: flex;
    align-items: center;
  }
  .m-left-auto {
    margin-left: auto;
  }
}
</style>

