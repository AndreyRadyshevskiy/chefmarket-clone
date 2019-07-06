<template>
  <div class="post-create-page">
    <h2>Создать пост</h2>
    <el-form>
      <el-row :gutter="30" type="flex">
        <el-col :span="12">
          <el-form-item label="Заголовок поста" prop="title">
            <el-input v-model="post.title" placeholder="Введите заголовок"/>
          </el-form-item>
          <vue-editor v-model="content"></vue-editor>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Добавить Тэги" prop="tags">
            <el-input @keyup.native.188="addTag" v-model="tag" placeholder="Тэги поста"/>
          </el-form-item>
          <el-upload
            ref="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleImageChange"
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
    <p>{{content}}</p>
  </div>
</template>

<script>
import fb from "@/plugins/firebase";
let VueEditor;

if (process.client) {
  VueEditor = require("vue2-editor").VueEditor;
}

export default {
  layout: "admin",
  middleware: "auth",
  components: {
    VueEditor
  },
  data() {
    return {
      post: {
        tags: [],
        image: null
      },
      tag: "",
      content: "<h1>Some initial content</h1>"
    };
  },
  methods: {
    addTag() {
      this.post.tags.push(this.tag);
      this.tag = "";
    },
    handleImageChange(file, fileList) {
      this.image = file.raw;
      console.log(file);
      try {
        const storageRef = fb.storage().ref("posts/" + file.name);
        storageRef.put(file);
      } catch (err) {
        console.error(err);
      }
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
}
</style>

