<template>
  <div class="login-form">
    <el-dialog width="600px" :title="title" :visible.sync="isVisible" @update:visible="closeDialog">
      <template v-if="isLoginTab">
        <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent="loginUser">
          <!-- <el-form-item label="Имя" prop="name">
          <el-input :disabled="loading" v-model="form.name"/>
          </el-form-item>-->

          <el-form-item label="E-mail" prop="email">
            <el-input :disabled="loading" v-model="form.email" type="email"/>
          </el-form-item>

          <el-form-item label="Пароль" prop="password" class="mb6">
            <el-input :disabled="loading" v-model="form.password" type="password" show-password/>
          </el-form-item>

          <el-form-item>
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
          </el-form-item>
        </el-form>
      </template>

      <template v-else>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          @submit.native.prevent="registerUser"
          v-if="!isAuthenticated"
        >
          <!-- <el-form-item label="Имя" prop="name">
          <el-input :disabled="loading" v-model="form.name"/>
          </el-form-item>-->

          <el-form-item label="E-mail" prop="email">
            <el-input :disabled="loading" v-model="form.email" type="email"/>
          </el-form-item>

          <el-form-item label="Пароль" prop="password" class="mb6">
            <el-input :disabled="loading" v-model="form.password" type="password" show-password/>
          </el-form-item>

          <el-form-item>
            <el-button
              type="success"
              class="login-button"
              round
              native-type="submit"
              :loading="loading"
              :disabled="loading"
            >Зарегистрироваться</el-button>
            <el-button
              @click="switchTabs"
              class="login-button"
              type="success"
              plain
              round
              :disabled="loading"
            >Вход с паролем</el-button>
          </el-form-item>

          <el-form-item v-if="errorText">
            <p class="error-text">{{ errorText }}</p>
          </el-form-item>
        </el-form>
        <el-card v-else>Поздравляем, Пользователь {{ form.email }} успешно зарегистрирован!</el-card>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {
      isLoginTab: true,
      isVisible: this.visible,
      loading: false,
      errorText: "",
      form: {
        // name: "",
        email: "",
        password: ""
      },
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: "Пожалуйтса, введите имя",
        //     trigger: "blur"
        //   }
        // ],
        email: [
          {
            required: true,
            message: "Пожалуйста, введите email адрес",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Пожалуйтса, введите корректный email адрес",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Пожалуйтса, Введите пароль",
            trigger: "blur"
          },
          {
            min: 6,
            message: "Пароль должен быть не менее 6 символов",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    title() {
      return this.isLoginTab ? "Вход" : "Регистрация";
    }
  },
  // watch: {
  //   isAuthenticated(value) {
  //     if (value) {

  //     }
  //   }
  // },
  methods: {
    switchTabs() {
      this.isLoginTab ? (this.isLoginTab = false) : (this.isLoginTab = true);
    },
    closeDialog() {
      this.$emit("update:visible", false);
    },
    registerUser() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch("auth/authenticateUser", {
              // name: this.form.name,
              action: "register",
              email: this.form.email,
              password: this.form.password,
              returnSecureToken: true
            });
            this.loading = false;
          } catch (err) {
            console.error(err);
            if (err.response.status === 400) {
              this.errorText = "Пользователь с таким email уже существует!";
            }
            this.loading = false;
          }
        }
      });
    },
    loginUser() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch("auth/authenticateUser", {
              // name: this.form.name,
              action: "login",
              email: this.form.email,
              password: this.form.password,
              returnSecureToken: true
            });
            this.loading = false;
            this.closeDialog();
          } catch (err) {
            console.error(err);
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-form {
  .el-dialog__title {
    font-size: 3.6rem;
    font-family: Regal;
    font-weight: 600;
  }
  .el-button--success {
    width: 20rem;
    margin-left: 2rem;
    float: right;
  }

  .el-button--success.is-plain:focus {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
  .error-text {
    color: red;
    text-align: right;
  }
}
</style>
