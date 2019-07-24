<template>
  <div class="admin-chefs-page">
    <h2 class="admin-page-title">Шеф-повара</h2>
    <el-container>
      <main class="chef-details">
        <div class="chef-title">Информация</div>
        <el-row :gutter="20" class="mb6">
          <el-col :md="7">
            <div
              class="chef-avatar avatar"
              :style="{backgroundImage: 'url('+ activeChef.avatar +')'}"
            ></div>
          </el-col>
          <el-col :md="17">
            <div class="chef-name">{{activeChef.name}}</div>
            <div class="chef-about">{{activeChef.info}}</div>
            <div class="chef-quote">{{activeChef.quote}}</div>
          </el-col>
        </el-row>
        <el-button type="success" @click="editChef">Редактировать</el-button>
        <el-button type="danger" @click="deleteChef">Удалить</el-button>
      </main>
      <el-aside width="400px" :style="{padding: '4rem'}">
        <div class="chef-title">Список</div>
        <el-button
          type="success"
          @click="dialogFormVisible=true"
          size="medium"
          class="mb4"
        >Добавить шефа</el-button>
        <el-input
          placeholder="Искать шефа"
          v-model="searchChef"
          class="chef-search"
          suffix-icon="el-icon-search"
        />
        <ul class="chef-list" @click="setActiveChef">
          <li
            v-for="(chef, index) in filteredChefs"
            :key="index"
            class="chef-list-item"
          >{{chef.name}}</li>
        </ul>
      </el-aside>
    </el-container>

    <el-dialog title="Добавить нового шефа" :visible.sync="dialogFormVisible">
      <el-form
        :model="chef"
        label-position="top"
        class="chef-form"
        ref="chefForm"
        :rules="rules"
        @submit.native.prevent="createChef"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Добавить Аватар">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="chef.avatar" :src="chef.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="Имя" prop="name">
              <el-input v-model="chef.name" autocomplete="off" placeholder="Введите имя"></el-input>
            </el-form-item>

            <el-form-item label="Информация" prop="info">
              <el-input
                type="textarea"
                v-model="chef.info"
                :rows="4"
                placeholder="Информация о шефе"
              ></el-input>
            </el-form-item>

            <el-form-item label="Цитата" prop="quote">
              <el-input type="textarea" v-model="chef.quote" :rows="4" placeholder="Введите цитату"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :style="{textAlign: 'right'}">
          <el-button @click="dialogFormVisible = false">Отмена</el-button>
          <el-button type="success" native-type="submit" :loading="loading" :disabled="loading">Ок</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fs, db } from "@/plugins/firebase";
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      isEditing: false,
      searchChef: "",
      chef: {
        name: "",
        info: "",
        quote: "",
        avatar: ""
      },
      activeChef: null,
      dialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: "Пожалуйста, введите имя",
            trigger: "blur"
          }
        ],
        info: [
          {
            required: true,
            message: "Пожалуйста, введите описание",
            trigger: "blur"
          }
        ],
        quote: [
          {
            required: true,
            message: "Пожалуйста, введите цитату",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.activeChef = this.chefs[0];
  },
  mounted() {
    db.collection("chefs").onSnapshot(snapshot => {
      if (snapshot.docChanges().length !== 1) return;
      snapshot.docChanges().forEach(change => {
        const chef = Object.assign({ uid: change.doc.id }, change.doc.data());
        if (change.type === "added") {
          this.$store.commit("chefs/addChef", { chef });
          this.activeChef = chef;
        }
        if (change.type === "modified") {
          this.$store.commit("chefs/updateChefs", { chef });
          this.activeChef = chef;
        }
      });
    });
  },
  computed: {
    chefs() {
      return this.$store.getters["chefs/getChefs"];
    },
    filteredChefs() {
      return this.chefs.filter(chef => {
        return chef.name.toLowerCase().includes(this.searchChef.toLowerCase());
      });
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      const storageRef = fs.ref("chefs/" + file.name);
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
            this.chef.avatar = downloadURL;
          });
        }
      );
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
    createChef() {
      this.$refs.chefForm.validate(async valid => {
        if (valid && this.chef.avatar) {
          this.loading = true;
          try {
            const formData = {
              activeChef: this.activeChef.uid,
              name: this.chef.name,
              info: this.chef.info,
              quote: this.chef.quote,
              avatar: this.chef.avatar
            };

            if (!this.isEditing) {
              await this.$store.dispatch("chefs/createChef", formData);
              this.$message.success("Шеф добавлен!");
              this.dialogFormVisible = false;
            } else {
              await this.$store.dispatch("chefs/updateChef", formData);
              this.$message.success("Информация о шефе обновлена!");
              this.isEditing = false;
              this.dialogFormVisible = false;
            }
          } catch (err) {
            console.log(err);
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Заполните все поля и добавьте изображение");
        }
      });
    },
    editChef() {
      this.dialogFormVisible = true;
      this.chef.name = this.activeChef.name;
      this.chef.info = this.activeChef.info;
      this.chef.quote = this.activeChef.quote;
      this.chef.avatar = this.activeChef.avatar;
      this.isEditing = true;
    },
    setActiveChef(event) {
      if (event.target.classList.contains("chef-list-item")) {
        const activeChef = this.chefs.find(chef => {
          return chef.name.trim() == event.target.textContent;
        });
        this.activeChef = activeChef;
      }
    },
    deleteChef() {
      const id = this.activeChef.uid;

      this.$confirm(
        `Вы действительно хотите удалить ${this.activeChef.name}?`,
        {
          confirmButtonText: "OK",
          cancelButtonText: "Отмена",
          type: "warning"
        }
      )
        .then(async () => {
          try {
            await this.$store.dispatch("chefs/deleteChef", id);
          } catch (err) {
            console.log(err);
          }
          this.$message({
            type: "success",
            message: "Удаление выполнено"
          });
          location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Удаление отменено"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.admin-chefs-page {
  .chef-search {
    width: 80%;
    margin-bottom: 2rem;
  }
  .chef-details {
    width: 100%;
    padding: 4rem;
  }
  .chef-title {
    font-size: 2.4rem;
    margin-bottom: 4rem;
  }
  .chef-name {
    font-size: 2.4rem;
    font-weight: 900;
    margin-bottom: 2rem;
  }
  .chef-about {
    margin-bottom: 4rem;
  }
  .chef-form {
    padding: 2rem;
  }
  .chef-list-item {
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 1rem;
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 275px;
    height: 275px;
    line-height: 275px;
    text-align: center;
  }
  .avatar {
    width: 275px;
    height: 275px;
    display: block;
  }
}
</style>

