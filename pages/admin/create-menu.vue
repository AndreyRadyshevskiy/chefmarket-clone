<template>
  <div class="create-menu-page">
    <div class="admin-page-title">Составить меню</div>
    <!-- DATES INPUT -->
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
    {{periods}}
    <!-- DELIVERY DATES -->
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

    <el-button type="primary" @click="addPeriod" class="mb4">Создать период</el-button>
    <!-- PERIOD TABS -->

    <el-tabs v-model="periodActiveName" type="card" closable @tab-remove="removePeriod">
      <el-tab-pane
        v-for="(period, index) in periods"
        :key="index+period.datesString"
        :label="period.datesString"
        :name="period.datesString"
      >
        <!-- PERIODS HEADER -->
        <div class="date">Меню на {{ period.datesString }}</div>
        <div class="delivery-date">
          Доставка возможна с {{ period.deliveryDatesString }}, выбирайте
          удобный вам день
        </div>
        <!-- MENU INPUT -->
        <div class="input-block">
          <span class="label">Название меню:</span>
          <el-input v-model="menuSetName" placeholder="Введите название меню" class="menu-input"></el-input>

          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addMenuSet"
            :style="{ marginLeft: '1rem' }"
          ></el-button>
        </div>

        <!-- MENU TABS -->
        <el-tabs v-model="menuActiveSetName" type="card" closable @tab-remove="removeMenuSet">
          <el-tab-pane
            v-for="(menuSet, index) in periodActive.menuSets"
            :key="index+menuSet.name"
            :label="menuSet.name"
            :name="menuSet.name"
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
                @click="addRecipe"
                :style="{ marginLeft: '1rem' }"
              ></el-button>
            </div>
            <div class="recipes-grid">
              <RecipeThumb
                v-for="(recipe, index) in menuActiveSet.recipes"
                :key="index"
                :recipe="recipe"
                @removeRecipe="removeRecipe(menuActiveSet.recipes, index)"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <el-button type="success" @click="savePeriod" class="mb4">Сохранить меню</el-button>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import RecipeThumb from "@/components/Recipes/RecipeThumb";
export default {
  layout: "admin",
  components: { RecipeThumb },
  data() {
    return {
      periodDates: [],
      deliveryDates: [],
      periods: [],
      periodActive: [],
      periodActiveName: "",
      menuSetName: "",
      menuActiveSetName: "",
      menuActiveSet: {},
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
    }
  },
  mounted() {
    // if (localStorage.getItem("periods")) {
    //   this.periods = JSON.parse(localStorage.getItem("periods"));
    // }
    // const pers = JSON.parse(localStorage.getItem("periods"));
    // this.periods = pers;
    // console.log(this.periods);
  },
  watch: {
    periodActiveName() {
      this.periodActive = this.periods.find(
        p => p.datesString === this.periodActiveName
      );
      if (this.periodActive && this.periodActive.menuSets.length > 0) {
        this.menuActiveSetName = this.periodActive.menuSets[0].name;
        this.menuActiveSet = this.periodActive.menuSets[0];
      } else {
        console.log("error is here");
      }
    },
    menuActiveSetName() {
      this.menuActiveSet = this.periodActive.menuSets.find(
        ms => ms.name === this.menuActiveSetName
      );
    }
  },
  methods: {
    addPeriod() {
      if (this.periodDates.length === 2 && this.deliveryDates.length === 2) {
        const datesString = this.periodStartDate + " - " + this.periodEndDate;
        const deliveryDatesString =
          this.deliveryStartDate + " по " + this.deliveryEndDate;
        const period = {
          dates: this.periodDates,
          deliveryDates: this.deliveryDates,
          datesString,
          deliveryDatesString,
          menuSets: []
        };
        // NEED TO ADD ORDER TO PERIODS HERE
        this.periods.push(period);
        this.periodActiveName = datesString;
        this.periodDates = "";
        this.deliveryDates = "";
        this.$message.success("Период добавлен!");
      } else {
        this.$message.error("Выберете даты и добавьте период доставки!");
      }
    },
    removePeriod(targetName) {
      let tabs = this.periods;
      let activeName = this.periodActiveName;
      this.$confirm(
        "Действительно ли вы хотите удалить этот период?",
        "Внимание",
        {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          type: "warning"
        }
      )
        .then(() => {
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.datesString === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.datesString;
                }
              }
            });
          }
          this.periodActiveName = activeName;
          this.periods = this.periods.filter(
            tab => tab.datesString !== targetName
          );
          this.$message({
            type: "success",
            message: "Период удален"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Отмена удаления"
          });
        });
    },
    addMenuSet() {
      if (this.menuSetName) {
        const menuSet = {
          name: this.menuSetName,
          recipes: []
        };
        this.periodActive.menuSets.push(menuSet);
        this.menuActiveSetName = this.menuSetName;
        this.periods.map(p =>
          p.datesString === this.periodActive.datesString
            ? this.periodActive
            : p
        );
        // this.activePeriod.menuSets.push(menuSet);
        // this.menuActiveSetName = this.menuSetName;
        this.menuActiveSet = this.periodActive.menuSets.find(
          ms => ms.name === this.menuActiveSetName
        );
        this.menuSetName = "";
        // this.menuActiveSet = menuSet;
        // this.$message.success("Меню добавлено!");
      }
    },
    removeMenuSet(targetName) {
      let tabs = this.periodActive.menuSets;
      let activeName = this.menuActiveSet.name;
      this.$confirm(
        "Действительно ли вы хотите удалить это Меню?",
        "Внимание",
        {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          type: "warning"
        }
      )
        .then(() => {
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
          this.menuActiveSetName = activeName;
          this.periodActive.menuSets = this.periodActive.menuSets.filter(
            tab => tab.name !== targetName
          );
          this.$message({
            type: "success",
            message: "Меню удалено"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Отмена удаления"
          });
        });
    },
    addRecipe() {
      if (this.recipeSelect) {
        const recipe = this.recipes.find(r => {
          return this.recipeSelect == r.title;
        });
        this.menuActiveSet = this.periodActive.menuSets.find(p => {
          return p.name === this.menuActiveSetName;
        });
        this.menuActiveSet.recipes.push(recipe);
        this.recipeSelect = "";
      }
      console.log(this.periods);
    },
    removeRecipe(activeRecipes, i) {
      this.$confirm(
        "Действительно ли вы хотите удалить этот рецепт?",
        "Внимание",
        {
          confirmButtonText: "Удалить",
          cancelButtonText: "Отмена",
          type: "warning"
        }
      )
        .then(() => {
          activeRecipes.splice(i, 1);
          this.$message({
            type: "success",
            message: "Рецепт удален"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Отмена удаления"
          });
        });
    },
    async savePeriod() {
      // const parsedPeriod = JSON.stringify(this.periods);
      // localStorage.setItem("periods", parsedPeriod);
      // ТУТ ДОЛЖНА БЫТЬ ВАЛИДАЦИЯ

      this.loading = true;
      const formData = {
        menu: this.periods
      };
      try {
        await this.$store.dispatch("menu/createMenu", formData);
        this.$message.success("меню сохранено!");
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
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
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 6rem;
    padding: 6rem 0;
  }
}
</style>
