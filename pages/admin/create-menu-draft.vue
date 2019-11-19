<template>
  <div class="create-menu-page">
    <div class="admin-page-title">Составить меню</div>

    <div class="input-block">
      <span class="label">Выберете даты:</span>
      <el-date-picker
        :style="{ width: '40rem' }"
        v-model="periodDates"
        type="daterange"
        start-placeholder="Начало периода"
        end-placeholder="Конец периода"
        format="dd-MM-yyyy"
      ></el-date-picker>
    </div>
    <p>{{ periodActiveTab }}</p>
    <div class="input-block">
      <span class="label">Доставка возможна:</span>
      <el-date-picker
        :style="{ width: '40rem' }"
        v-model="deliveryDates"
        type="daterange"
        start-placeholder="Начало периода"
        end-placeholder="Конец периода"
        format="dd-MM-yyyy"
      ></el-date-picker>
    </div>

    <el-button type="primary" @click="addPeriodTab" class="mb4">Добавить период</el-button>
    <p>{{ periodTabs }}</p>
    <!-- PERIOD TABS -->
    <el-tabs v-model="periodActiveTab" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(period, index) in periodTabs"
        :key="index"
        :label="period.datesString"
        :name="period.datesString"
      >
        <div class="date">Меню на {{ period.datesString }}</div>
        <div class="delivery-date">
          Доставка возможна с {{ period.deliveryDatesString }}, выбирайте
          удобный вам день
        </div>

        <div class="input-block">
          <span class="label">Название меню:</span>
          <el-input v-model="menuTabName" placeholder="Введите название меню" class="menu-input"></el-input>

          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addMenuTab(periodActiveTab)"
            :style="{ marginLeft: '1rem' }"
          ></el-button>
        </div>

        <!-- MENU TABS -->
        <el-tabs v-model="menuActiveTab" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(name, index) in menuTabs"
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
                :style="{ marginLeft: '1rem' }"
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
      </el-tab-pane>
    </el-tabs>

    <!-- <div :style="{'marginTop': '4rem'}">
      <el-button type="primary" @click="saveMenu">Сохранить меню</el-button>
      <el-button type="danger">Удалить меню</el-button>
      <el-button type="success">Предпросмотр</el-button>
    </div>-->
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
      periodDates: [],
      deliveryDates: [],
      menuSets: [],
      weeks: [],
      periodTabs: [],
      periodActiveTab: "",
      menuTabName: "",
      menuTabs: [],
      menuActiveTab: "",
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
    periodStartDate() {
      return this.periodDates ? this.periodDates[0].getDate() : "";
    },
    periodEndDate() {
      return this.periodDates
        ? this.periodDates[1].toLocaleString("ru", {
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
      let c = this.menuSets.find(el => el.name === this.menuActiveTab);
      if (c) {
        return c.recipes;
      }
    },
    activeWeek() {
      let c = this.weeks.find(el => el.status === this.periodActiveTab);
      if (c) {
        return c.menus;
      }
    }
  },
  methods: {
    addPeriodTab() {
      const datesString = this.periodStartDate + " - " + this.periodEndDate;
      const deliveryDatesString =
        this.deliveryStartDate + " - " + this.deliveryEndDate;
      const period = {
        dates: this.periodDates,
        deliveryDates: this.deliveryDates,
        datesString,
        deliveryDatesString
      };
      this.periodTabs.push(period);
      this.periodActiveTab = datesString;
      this.periodDates = "";
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
    addMenuTab(periodActiveTab) {
      if (this.menuTabName) {
        const activePeriod = this.periodTabs.find(
          el => el.datesString === periodActiveTab
        );
        this.menuTabs.push(this.menuTabName);
        this.menuActiveTab = this.menuTabName;
        this.menuTabName = "";
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
    addRecipe(menuActiveTab) {
      if (this.recipeSelect) {
        const recipe = this.recipes.find(r => {
          return this.recipeSelect == r.title;
        });
        const activeSet = this.menuSets.find(
          el => el.name === this.menuActiveTab
        );
        if (this.menuSets.length === 0 || activeSet === undefined) {
          const menuSet = { name: menuActiveTab, recipes: [] };
          menuSet.recipes.push(recipe);
          this.menuSets.push(menuSet);
          this.recipeSelect = "";
        } else {
          activeSet.recipes.push(recipe);
          this.recipeSelect = "";
        }
      }
    },
    async saveMenu() {
      this.loading = true;

      const formData = {
        periodDates: this.periodDates,
        deliveryDates: this.deliveryDates,
        menu: this.menu
      };

      console.log(this.periodDates);

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
