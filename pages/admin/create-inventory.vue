<template>
  <div class="create-inventory-page">
    <div class="admin-page-title">Создать инвентарь</div>
    <el-form
      :model="inventory"
      label-position="top"
      class="inventory-form"
      ref="inventoryForm"
      :rules="rules"
      @submit.native.prevent="createInventory"
    >
      <el-form-item label="Добавить изображение инвентаря">
        <el-upload
          class="inventory-uploader"
          action
          :show-file-list="false"
          :on-success="handleInventorySuccess"
          :before-upload="beforeInventoryUpload"
        >
          <img v-if="inventory.thumbnail" :src="inventory.thumbnail" class="inventory" />
          <i v-else class="el-icon-plus inventory-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="Название инвентаря" prop="name">
        <el-input
          v-model="inventory.name"
          autocomplete="off"
          placeholder="Введите название"
          :disabled="loading"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button>Очистить форму</el-button>
        <el-button type="success" native-type="submit" :disabled="loading">Создать инвентарь</el-button>
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
      inventory: {
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
    handleInventorySuccess(res, file) {
      const storageRef = fs.ref("inventory/" + file.name);
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
            this.inventory.thumbnail = downloadURL;
          });
        }
      );
    },
    beforeInventoryUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Thumbnail picture size can not exceed 2MB!");
      }
      return isLt2M;
    },
    createInventory() {
      this.$refs.inventoryForm.validate(async valid => {
        if (valid && this.inventory.thumbnail) {
          this.loading = true;

          const formData = this.inventory;

          try {
            await this.$store.dispatch("inventory/createInventory", formData);
            this.inventory = { thumbnail: "" };
            this.$message.success("инвентарь добавлен!");
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
.create-inventory-page {
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
  .inventory-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 275px;
    height: 275px;
    line-height: 275px;
    text-align: center;
  }
  .inventory {
    width: 275px;
    height: 275px;
    display: block;
  }
}
</style>
