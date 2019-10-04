<template>
  <div class="create-recipe-page">
    <div class="admin-page-title">Создать рецепт</div>
    <div class="admin-section-title">Основная Информация</div>
    <el-form ref="recipeForm" :model="recipe" label-width="120px" label-position="top">
      <el-row :gutter="40">
        <el-col :md="10" :style="{paddingRight: '22px'}">
          <el-form-item label="Название рецепта:">
            <el-input v-model="recipe.title"></el-input>
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
            <el-select v-model="recipe.expires" placeholder="Выберете срок">
              <el-option value="1 день"></el-option>
              <el-option value="1 - 2 день"></el-option>
              <el-option value="1 - 3 день"></el-option>
              <el-option value="1 - 4 день"></el-option>
              <el-option value="1 - 5 день"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Вес готового блюда: (в граммах)">
            <el-input v-model="recipe.weight"></el-input>
          </el-form-item>

          <el-form-item label="Время приготовления: (в минутах)">
            <el-input v-model="recipe.cookTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="5">
          <el-form-item label="Сложность приготовления:">
            <el-select v-model="recipe.difficulty" placeholder="Выберете сложность">
              <el-option value="Готовить легко"></el-option>
              <el-option value="Готовить непросто"></el-option>
              <el-option value="Готовить сложно"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Калорийность: (на 100г продукта)">
            <el-input v-model="recipe.stats"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="admin-section-title">Дополнительная информация</div>

      <el-form-item label="Выбрать автора">
        <el-select v-model="chef" filterable placeholder="Выберете автора">
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
          :style="{width: '36rem'}"
        ></el-input>
      </el-form-item>

      <el-form-item label="Выбрать ингридиенты">
        <el-select
          v-model="ingredientsInput"
          filterable
          placeholder="Выберете ингридиент"
          ref="ingredientInput"
        >
          <el-option
            v-for="(ingredient, index) in ingredients"
            :key="index"
            :label="ingredient"
            :value="ingredient"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addIngredient"
          :style="{marginLeft: '1rem'}"
        ></el-button>
        <el-button
          class="ingr-button"
          v-for="(ingr, index) in this.ingredientsList"
          :key="index"
          size="small"
          plain
          type="info"
          @click="removeIngredient"
        >
          {{ingr}}
          <i class="el-icon-close"></i>
        </el-button>
      </el-form-item>

      <el-form-item label="Выбрать инвентарь">
        <el-select
          v-model="inventoryInput"
          filterable
          placeholder="Выберете инвентарь"
          ref="inventoryInput"
        >
          <el-option v-for="(inv, index) in inventory" :key="index" :label="inv" :value="inv"></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addInventory"
          :style="{marginLeft: '1rem'}"
        ></el-button>
        <el-button
          class="ingr-button"
          v-for="(inv, index) in this.inventoryList"
          :key="index"
          size="small"
          plain
          type="info"
          @click="removeInventory"
        >
          {{inv}}
          <i class="el-icon-close"></i>
        </el-button>
      </el-form-item>

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
          <div class="step" v-for="(step, index) in steps" :key="index">
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
                :disabled="index === (steps.length - 1)"
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
        tags: []
      },
      loading: false,
      chef: "",
      tag: "",
      ingredientsList: [],
      ingredientsInput: "",
      inventoryList: [],
      inventoryInput: "",
      steps: [],
      stepDescription: "",
      stepTime: "",
      stepThumb: "",
      stepsDisabled: false
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
    if (localStorage.steps) {
      this.steps = JSON.parse(localStorage.getItem("steps"));
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
      return this.steps[this.steps.length - 1].thumbnail;
    }
  },
  methods: {
    async addIngredient() {
      let ingr = this.$refs.ingredientInput.value;
      if (ingr) {
        const snapshot = await db
          .collection("ingredients")
          .where("name", "==", ingr)
          .get();
        snapshot.docs.map(doc => this.recipe.ingredients.push(doc.data()));
        this.ingredientsList.push(ingr);
        this.ingredientsInput = "";
      }
    },
    removeIngredient(event) {
      let ingr = event.currentTarget.textContent.trim();
      this.recipe.ingredients = this.recipe.ingredients.filter(
        el => el.name != ingr
      );
      this.ingredientsList = this.ingredientsList.filter(el => el != ingr);
    },
    async addInventory() {
      let inv = this.$refs.inventoryInput.value;
      if (inv) {
        const snapshot = await db
          .collection("inventory")
          .where("name", "==", inv)
          .get();
        snapshot.docs.map(doc => this.recipe.inventory.push(doc.data()));
        this.inventoryList.push(inv);
        this.inventoryInput = "";
      }
    },
    removeInventory(event) {
      let inv = event.currentTarget.textContent.trim();
      this.recipe.inventory = this.recipe.inventory.filter(
        el => el.name != inv
      );
      this.inventoryList = this.inventoryList.filter(el => el != inv);
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
      }
    },
    removeTag(event) {
      let tag = event.currentTarget.textContent.trim();
      this.recipe.tags = this.recipe.tags.filter(el => el != tag);
    },
    addStep() {
      const step = {
        thumbnail: this.stepThumb,
        description: this.stepDescription
        // time: this.stepTime
      };
      if (this.stepTime) {
        step.stepTime = this.stepTime;
      }
      this.steps.push(step);

      if (!localStorage.steps) {
        localStorage.setItem("steps", JSON.stringify(this.steps));
      } else {
        let parsed = JSON.parse(localStorage.getItem("steps"));
        parsed.push(step);
        localStorage.setItem("steps", JSON.stringify(parsed));
      }
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
          this.steps = parsed;
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
      this.steps.splice(index - 1, 2, this.steps[index], this.steps[index - 1]);
      localStorage.setItem("steps", JSON.stringify(this.steps));
    },
    stepDown(index) {
      this.steps.splice(index, 2, this.steps[index + 1], this.steps[index]);
      localStorage.setItem("steps", JSON.stringify(this.steps));
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
            steps: this.steps,
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
  .ingr-button {
    display: block;
    margin: 1rem 0;
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

