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
      <Recipe :activeRecipe="activeRecipe" />
    </el-dialog>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import Recipe from "@/components/Recipes/Recipe";
export default {
  layout: "admin",
  components: {
    Recipe
  },
  data() {
    return {
      search: "",
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
}
</style>

