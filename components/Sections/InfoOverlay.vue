<template>
  <div class="info-overlay">
    <p class="info-title">
      Клон сервиса по доставке продуктов с рецептами
      <a
        class="link"
        href="https://chefmarket.ru"
        target="blank"
      >chefmarket.ru</a>
    </p>
    <p>Используемые технологии:</p>
    <ul>
      <li>Frontend: Nuxt.js (Vue.js + SSR)</li>
      <li>Database: Firebase (Firestore)</li>
      <li>Interface: Element UI</li>
      <li>Plugins: Plyr, Awesome Swiper, Яндекс Карты</li>
      <li>Deploy: Heroku</li>
    </ul>
    <p>
      Функционал: авторизация, основные разделы сайта, блог, админ панель,
      заказы(в процессе разработки)
    </p>
    <p>Desktop version only. Из адаптива только мобильное меню</p>
    <p>
      Github:
      <a href="https://bit.ly/2VVFNA6" class="link" target="blank">https://bit.ly/2VVFNA6</a>
    </p>
    <div class="btn-box">
      <nuxt-link to="/admin" class="btn btn-transparent">Вход в Админ панель</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.info-overlay {
  position: absolute;
  top: 7rem;
  right: 7rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 10px;

  p,
  ul {
    margin-bottom: 1rem;
  }
  li {
    padding-left: 1rem;
  }
  .info-title,
  .info-title a {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .btn-box {
    text-align: center;
    padding: 2rem 0;
  }
}
</style>
