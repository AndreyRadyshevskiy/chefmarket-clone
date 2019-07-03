<template>
  <div class="navbar" ref="navbar">
    <div class="container">
      <div class="navbar-inner">
        <nuxt-link to="/">
          <img src="~/assets/img/logo.svg" class="navbar-logo">
        </nuxt-link>
        <nav class="main-nav" v-if="!login">
          <nuxt-link to="/menu">Меню</nuxt-link>
          <nuxt-link to="/how-it-works">Как это работает</nuxt-link>
          <nuxt-link to="/blog">
            Блог о вкусном
            <img src="~/assets/img/icons/link.svg">
          </nuxt-link>
        </nav>
        <nav class="main-nav" v-else>
          <a href>Меню</a>
          <a href>Подписки</a>
          <a href>Заказы</a>
        </nav>
        <!-- <div class="login" @click="login=!login">
          <span>Войти</span>
        </div>
        <div class="register" @click="login=!login">
          <span>Зарегистрироваться</span>
        </div>-->
        <template v-if="isAuthenticated">
          <button class="login">{{ user.email }}</button>
        </template>
        <template v-else>
          <button class="login" @click="loginModalVisible = true">Войти</button>
        </template>
        <img src="~/assets/img/icons/menu_bars.svg" class="menu-bars" @click="toggleMobileMenu">
      </div>
      <MobileMenu v-show="mobileMenuVisible"/>
      <LoginForm v-if="loginModalVisible" :visible.sync="loginModalVisible"/>
    </div>
  </div>
</template>

<script>
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
import MobileMenu from "@/components/Header/MobileMenu";
import LoginForm from "@/components/Header/LoginForm";
import { mapGetters } from "vuex";

export default {
  components: {
    MobileMenu,
    LoginForm
  },
  data() {
    return {
      login: false,
      mobileMenuVisible: false,
      loginModalVisible: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      isAuthenticated: "auth/isAuthenticated"
    })
  },
  methods: {
    toggleMobileMenu() {
      if (!this.mobileMenuVisible) {
        document.body.style.overflow = "hidden";
        this.mobileMenuVisible = !this.mobileMenuVisible;
        this.$refs.navbar.style.position = "fixed";
      } else {
        document.body.style.overflow = "visible";
        this.mobileMenuVisible = !this.mobileMenuVisible;
        this.$refs.navbar.style.position = "relative";
      }
    }
  }
};
</script>

<style lang="scss">
.navbar {
  @include respond(tab-port) {
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.26);
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    z-index: 9999;
  }
  .container {
    width: 100%;
    max-width: 126rem;
    padding: 0;
  }
  .navbar-inner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 7.2rem;
    padding: 0 2rem;
    background: #fff;
  }
  .navbar-logo {
    display: block;
    height: 5rem;
  }
  .main-nav {
    @include respond(tab-port) {
      display: none;
    }
    a {
      display: inline-block;
      padding: 1rem;
      color: #333;
      margin-right: 2rem;
      transition: color 0.2s ease-in;

      &:hover {
        color: #999;
      }
    }
  }
  .login {
    border: none;
    background-color: #fff;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    outline: none;

    @include respond(tab-port) {
      display: none;
    }
  }
  .menu-bars {
    display: none;
    cursor: pointer;
    padding: 1rem;

    @include respond(tab-port) {
      display: block;
    }
  }
}
</style>

