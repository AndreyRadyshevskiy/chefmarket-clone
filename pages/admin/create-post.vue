<template>
  <div class="post-create-page">
    <h2>Создать пост</h2>
    <el-form>
      <el-row :gutter="30" type="flex">
        <el-col :span="12">
          <el-form-item label="Заголовок поста" prop="title">
            <el-input v-model="post.title" placeholder="Введите заголовок"/>
          </el-form-item>
          <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="post.content"></vue-editor>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Добавить Тэги" prop="tags">
            <el-input @keyup.native.188="addTag" v-model="tag" placeholder="Тэги поста"/>
          </el-form-item>
          <el-form-item label="Добавить Категорию" prop="category">
            <el-input v-model="post.category" placeholder="Категория"/>
          </el-form-item>

          <el-upload
            ref="upload"
            drag
            action
            :on-change="handleThumbnailAdded"
            :on-remove="deleteImage"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Перетащите картинку
              <em>или нажмите</em>
            </div>
            <div class="el-upload__tip" slot="tip">Файлы с расширением jpg/png</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="preview=true" type="success" round>Предпросмотр</el-button>
        <el-button type="success" plain round>Создать Пост</el-button>
      </el-form-item>

      <el-dialog :visible.sync="preview">
        <div class="ql-editor" v-html="post.content"></div>

        <!-- <el-card :data="gridData">
          <el-table-column property="date" label="Date" width="150"></el-table-column>
          <el-table-column property="name" label="Name" width="200"></el-table-column>
          <el-table-column property="address" label="Address"></el-table-column>
        </el-table>-->
      </el-dialog>
      <!-- <el-form-item>
        <el-button
          type="success"
          round
          native-type="submit"
          :loading="loading"
          :disabled="loading"
        >Вход</el-button>
        <el-button type="success" plain round :disabled="loading">Регистрация</el-button>
      </el-form-item>-->
    </el-form>

    <!-- <div class="post-create-page-inner">
      <el-form :model="post" ref="postForm" @submit.native.prevent="createPost">
        <el-form-item label="Добавить Тэги" prop="tags">
          <el-input @keyup.native.188="addTag" v-model="post.tags" placeholder="Тэги поста"/>
    </el-form-item>-->

    <!-- <el-form-item label="Пароль" prop="password" class="mb6">
          <el-input :disabled="loading" v-model="form.password" type="password" show-password/>
    </el-form-item>-->

    <!-- <el-form-item>
          <el-button
            type="success"
            class="login-button"
            round
            native-type="submit"
            :loading="loading"
            :disabled="loading"
          >Вход</el-button>
          <el-button
            @click="switchTabs"
            class="login-button"
            type="success"
            plain
            round
            :disabled="loading"
          >Регистрация</el-button>
    </el-form-item>-->
    <!-- </el-form>
    </div>-->
    <p>{{post.content}}</p>
  </div>
</template>

<script>
import { fs } from "@/plugins/firebase";
let VueEditor;

if (process.client) {
  VueEditor = require("vue2-editor").VueEditor;
}

export default {
  layout: "admin",
  components: {
    VueEditor
  },
  data() {
    return {
      post: {
        date: "",
        author: "",
        rating: "",
        tags: [],
        thumbnail: null,
        category: "",
        content: "<h1>Some initial content</h1>"
      },
      tag: "",
      preview: false,
      rules: {
        title: [
          {
            required: true,
            message: "Пожалуйтса, введите название поста",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "Пожалуйтса, выберите категорию",
            trigger: "blur"
          }
        ],
        tags: [
          {
            required: true,
            message: "Пожалуйтса, добавьте тэги",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    addTag() {
      this.post.tags.push(this.tag);
      this.tag = "";
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // this.image = file.raw;

      const storageRef = fs.ref("posts/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful upload
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            // this.post.image = downloadURL;
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          });
        }
      );
    },
    handleThumbnailAdded(file) {
      const storageRef = fs.ref("posts/" + file.name);
      let uploadTask = storageRef.put(file.raw);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful upload
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            this.post.thumbnail = downloadURL;
          });
        }
      );
    },
    deleteImage(img) {
      let image = fs.refFromURL(img);
      console.log(image);
      image
        .delete()
        .then(function() {
          console.log("image deleted");
        })
        .catch(function(error) {
          console.log(error.message);
        });
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.post.image) {
          this.loading = true;
          try {
            await this.$store.dispatch("auth/authenticateUser", {
              title: this.post.title,
              content: this.post.content,
              image: this.post.image
            });
            this.$refs.upload.clearFiles();
            this.loading = false;
          } catch (err) {
            console.error(err);
            if (err.response.status === 400) {
              this.errorText = "Пользователь с таким email уже существует!";
            }
            this.loading = false;
          }
        } else {
          this.$message.warning("Форма не валидна");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.post-create-page {
  h2 {
    margin-bottom: 4rem;
  }
  .post-details {
    width: 30rem;
  }

  .ql-editor {
    font-family: "LatoWeb";
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>

