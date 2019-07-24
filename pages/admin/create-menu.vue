<template>
  <div class="create-menu-page">
    <div class="admin-page-title">Составить меню</div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">Меню на 18 - 24 июля (прошлая неделя)</span>
        <div class="dinners-tab-wrapper">
          <el-button
            size="small"
            @click="addTab(editableTabsValue)"
            class="dinners-add-btn"
            type="info"
            plain
          >
            Добавить Меню
            <i class="el-icon-plus"></i>
          </el-button>
          <el-tabs type="card" closable @tab-remove="removeDinnerTab">
            <el-tab-pane label="Оригинальное">
              <div class="recipes">
                <div class="recipes-add-section">
                  <el-button size="small">
                    Создать рецепт
                    <i class="el-icon-plus"></i>
                  </el-button>
                  <span class="text">или выбрать из списка:</span>
                  <el-autocomplete
                    size="small"
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="Выбрать рецепт"
                    @select="handleSelect"
                  >
                    <el-button slot="append" icon="el-icon-plus"></el-button>
                  </el-autocomplete>
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    class="m-left-auto"
                  >Удалить меню</el-button>
                  <el-button type="success" size="small" icon="el-icon-success">Сохранить меню</el-button>
                </div>
                <div class="recipes-grid">
                  <RecipeThumb v-for="recipe in 12" :key="recipe" />
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Семейное">Семейное</el-tab-pane>
            <el-tab-pane label="20 минут">20 минут</el-tab-pane>
            <el-tab-pane label="Баланс">Баланс</el-tab-pane>
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
    </el-tabs>

    <!-- create recipe dialog -->
  </div>
</template>

<script>
import RecipeThumb from "@/components/Recipes/RecipeThumb";
export default {
  layout: "admin",
  components: {
    RecipeThumb
  },
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    removeDinnerTab() {}
    // handleTabsEdit(targetName, action) {
    //   console.log("edit");
    //   if (action === "add") {
    //     let newTabName = ++this.tabIndex + "";
    //     this.editableTabs.push({
    //       title: "New Tab",
    //       name: newTabName,
    //       content: "New Tab content"
    //     });
    //     this.editableTabsValue = newTabName;
    //   }
    // if (action === "remove") {
    //   let tabs = this.editableTabs;
    //   let activeName = this.editableTabsValue;
    //   if (activeName === targetName) {
    //     tabs.forEach((tab, index) => {
    //       if (tab.name === targetName) {
    //         let nextTab = tabs[index + 1] || tabs[index - 1];
    //         if (nextTab) {
    //           activeName = nextTab.name;
    //         }
    //       }
    //     });
    //   }

    //   this.editableTabsValue = activeName;
    //   this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    // }
    // }
  }
};
</script>

<style lang="scss">
.create-menu-page {
  .dinners-tab-wrapper {
    position: relative;
  }
  .dinners-add-btn {
    position: absolute;
    right: 0;
    z-index: 1;
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

