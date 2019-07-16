<template>
  <div class="post-create-page">
    <h2>Создать пост</h2>
    <el-form
      @submit.native.prevent="createPost"
      :model="post"
      :rules="rules"
      ref="form"
      label-position="top"
    >
      <el-row :gutter="30" type="flex">
        <el-col :span="12">
          <el-form-item label="Заголовок поста" prop="title">
            <el-input v-model="post.title" placeholder="Введите заголовок" @blur="saveTitle" />
          </el-form-item>
          <no-ssr>
            <vue-editor
              useCustomImageHandler
              @imageAdded="handleImageAdded"
              @blur="saveEditorContent"
              v-model="post.content"
            ></vue-editor>
          </no-ssr>
          <el-form-item>
            <el-button @click="preview=true" type="success" plain round>Предпросмотр</el-button>
            <el-button @click="clearContent" type="success" plain round>Очистить содержимое</el-button>
            <el-button
              type="success"
              round
              native-type="submit"
              :loading="loading"
              :disabled="loading"
            >Создать Пост</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Добавить Тэги" prop="tags">
            <el-input v-model="tag" placeholder="Тэги поста" ref="tagInput">
              <el-button slot="append" icon="el-icon-plus" @click="addTag"></el-button>
            </el-input>

            <el-button
              class="tag-button"
              v-for="(tag, index) in this.post.tags"
              :key="index"
              size="small"
              plain
              @click="removeTag"
            >
              {{tag}}
              <i class="el-icon-close"></i>
            </el-button>
          </el-form-item>
          <el-form-item label="Добавить Категорию" prop="category">
            <el-select v-model="post.category" placeholder="Select">
              <el-option v-for="(category, index) in categories" :key="index" :value="category"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Добавить изображение">
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
          </el-form-item>
        </el-col>
      </el-row>

      <el-dialog :visible.sync="preview">
        <div class="ql-editor" v-html="post.content"></div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { fs } from "@/plugins/firebase";
import { mapGetters } from "vuex";
import slugify from "slugify";
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
      loading: false,
      post: {
        title: "",
        date: "",
        author: "chefmarket",
        rating: "",
        tags: [],
        thumbnail: null,
        category: "Все",
        content: "<h1>Some initial content</h1>"
      },
      tag: "",
      preview: false,
      rules: {
        title: [
          {
            required: true,
            message: "Пожалуйста, введите название поста",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "Пожалуйста, выберите категорию",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    categories() {
      return this.$store.getters["posts/getCategories"];
    }
  },
  mounted() {
    if (localStorage.editorContent) {
      this.post.content = localStorage.editorContent;
    }
    if (localStorage.getItem("tags")) {
      try {
        this.post.tags = JSON.parse(localStorage.getItem("tags"));
      } catch (e) {
        localStorage.removeItem("tags");
      }
    }
    if (localStorage.title) {
      this.post.title = localStorage.title;
    }
  },
  methods: {
    clearContent() {
      localStorage.removeItem("title");
      localStorage.removeItem("tags");
      localStorage.removeItem("editorContent");
      location.reload();
    },
    addTag() {
      let tag = this.$refs.tagInput.value;
      if (tag) {
        tag = "#" + tag;
        this.post.tags.push(tag);
        this.tag = "";
        this.saveTags();
      }
    },
    removeTag(event) {
      let tag = event.currentTarget.textContent.trim();
      this.post.tags = this.post.tags.filter(el => el != tag);
      this.saveTags();
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
    saveEditorContent() {
      localStorage.editorContent = this.post.content;
    },
    saveTags() {
      const parsed = JSON.stringify(this.post.tags);
      localStorage.setItem("tags", parsed);
    },
    saveTitle() {
      localStorage.title = this.post.title;
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
    createPost() {
      this.$refs.form.validate(async valid => {
        if (valid && this.post.thumbnail) {
          this.loading = true;
          try {
            const formData = {
              title: this.post.title,
              content: this.post.content,
              category: this.post.category,
              tags: this.post.tags,
              thumbnail: this.post.thumbnail,
              date: new Date().toLocaleDateString(),
              author: this.post.author,
              slug: slugify(this.post.title, { lower: true })
            };
            console.log(formData);
            await this.$store.dispatch("posts/createPost", formData);

            this.$refs.upload.clearFiles();
            this.$message.success("Пост создан");
          } catch (err) {
            console.log(err);
          } finally {
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
  .ql-container {
    margin-bottom: 5rem;
  }
  .ql-editor {
    font-family: "LatoWeb";
    img {
      width: 100%;
      height: auto;
    }
  }
  .tag-button {
    margin-right: 10px;
    margin-left: 0;
  }
  .el-select,
  .el-upload--text,
  .el-upload-dragger {
    width: 100%;
  }
}
</style>

