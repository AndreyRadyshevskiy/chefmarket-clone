<template>
  <div class="admin-chefs-page">
    <h2>Шеф-повара</h2>
    <div class="admin-chefs-content">
      <main class="chef-details">
        Информация
        <div class="chef-details-inner">
          <div class="chef-image"></div>
          <div class="chef-info">
            <div class="chef-name">Пидор</div>
            <div
              class="chef-about"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aliquam quis labore recusandae dignissimos, corrupti maiores, architecto est, quod minus quo. Nihil, at aut. Soluta accusantium sit adipisci atque nam!</div>
          </div>
          <div class="chef-quote">Нет ничего более честного, чем любовь к хорошей еде!</div>
        </div>
        <el-button type="success">Редактировать</el-button>
        <el-button type="danger">Удалить</el-button>
      </main>
      <aside class="chef-aside">
        Список
        <el-button type="info" @click="dialogFormVisible=true">
          Добавить шефа
          <i class="el-icon-plus"></i>
        </el-button>
        <el-input placeholder="Please input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <ul class="chef-list">
          <li>Пидор Васечкин</li>
          <li>Гаяз Пидорасов</li>
          <li>Ильяс Хуепердыш</li>
        </ul>
      </aside>
    </div>
    <!-- <el-button type="text" @click="dialogFormVisible = true">open a Form nested Dialog</el-button> -->

    <el-dialog title="Добавить нового шефа" :visible.sync="dialogFormVisible">
      <el-form :model="chef" label-position="top" class="chef-form" ref="chefForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Добавить Аватар">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="Имя">
              <el-input v-model="chef.name" autocomplete="off" placeholder="Введите имя"></el-input>
            </el-form-item>

            <el-form-item label="Информация">
              <el-input
                type="textarea"
                v-model="chef.info"
                :rows="4"
                placeholder="Информация о шефе"
              ></el-input>
            </el-form-item>

            <el-form-item label="Цитата">
              <el-input type="textarea" v-model="chef.quote" :rows="4" placeholder="Введите цитату"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button type="success" @click="dialogFormVisible = false">Ок</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      chef: {
        name: "",
        info: "",
        quote: "",
        avatar: null
      },
      dialogFormVisible: false,
      imageUrl: null
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.chef.avatar = URL.createObjectURL(file.raw);
      console.log(this.chef.avatar);
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
.admin-chefs-page {
  .admin-chefs-content {
    display: flex;
  }
  .chef-info {
    width: 90rem;
  }
  .chef-form {
    padding: 2rem;
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

