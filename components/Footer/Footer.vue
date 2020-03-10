<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer-inner">
        <div class="footer-contacts">
          <a href="tel:74953746132" class="tel">+7 (495) 374-61-32</a>
          <div class="socials">
            <a href="#" class="link link-vk">Сообщение в VK</a>
            <a href="#" class="link link-wa">Написать в Whatsapp</a>
            <a href="#" class="link link-fb">Сообщение в Facebook</a>
          </div>
        </div>
        <div class="footer-main">
          <div class="footer-menu">
            <ul class="menu-column">
              <li class="menu-title">О Компании</li>
              <li>
                <nuxt-link to="/how-it-works" class="menu-link"
                  >Как это работает?</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/mission" class="menu-link">Миссия</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/delivery" class="menu-link">Доставка</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contacts" class="menu-link">Контакты</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reviews" class="menu-link">Отзывы</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/blog" class="menu-link">
                  Блог
                  <img src="~/assets/img/icons/link.svg" class="icon" />
                </nuxt-link>
              </li>
            </ul>
            <ul class="menu-column">
              <li class="menu-title">Гарантии Качества</li>
              <li>
                <nuxt-link to="/true-chef" class="menu-link"
                  >Наши шеф-повара</nuxt-link
                >
              </li>
              <li>
                <a href class="menu-link">Наши поставщики</a>
              </li>
              <li>
                <a href class="menu-link">Сертификаты соответствия</a>
              </li>
            </ul>
            <ul class="menu-column">
              <li class="menu-title">Клиентам</li>
              <li>
                <a href class="menu-link">Обратная связь</a>
              </li>
              <li>
                <a href class="menu-link">Частые вопросы</a>
              </li>
              <li>
                <a href class="menu-link">Кэшбек</a>
              </li>
              <li>
                <a href class="menu-link">Пользовательское соглашение</a>
              </li>
            </ul>
          </div>
          <div class="footer-lower">
            <div class="footer-socials">
              <h5 class="text">Мы в социальных сетях</h5>
              <div class="social-contacts">
                <a href class="icon icon-instagram"></a>
                <a href class="icon icon-vk"></a>
                <a href class="icon icon-fb"></a>
                <a href class="icon icon-youtube"></a>
                <a href class="icon icon-ya"></a>
              </div>
            </div>
            <div class="subscribe">
              <h5 class="text">
                Подпишитесь и получайте рецепты изумительно вкусных блюд!
              </h5>
              <form action class="subscribe-form">
                <input type="email" placeholder="Введите ваш e-mail" />
                <button type="submit">Подписаться</button>
              </form>
            </div>
          </div>
        </div>
        <div class="footer-contacts">
          <div class="apps-title">Приложения</div>
          <a href="#" class="app-link">
            <img src="~/assets/img/google-play.svg" alt />
          </a>
          <a href="#" class="app-link">
            <img src="~/assets/img/app-store.svg" alt />
          </a>
          <div class="copyright-wrapper">
            <p class="copyright">© 2012–2019 ООО «Шеф Маркет»</p>
            <a href class="site-map">Карта сайта</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.app-footer {
  .app-footer-inner {
    padding: 4rem 0;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
  }
  .footer-contacts {
    width: 19.5rem;
    display: flex;
    flex-direction: column;
  }
  .tel {
    display: inline-block;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 900;
    color: #333;
    margin-bottom: 2rem;
  }
  .link-vk {
    background: url("~assets/img/icons/socials/vk-colored.png") no-repeat,
      #5982b5;
  }
  .link-wa {
    background: url("~assets/img/icons/socials/wa-colored.png") no-repeat,
      #5fd25d;
  }
  .link-fb {
    background: url("~assets/img/icons/socials/fb-colored.png") no-repeat,
      #3a5998;
  }
  .link {
    width: 18rem;
    display: block;
    font-size: 1rem;
    color: #fff;
    padding: 1.2rem 0 1.2rem 4rem;
    border-radius: 44px;
    transition: opacity 0.25s;
    margin-bottom: 1.5rem;
    background-size: 4rem 4rem;
    background-position: 0 -3px;

    &:hover {
      opacity: 0.8;
    }
  }
  .footer-main {
    flex-grow: 1;
    padding: 0 5rem;
  }
  .footer-menu {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1.5rem;
  }
  .menu-column:last-of-type {
    padding-right: 4.8rem;
  }
  .menu-title {
    font-size: 1.6rem;
    font-weight: 600;
    padding-bottom: 1.6rem;
  }
  .menu-link {
    font-size: 1.2rem;
    line-height: 2.5rem;
    color: #333;
  }
  .footer-lower {
    padding: 1.5rem 0;
    display: flex;
    justify-content: space-between;

    .text {
      font-size: 1.2rem;
      font-weight: 400;
      color: #c3c3c3;
      margin-bottom: 1.2rem;
    }
    .icon {
      margin-right: 1rem;
    }
  }
  .footer-socials {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;

    .social-contacts {
      margin-top: auto;
    }
  }
  .subscribe-form {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 44px;

    input {
      font-size: 1rem;
      text-transform: uppercase;
      padding: 1.2rem 2rem;
      border: none;
      border-radius: 44px;
      outline: none;

      &::placeholder {
        color: #999;
      }
    }
    button {
      font-size: 1rem;
      color: #fff;
      text-transform: uppercase;
      border: none;
      border-radius: 44px;
      background: #59b958;
      padding: 0 3rem;
      cursor: pointer;
      transition: opacity 0.25s;
      outline: none;

      &:hover {
        opacity: 0.8;
      }
    }
  }
  .apps-title {
    font-weight: 900;
    margin-bottom: 2rem;
  }
  .app-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    transition: opacity 0.25s;

    &:hover {
      opacity: 0.8;
    }
  }
  .copyright-wrapper {
    text-align: center;
    margin-top: auto;
  }
  .copyright {
    font-size: 1rem;
    margin-bottom: 1rem;
    margin-right: 2rem;
  }
  .site-map {
    font-size: 1rem;
    color: #c3c3c3;
    margin-right: 2rem;
  }
}
</style>
