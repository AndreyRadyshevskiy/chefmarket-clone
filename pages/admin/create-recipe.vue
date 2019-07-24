<template>
  <div class="create-recipe-page">
    <div class="admin-page-title">Создать рецепт</div>
    <div class="admin-section-title">Основная Информация</div>
    <el-form ref="form" :model="recipe" label-width="120px" label-position="top">
      <el-row>
        <el-col :md="10" :style="{paddingRight: '22px'}">
          <el-form-item label="Название рецепта:">
            <el-input v-model="recipe.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" :gutter="40" class="mb2">
        <el-col :md="5">
          <el-form-item label="Срок приготовления:">
            <el-select v-model="recipe.expires" placeholder="Выберете срок">
              <el-option label="1 день" value="1"></el-option>
              <el-option label="1 - 2 день" value="2"></el-option>
              <el-option label="1 - 3 день" value="3"></el-option>
              <el-option label="1 - 4 день" value="4"></el-option>
              <el-option label="1 - 5 день" value="5"></el-option>
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
              <el-option label="Готовить легко" value="easy"></el-option>
              <el-option label="Готовить непросто" value="medium"></el-option>
              <el-option label="Готовить сложно" value="hard"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Калорийность: (на 100г продукта)">
            <el-input v-model="recipe.stats"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="admin-section-title">Дополнительная информация</div>

      <el-row type="flex" :style="{height: '40rem'}">
        <el-col :md="6">
          <el-form-item label="Выберете автора">
            <el-select v-model="value" filterable placeholder="Select">
              <el-option
                v-for="(author, index) in authors"
                :key="index"
                :label="author.label"
                :value="author.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Выберете ингридиенты">
            <el-select v-model="value" filterable placeholder="Select">
              <el-option
                v-for="(ingr, index) in ingrs"
                :key="index"
                :label="ingr.label"
                :value="ingr.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Должно быть дома">
            <el-select v-model="value" filterable placeholder="Select">
              <el-option
                v-for="(ingr, index) in ingrs"
                :key="index"
                :label="ingr.label"
                :value="ingr.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="admin-section-title">Рецепт по шагам</div>

      <el-row>
        <el-col :md="10">
          Добавить изображение шага:
          <el-upload
            class="step-thumbnail"
            drag
            action
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drop file here or
              <em>click to upload</em>
            </div>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
          </el-upload>Добавить описание шага:
          <el-input type="textarea" :rows="2" placeholder="Please input" v-model="textarea"></el-input>Добавить время шага: (в минутах)
          <el-input placeholder="Please input" v-model="input" size="small"></el-input>
        </el-col>
        <el-col :md="14"></el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        stats: ""
      },
      author: [],
      ingrs: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss">
.create-recipe-page {
}
</style>

