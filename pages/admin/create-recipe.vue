<template>
  <div class="create-recipe-page">
    <div class="admin-page-title">Создать рецепт</div>
    <div class="admin-section-title">
      Основная Информация
      <el-button class="clear-btn" type="danger" @click="clearAllFields">Очистить все поля</el-button>
    </div>
    <el-form ref="recipeForm" :model="recipe" label-width="120px" label-position="top">
      <el-row :gutter="40">
        <el-col :md="10" :style="{paddingRight: '22px'}">
          <el-form-item label="Название рецепта:">
            <el-input v-model="recipe.title" @blur="saveToLocalStorage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5">
          <el-form-item label="Добавить Тэги" prop="tags">
            <el-input v-model="tag" placeholder="Тэги поста" ref="tagInput">
              <el-button slot="append" icon="el-icon-plus" @click="addTag"></el-button>
            </el-input>

            <el-button
              class="tag-button"
              v-for="(tag, index) in this.recipe.tags"
              :key="index"
              size="small"
              plain
              @click="removeTag"
            >
              {{tag}}
              <i class="el-icon-close"></i>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" :gutter="40" class="mb2">
        <el-col :md="5">
          <el-form-item label="Срок приготовления:">
            <el-select
              v-model="recipe.expires"
              @change="saveToLocalStorage"
              placeholder="Выберете срок"
            >
              <el-option value="1 день"></el-option>
              <el-option value="1 - 2 день"></el-option>
              <el-option value="1 - 3 день"></el-option>
              <el-option value="1 - 4 день"></el-option>
              <el-option value="1 - 5 день"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Вес готового блюда: (в граммах)">
            <el-input v-model="recipe.weight" @blur="saveToLocalStorage"></el-input>
          </el-form-item>

          <el-form-item label="Время приготовления: (в минутах)">
            <el-input v-model="recipe.cookTime" @blur="saveToLocalStorage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5">
          <el-form-item label="Сложность приготовления:">
            <el-select
              v-model="recipe.difficulty"
              @change="saveToLocalStorage"
              placeholder="Выберете сложность"
            >
              <el-option value="Готовить легко"></el-option>
              <el-option value="Готовить непросто"></el-option>
              <el-option value="Готовить сложно"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Калорийность и БЖУ: (на 100г продукта)">
            <el-input v-model="recipe.stats" @blur="saveToLocalStorage"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="admin-section-title">Дополнительная информация</div>

      <el-form-item label="Выбрать автора">
        <el-select
          v-model="recipe.chef"
          @change="saveToLocalStorage"
          filterable
          placeholder="Выберете автора"
        >
          <el-option
            v-for="(chef, index) in chefs"
            :key="index"
            :label="chef.name"
            :value="chef.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Добавить совет от автора:">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Введите совет"
          v-model="recipe.advice"
          @blur="saveToLocalStorage"
          :style="{width: '36rem'}"
        ></el-input>
      </el-form-item>

      <el-form-item label="Выберете ингридиенты:">
        <el-autocomplete
          class="autocomplete"
          v-model="ingrSearch"
          :fetch-suggestions="((queryString, cb)=>{searchDB(queryString, cb,'ingredients')})"
          placeholder="Поиск по названию"
          @select="addIngredient"
          :clearable="true"
        ></el-autocomplete>
      </el-form-item>

      <div class="ingredients-list">
        <el-card v-for="(ingr, index) in recipe.ingredients" :key="index" class="ingredient-item">
          <img :src="ingr.thumbnail" class="ingredient-image" />
          <span>{{ingr.name}}</span>
          <i class="el-icon-circle-close ingredient-icon-close" @click="removeIngredient(ingr)"></i>
        </el-card>
      </div>

      <el-form-item label="Выберете инвентарь:">
        <el-autocomplete
          class="autocomplete"
          v-model="invSearch"
          :fetch-suggestions="((queryString, cb)=>{searchDB(queryString, cb,'inventory')})"
          placeholder="Поиск по названию"
          @select="addInventory"
          :clearable="true"
        ></el-autocomplete>
      </el-form-item>

      <div class="inventory-list">
        <el-card v-for="(inv, index) in recipe.inventory" :key="index" class="inventory-item">
          <img :src="inv.thumbnail" class="inventory-image" />
          <span>{{inv.name}}</span>
          <i class="el-icon-circle-close inventory-icon-close" @click="removeInventory(inv)"></i>
        </el-card>
      </div>

      <div class="admin-section-title">Рецепт по шагам</div>

      <el-row :gutter="120">
        <el-col :md="8">
          <div class="mb2">Добавить изображение шага:</div>
          <el-upload
            class="steps-uploader"
            action
            :show-file-list="false"
            :on-success="handleStepSuccess"
            :before-upload="beforeStepUpload"
          >
            <img v-if="stepThumb" :src="stepThumb" class="steps-uploader-image" />
            <i v-else class="el-icon-plus steps-uploader-icon"></i>
          </el-upload>

          <el-form-item label="Добавить описание шага:">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Введите описание"
              v-model="stepDescription"
            ></el-input>
          </el-form-item>

          <el-form-item label="Добавить время шага: (в минутах)">
            <el-input placeholder="Введите описание" v-model="stepTime"></el-input>
          </el-form-item>

          <el-button type="info" :disabled="loading" @click="addStep" class="mb4">Добавить шаг</el-button>
        </el-col>
        <el-col :md="16">
          <div class="step" v-for="(step, index) in recipe.steps" :key="index">
            <div class="step-thumb" :style="{backgroundImage: 'url(' + step.thumbnail +')'}"></div>
            <div class="step-info">
              <div class="step-num">Шаг {{ index + 1 }}</div>
              <div class="step-descr">{{ step.description}}</div>
              <div v-if="step.time" class="step-time">{{ step.time }} мин</div>
            </div>
            <div class="step-controls">
              <el-button
                icon="el-icon-caret-top"
                circle
                size="small"
                @click="stepUp(index)"
                :disabled="index === 0"
              ></el-button>
              <el-button
                icon="el-icon-caret-bottom"
                circle
                size="small"
                @click="stepDown(index)"
                :disabled="index === (recipe.steps.length - 1)"
              ></el-button>
              <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="small"
                @click="removeStep(step)"
              ></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="createRecipe">Создать рецепт</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { db, fs } from "@/plugins/firebase";

