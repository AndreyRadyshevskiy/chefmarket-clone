<template>
  <nav class="mobile-menu" ref="mobileMenu">
    <div class="mobile-menu-inner">
      <div class="region">
        <div class="region-select" @click="toggleRegionMenu">
          <span>Ваш регион доставки:</span>
          <span class="region-selected">{{ region }}</span>
          <span
            class="expand-arrow-green"
            :class="{ rotate: regionMenuIsOpen }"
          ></span>
        </div>
        <ul class="region-items" @click="setRegion" v-show="regionMenuIsOpen">
          <li
            class="region-item"
            v-for="(region, index) in this.$store.state.region.regionArr"
            :key="index"
          >
            {{ region.name }}
          </li>
        </ul>
      </div>
      <div class="line" v-show="!regionMenuIsOpen"></div>
      <div class="menu-items">
        <nuxt-link to="/menu" class="menu-item">Меню</nuxt-link>
        <nuxt-link to="/how-it-works" class="menu-item"
          >Как это работает</nuxt-link
        >
        <nuxt-link to="/blog" class="menu-item">Блог о вкусном</nuxt-link>
        <nuxt-link to="/" class="menu-item">
          Готовая еда
          <img src="~/assets/img/icons/link.svg" />
        </nuxt-link>
        <div class="menu-item" @click="login = !login">Войти</div>
      </div>
      <div class="info-block">
        <div class="mobile-contacts">
          <a href="tel:+74953746132" class="mobile-menu-tel"
            >+7 (495) 374-61-32</a
          >
          <span class="text"
            >Вы можете связаться с нами, удобным способом:</span
          >
          <div class="social-contacts">
            <a href class="icon icon-vk"></a>
            <a href class="icon icon-wa"></a>
            <a href class="icon icon-fb"></a>
          </div>
        </div>
        <div class="expandable-menu" @click="toggleSubMenu">
          <div class="line"></div>
          <div class="menu-title">
            <span>О Компании</span>
            <span class="expand-arrow-grey"></span>
          </div>
          <div class="menu-content d-none">
            <nuxt-link to="/how-it-works" class="menu-item"
              >Как это работает?</nuxt-link
            >
            <nuxt-link to="delivery" class="menu-item">Доставка</nuxt-link>
            <nuxt-link to="contacts" class="menu-item">Контакты</nuxt-link>
            <nuxt-link to="reviews" class="menu-item">Отзывы</nuxt-link>
            <nuxt-link to="blog" class="menu-item">Блог</nuxt-link>
          </div>
          <div class="line"></div>
          <div class="menu-title">
            <span>Гарантии Качества</span>
            <span class="expand-arrow-grey"></span>
          </div>
          <div class="menu-content d-none">
            <nuxt-link to="/cooks" class="menu-item">Наши шеф-повара</nuxt-link>
            <nuxt-link to="/suppliers" class="menu-item"
              >Наши поставщики</nuxt-link
            >
            <nuxt-link to="/certificates" class="menu-item"
              >Сертификаты соответствия</nuxt-link
            >
          </div>
          <div class="line"></div>
          <div class="menu-title">
            <span>Клиентам</span>
            <span class="expand-arrow-grey"></span>
          </div>
          <div class="menu-content d-none">
            <nuxt-link to="/feedback" class="menu-item"
              >Обратная связь</nuxt-link
            >
            <nuxt-link to="faq" class="menu-item">Частые вопросы</nuxt-link>
            <nuxt-link to="cashback" class="menu-item">Кэшбек</nuxt-link>
            <nuxt-link to="agreement" class="menu-item"
              >Пользовательское соглашение</nuxt-link
            >
            <nuxt-link to="sitemap" class="menu-item">Карта сайта</nuxt-link>
          </div>
          <div class="line"></div>
        </div>
        <div class="app-links">
          <a href="#" class="app-link">
            <img src="~/assets/img/google-play.svg" />
          </a>
          <a href="#" class="app-link">
            <img src="~/assets/img/app-store.svg" />
          </a>
        </div>
      </div>
      <footer class="mobile-footer">
        <span class="text">Присоединяйтесь к нам в социальных сетях!</span>
        <SocialContacts />
        <span class="text copyright">© 2012–2019 ООО «Шеф Маркет»</span>
      </footer>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import SocialContacts from "@/components/Socials/SocialContacts";

