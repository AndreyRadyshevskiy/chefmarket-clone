<template>
  <div class="create-menu-page">
    <div class="admin-page-title">Составить меню</div>

    <div class="input-block">
      <span class="label">Выберете даты:</span>
      <el-date-picker
        :style="{width: '40rem'}"
        v-model="weekDates"
        type="daterange"
        start-placeholder="Начало периода"
        end-placeholder="Конец периода"
        format="dd-MM-yyyy"
      ></el-date-picker>
    </div>

    <div class="input-block">
      <span class="label">Доставка возможна:</span>
      <el-date-picker
        :style="{width: '40rem'}"
        v-model="deliveryDates"
        type="daterange"
        start-placeholder="Начало периода"
        end-placeholder="Конец периода"
        format="dd-MM-yyyy"
      ></el-date-picker>
    </div>

    <el-button type="primary" @click="addWeek" class="mb4">Добавить период</el-button>

    <!-- WEEK TABS -->
    <el-tabs v-model="weekActiveTab" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(week, index) in weeks"
        :key="index"
        :label="week.datesString"
        :name="week.datesString"
      >
        <div class="date">Меню на {{week.datesString}}</div>
        <div
          class="delivery-date"
        >Доставка возможна с {{week.deliveryDatesString}}, выбирайте удобный вам день</div>

        <div class="input-block">
          <span class="label">Название меню:</span>
          <el-input v-model="menuName" placeholder="Введите название меню" class="menu-input"></el-input>

          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addMenuName(weekActiveTab)"
            :style="{marginLeft: '1rem'}"
          ></el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- <div :style="{'marginTop': '4rem'}">
      <el-button type="primary" @click="saveMenu">Сохранить меню</el-button>
      <el-button type="danger">Удалить меню</el-button>
      <el-button type="success">Предпросмотр</el-button>
    </div>-->

    <!-- MENU TABS -->
    <el-tabs v-model="menuActiveTab" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(name, index) in menuNames"
        :key="index"
        :label="name"
        :name="name"
        class="pt4"
      >
        <div class="input-block">
          <span class="label">Выбрать рецепт:</span>
          <el-select
            v-model="recipeSelect"
            filterable
            placeholder="Выберете рецепт"
            ref="recipeSelect"
            class="recipe-select"
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
            @click="addRecipe(menuActiveTab)"
            :style="{marginLeft: '1rem'}"
          ></el-button>
        </div>
        <div class="recipes-grid">
          <RecipeThumb
            v-for="(recipe, index) in activeMenuSet"
            :key="index"
            :recipe="recipe"
            @removeRecipe="removeRecipe"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <p>{{weeks}}</p>
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
      loading: false,
      weekDates: "",
      deliveryDates: "",
      menu: [],
      weeks: [],
      menuName: "",
      menuNames: [],
      menuActiveTab: "",
      weekActiveTab: "",
      recipeSelect: ""
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
  computed: {
    weekStartDate() {
      return this.weekDates ? this.weekDates[0].getDate() : "";
    },
    weekEndDate() {
      return this.weekDates
        ? this.weekDates[1].toLocaleString("ru", {
            day: "numeric",
            month: "long"
          })
        : "";
    },
    deliveryStartDate() {
      return this.deliveryDates ? this.deliveryDates[0].getDate() : "";
    },
    deliveryEndDate() {
      return this.deliveryDates
        ? this.deliveryDates[1].toLocaleString("ru", {
            day: "numeric",
            month: "long"
          })
        : "";
    },
    activeMenuSet() {
      let c = this.menu.find(el => el.name === this.menuActiveTab);
      if (c) {
        return c.recipes;
      }
    },
    activeWeek() {
      let c = this.weeks.find(el => el.status === this.weekActiveTab);
      if (c) {
        return c.menus;
      }
    }
  },
  methods: {
    addWeek() {
      const datesString = this.weekStartDate + " - " + this.weekEndDate;
      const deliveryDatesString =
        this.deliveryStartDate + " - " + this.deliveryEndDate;
      const week = {
        dates: this.weekDates,
        deliveryDates: this.deliveryDates,
        datesString,
        deliveryDatesString
      };
      this.weeks.push(week);
      this.weekActiveTab = datesString;
      this.weekDates = "";
      this.deliveryDates = "";
      this.$message.success("Период добавлен!");
    },
    addMenuName() {
      if (this.menuName) {
        this.menuNames.push(this.menuName);
        this.menuActiveTab = this.menuName;
        this.menuName = "";
      }
    },
    removeTab() {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
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

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    addRecipe(menuTab) {
      if (this.recipeSelect) {
        const recipe = this.recipes.find(r => {
          return this.recipeSelect == r.title;
        });
        const activeSet = this.menu.find(el => el.name === this.menuActiveTab);
        if (this.menu.length === 0 || activeSet === undefined) {
          const menuSet = { name: menuTab, recipes: [] };
          menuSet.recipes.push(recipe);
          this.menu.push(menuSet);
          this.recipeSelect = "";
        } else {
          activeSet.recipes.push(recipe);
          this.recipeSelect = "";
        }
      }
      // if (this.recipeSelect) {
      //   const recipe = this.recipes.find(r => {
      //     return this.recipeSelect == r.title;
      //   });
      //   if (!this.menu[menuTab]) {
      //     this.menu[menuTab] = [];
      //     this.menu[menuTab].push(recipe);
      //     console.log(this.menu);
      //   } else {
      //     this.menu[menuTab].push(recipe);
      //     console.log(this.menu);
      //   }
      // }
    },
    async saveMenu() {
      this.loading = true;

      const formData = {
        weekDates: this.weekDates,
        deliveryDates: this.deliveryDates,
        menu: this.menu
      };

      console.log(this.weekDates);

      // try {
      //   await this.$store.dispatch("menu/createMenu", formData);
      //   this.$message.success("Меню сохранено!");
      // } catch (err) {
      //   console.log(err);
      // } finally {
      //   this.loading = false;
      // }
    }
  }
};
</script>

<style lang="scss">
.create-menu-page {
  .input-block {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
  .label {
    width: 20rem;
  }
  .menu-input {
    width: 40rem;
  }
  .recipe-select {
    width: 40rem;
  }
  .date {
    font-size: 2rem;
    text-align: center;
    width: 100%;
    padding: 6rem 0 2rem 0;
    color: #333;
  }
  .delivery-date {
    font-size: 1.6rem;
    text-align: center;
    width: 100%;
    color: #333;
    padding-bottom: 4rem;
  }
  .recipes-grid {
    width: 126rem;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 6rem;
    padding: 6rem 0;
  }
}
</style>

