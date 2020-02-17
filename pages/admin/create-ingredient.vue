<template>
  <div class="create-ingredient-page">
    <div class="admin-page-title">Создать ингредиент</div>
    <el-form
      :model="ingredient"
      label-position="top"
      class="ingredient-form"
      ref="ingredientForm"
      :rules="rules"
      @submit.native.prevent="createIngredient"
    >
      <el-form-item label="Добавить изображение ингредиента">
        <el-upload
          class="ingredient-uploader"
          action
          :show-file-list="false"
          :on-success="handleIngredientSuccess"
          :before-upload="beforeIngredientUpload"
        >
          <img v-if="ingredient.thumbnail" :src="ingredient.thumbnail" class="ingredient" />
          <i v-else class="el-icon-plus ingredient-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="Название ингредиента" prop="name">
        <el-input
          v-model="ingredient.name"
          autocomplete="off"
          placeholder="Введите название"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Срок годности" prop="expires">
        <el-input
          v-model="ingredient.expires"
          autocomplete="off"
          placeholder="Введите срок годности"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Условия хранения" prop="conditions">
        <el-input
          v-model="ingredient.conditions"
          autocomplete="off"
          placeholder="Введите условия хранения"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Пищевая ценность" prop="energy">
        <el-input
          v-model="ingredient.energy"
          autocomplete="off"
          placeholder="Введите пищевую ценность"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Энергетическая ценность" prop="kkal">
        <el-input
          v-model="ingredient.kkal"
          autocomplete="off"
          placeholder="Введите энергетическую ценность"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Изготовитель" prop="manufacturer">
        <el-input
          v-model="ingredient.manufacturer"
          autocomplete="off"
          placeholder="Введите производителя"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Страна производства" prop="origin">
        <el-input
          v-model="ingredient.origin"
          autocomplete="off"
          placeholder="Введите страну производства"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Изготовлено по" prop="standard">
        <el-input
          v-model="ingredient.standard"
          autocomplete="off"
          placeholder="Введите стандарт"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Бренд" prop="brand">
        <el-input
          v-model="ingredient.brand"
          autocomplete="off"
          placeholder="Введите название Бренда"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Состав" prop="consist">
        <el-input
          type="textarea"
          v-model="ingredient.consist"
          :rows="4"
          placeholder="Введите состав"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item label="Дополнительно" prop="info">
        <el-input
          type="textarea"
          v-model="ingredient.info"
          :rows="4"
          placeholder="Введите дополнительную информацию"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button>Очистить форму</el-button>
        <el-button type="success" native-type="submit" :disabled="loading">Создать ингридиент</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fs } from "@/plugins/firebase";

export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      ingredient: {
        thumbnail: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Пожалуйста, введите имя",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleIngredientSuccess(res, file) {
      const storageRef = fs.ref("ingredients/" + file.name);
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
            this.ingredient.thumbnail = downloadURL;
          });
        }
      );
    },
    beforeIngredientUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Thumbnail picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Thumbnail picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
    createIngredient() {
      this.$refs.ingredientForm.validate(async valid => {
        if (valid && this.ingredient.thumbnail) {
          this.loading = true;
          this.ingredient.name = this.ingredient.name.toLowerCase();
          const formData = this.ingredient;

          try {
            await this.$store.dispatch(
              "ingredients/createIngredient",
              formData
            );
            this.ingredient = { thumbnail: "" };
            this.$message.success("Ингредиент добавлен!");
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
.create-ingredient-page {
  .el-form {
    width: 40%;
  }
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .ingredient-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 275px;
    height: 275px;
    line-height: 275px;
    text-align: center;
  }
  .ingredient {
    width: 275px;
    height: 275px;
    display: block;
  }
}
</style>
