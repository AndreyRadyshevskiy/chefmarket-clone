<template>
  <div class="login-form">
    <el-dialog
      width="600px"
      title="Вход / Регистрация"
      :visible.sync="isVisible"
      @update:visible="closeDialog"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        id="login-form"
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
            round
            native-type="submit"
            :loading="loading"
            :disabled="loading"
          >Вход</el-button>
          <el-button type="success" plain round :disabled="loading">Регистрация</el-button>
        </el-form-item>
      </el-form>
      <el-card v-else>Поздравляем, Пользователь {{ form.email }} успешно зарегистрирован!</el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {
      isVisible: this.visible,
      loading: false,
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
    }
  },
  // watch: {
  //   isAuthenticated(value) {
  //     if (value) {

  //     }
  //   }
  // },
  methods: {
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
              email: this.form.email,
              password: this.form.password,
              returnSecureToken: true
            });
            this.loading = false;
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
.par {
  color: black;
}
</style>