export default {
  components: {
    SocialContacts
  },
  data() {
    return {
      regionMenuIsOpen: false
    };
  },
  computed: {
    ...mapGetters({
      region: "region/getRegion",
      phone: "region/getPhone"
    })
  },
  methods: {
    toggleRegionMenu() {
      this.regionMenuIsOpen = !this.regionMenuIsOpen;
    },
    setRegion(event) {
      const region = event.target.textContent.trim();
      const activeRegionObj = this.$store.state.region.regionArr.find(
        el => el.name == region
      );
      this.$store.commit("region/setActiveRegion", activeRegionObj);
      this.regionMenuIsOpen = false;
    },
    toggleSubMenu(event) {
      const el = event.target.closest(".menu-title");
      if (el) {
        el.nextElementSibling.classList.toggle("d-none");
        el.querySelector(".expand-arrow-grey").classList.toggle("rotate");
      }
      if (event.target.classList.contains("menu-item")) {
        this.toggleMobileMenu();
      }
    }
  }
};
</script>

<style lang="scss">
.mobile-menu {
  display: none;

  @include respond(tab-port) {
    display: block;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .mobile-menu-inner {
    width: 100%;
    height: 100%;
    border-top: 2px solid #ebebeb;
  }
  .line {
    height: 2px;
    background: #ebebeb;
    margin: 0 2rem 1rem;
  }
  .region {
    cursor: pointer;

    .region-select {
      display: flex;
      padding: 3rem 2rem;
      align-items: center;
      color: #333;
      line-height: 2.4rem;

      span:first-child {
        margin-right: 4px;
      }
    }
    .region-selected {
      margin-right: auto;
    }
    .expand-arrow-green {
      margin: 0;
    }
    .region-items {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 3.6rem;
      padding-bottom: 2rem;
    }
    .region-item {
      padding: 0 2rem;

      &:hover {
        color: #fff;
        background: #59b958;
      }
    }
  }
  .menu-items {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
  }
  .menu-item {
    color: #333;
    font-size: 1.6rem;
    line-height: 4.5rem;
    padding: 0 2rem;

    &:hover {
      color: #fff;
      background: #59b958;
    }
  }
  .info-block {
    background: #f9f9f9;
    padding: 2rem 0;
  }
  .mobile-contacts {
    padding: 0 2rem;
  }
  .mobile-menu-tel {
    display: block;
    font-size: 1.8rem;
    font-weight: 900;
    color: #333;
    margin-bottom: 1rem;
  }
  .text {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 2.4rem;
    color: #7f7f7f;
    margin-bottom: 1rem;
  }
  .social-contacts {
    .icon {
      margin-right: 1.5rem;
      margin-left: 0.5rem;
    }
  }
  .expandable-menu {
    margin: 3rem 0;

    .line {
      margin-bottom: 0;
    }
  }
  .menu-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #7f7f7f;
    padding: 1.4rem 2rem;
    cursor: pointer;
  }
  .menu-content {
    display: flex;
    flex-direction: column;
    background: #eaeaea;
  }
  .app-links {
    display: flex;
    flex-direction: column;

    .app-link {
      width: 17.2rem;
      height: 5.2rem;
      margin-left: 2rem;
      margin-bottom: 2rem;

      img {
        width: 100%;
        height: 100%;
        transition: opacity 0.25s;

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
  .mobile-footer {
    background: #ebebeb;
    text-align: center;

    .text {
      padding: 16px 0;
      margin: 0;
    }
    .social-contacts {
      justify-content: center;
    }
    .text.copyright {
      color: #333;
    }
  }
}
</style>