export default {
  layout: "admin",
  data() {
    return {
      recipe: {
        title: "",
        expires: "",
        weight: "",
        cookTime: "",
        difficulty: "",
        stats: "",
        advice: "",
        ingredients: [],
        inventory: [],
        tags: [],
        chef: "",
        steps: []
      },
      loading: false,
      tag: "",
      ingredientsInput: "",
      inventoryInput: "",
      stepDescription: "",
      stepTime: "",
      stepThumb: "",
      stepsDisabled: false,
      ingrSearch: "",
      invSearch: ""
    };
  },
  async asyncData() {
    let ingredients = [];
    let inventory = [];
    const [ingredientsSnapshot, inventorySnapshot] = await Promise.all([
      db.collection("ingredients").get(),
      db.collection("inventory").get()
    ]);
    ingredientsSnapshot.forEach(ingr => {
      ingredients.unshift(ingr.data().name);
    });
    inventorySnapshot.forEach(inv => {
      inventory.unshift(inv.data().name);
    });
    return { ingredients, inventory };
  },
  mounted() {
    if (localStorage.recipe) {
      this.recipe = JSON.parse(localStorage.getItem("recipe"));
    }
  },
  computed: {
    chefs() {
      return this.$store.getters["chefs/getChefs"];
    },
    chefData() {
      return this.chefs.filter(chef => chef.name === this.chef)[0];
    },
    thumbnail() {
      return this.recipe.steps[this.recipe.steps.length - 1].thumbnail;
    }
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("recipe", JSON.stringify(this.recipe));
    },
    clearAllFields() {
      this.recipe = {
        title: "",
        expires: "",
        weight: "",
        cookTime: "",
        difficulty: "",
        stats: "",
        advice: "",
        ingredients: [],
        inventory: [],
        tags: [],
        chef: "",
        steps: []
      };
    },
    async searchDB(queryString, cb, dbname) {
      let results = [];
      let searchItems = db.collection(dbname);
      queryString =
        queryString.substring(0, 1).toUpperCase() + queryString.substring(1);
      if (queryString) {
        let query = await searchItems
          .orderBy("name")
          .startAt(queryString)
          .endAt(queryString + "\uf8ff")
          .get();
        query.docs.map(doc => {
          doc.value = doc.name;
          results.push(doc.data());
        });
        results.map(i => (i.value = i.name));
        cb(results);
      }
    },
    addIngredient(ingr) {
      delete ingr.value;
      this.recipe.ingredients.push(ingr);
      this.saveToLocalStorage();

      // let ingr = this.$refs.ingredientInput.value;
      // if (ingr) {
      //   const snapshot = await db
      //     .collection("ingredients")
      //     .where("name", "==", ingr)
      //     .get();
      //   snapshot.docs.map(doc => this.recipe.ingredients.push(doc.data()));
      //   this.ingredientsInput = "";
      //   this.saveToLocalStorage();
      // }
    },
    removeIngredient(ingr) {
      this.recipe.ingredients = this.recipe.ingredients.filter(
        el => el.name !== ingr.name
      );
      this.saveToLocalStorage();
    },
    addInventory(inv) {
      delete inv.value;
      this.recipe.inventory.push(inv);
      this.saveToLocalStorage();
    },
    removeInventory(inv) {
      this.recipe.inventory = this.recipe.inventory.filter(
        el => el.name !== inv.name
      );
      this.saveToLocalStorage();
    },
    handleStepSuccess(res, file) {
      const storageRef = fs.ref("steps/" + file.name);
      let uploadTask = storageRef.put(file.raw);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful upload
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            this.stepThumb = downloadURL;
          });
        }
      );
    },
    beforeStepUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Thumbnail picture size can not exceed 2MB!");
      }
      return isLt2M;
    },
    addTag() {
      let tag = this.$refs.tagInput.value;
      if (tag) {
        tag = "#" + tag;
        this.recipe.tags.push(tag);
        this.tag = "";
        this.saveToLocalStorage();
      }
    },
    removeTag(event) {
      let tag = event.currentTarget.textContent.trim();
      this.recipe.tags = this.recipe.tags.filter(el => el != tag);
      this.saveToLocalStorage();
    },
    addStep() {
      const step = {
        thumbnail: this.stepThumb,
        description: this.stepDescription
      };
      if (this.stepTime) {
        step.stepTime = this.stepTime;
      }

      this.recipe.steps.push(step);
      this.saveToLocalStorage();

      this.$message.success("Шаг добавлен");

      this.stepThumb = "";
      this.stepDescription = "";
      this.stepTime = "";
    },
    removeStep(step) {
      this.$confirm("Вы действительно хотите удалить шаг?", "Внимание", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning"
      })
        .then(() => {
          let parsed = JSON.parse(localStorage.getItem("steps")).filter(obj => {
            return obj.description !== step.description;
          });
          localStorage.setItem("steps", JSON.stringify(parsed));
          this.recipe.steps = parsed;
          this.$message({
            type: "success",
            message: "Шаг удален"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Удаление отменено"
          });
        });
    },
    stepUp(index) {
      this.recipe.steps.splice(
        index - 1,
        2,
        this.recipe.steps[index],
        this.recipe.steps[index - 1]
      );
      this.saveToLocalStorage();
    },
    stepDown(index) {
      this.recipe.steps.splice(
        index,
        2,
        this.recipe.steps[index + 1],
        this.recipe.steps[index]
      );
      this.saveToLocalStorage();
    },
    async createRecipe() {
      this.$refs.recipeForm.validate(async valid => {
        if (valid && this.thumbnail) {
          this.loading = true;

          const formData = {
            title: this.recipe.title,
            expires: this.recipe.expires,
            weight: this.recipe.weight,
            cookTime: this.recipe.cookTime,
            difficulty: this.recipe.difficulty,
            stats: this.recipe.stats,
            advice: this.recipe.advice,
            tags: this.recipe.tags,
            chef: {
              name: this.chefData.name,
              avatar: this.chefData.avatar
            },
            ingredients: this.recipe.ingredients,
            inventory: this.recipe.inventory,
            steps: this.recipe.steps,
            thumbnail: this.thumbnail
          };

          try {
            await this.$store.dispatch("recipes/createRecipe", formData);
            this.$message.success("Рецепт добавлен!");
          } catch (err) {
            console.log(err);
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Заполните все поля и добавьте изображение");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.create-recipe-page {
  .admin-section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ingredients-list {
    display: flex;
    margin-bottom: 3rem;
  }
  .inventory-list {
    display: flex;
    margin-bottom: 8rem;
  }
  .ingredient-item,
  .inventory-item {
    width: 20rem;
    text-align: center;
    margin-right: 2rem;
    position: relative;
  }
  .ingredient-image,
  .inventory-image {
    display: block;
    width: 100%;
    margin-bottom: 2rem;
  }
  .ingredient-icon-close,
  .inventory-icon-close {
    cursor: pointer;
    font-size: 2.5rem;
    color: #666;
    background-color: #fff;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  .autocomplete {
    width: 36rem;
  }
  .step-thumbnail {
    margin-bottom: 4rem;
  }
  .el-upload {
    width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .steps-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 37.6rem;
    height: 25rem;
    line-height: 25rem;
    text-align: center;
  }
  .steps-uploader-image {
    width: 100%;
    height: auto;
    display: block;
  }
  .step {
    width: 100%;
    display: flex;
    position: relative;
    margin-bottom: 10rem;
  }
  .step-thumb {
    flex-basis: 37.6rem;
    height: 25rem;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 2rem;
  }
  .step-info {
    flex: 1;
  }
  .step-num {
    font-family: Regal, sans-serif;
    font-size: 2rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  .step-time {
    color: #7f7f7f;
    margin-top: 1rem;
  }
  .step-controls {
    position: absolute;
    bottom: -6rem;
  }
}
</style>

