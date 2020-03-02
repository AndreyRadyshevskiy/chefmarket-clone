<template>
  <div class="contacts-page">
    <div class="header">
      <h1 class="section-title">Контакты</h1>
    </div>
    <div class="body">
      <div class="container">
        <div class="contacts">
          <div class="contact">
            <div class="link-box">
              <a href="tel:+74953746132" class="bold">+7 (495) 374-61-32</a>
            </div>
            <span class="text">Москва, Московская область</span>
          </div>
          <div class="contact">
            <span class="bold">service@chefmarket.ru</span>
            <span class="text">для комментариев по поводу заказов и качества сервиса</span>
          </div>
          <div class="contact">
            <div class="link-box">
              <a href="tel:+78124072473" class="bold">+7 (812) 407-24-73</a>
            </div>
            <span class="text">Санкт-Петербург</span>
          </div>
          <div class="contact">
            <span class="bold">info@chefmarket.ru</span>
            <span class="text">для предложений по сотрудничеству</span>
          </div>
          <div class="contact">
            <div class="link-box">
              <a href="tel:+88003332632" class="bold">8 (800) 333-26-32</a>
            </div>
            <span class="text">Бесплатно из всех городов России</span>
          </div>
          <div class="contact">
            <div class="link-box">
              <a
                href="https://api.whatsapp.com/send?phone=+79060609174"
                class="bold"
              >+7 (906) 060-91-74</a>
            </div>
            <span class="text">WhatsApp</span>
          </div>
        </div>

        <no-ssr>
          <yandex-map :coords="[55.62778806912432, 37.63172999999997]" :zoom="9" :controls="[]">
            <ymap-marker
              marker-id="123"
              :coords="[55.62778806912432, 37.63172999999997]"
              hint-content="Самовывоз в Москве"
              :balloon-template="balloonTemplate"
            />
          </yandex-map>
        </no-ssr>

        <p class="info-title">Юридическая информация</p>
        <div class="contacts">
          <div class="contact">
            <p class="bold">ООО "Шеф Маркет"</p>
            <div class="law-info">
              <div class="law-info-block">
                <p class="text">ИНН</p>
                <p class="text">ОГРН</p>
                <p class="text">КПП</p>
                <p class="text">ОКПО</p>
              </div>
              <div class="law-info-block">
                <p class="text">7715905723</p>
                <p class="text">1127746129477</p>
                <p class="text">72401001</p>
                <p class="text">38369469</p>
              </div>
            </div>
          </div>
          <div class="contact">
            <p class="bold">Юридический адрес</p>
            <p class="text">115516, г. Москва, бульвар Кавказский, дом 57, здание 20</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  components: { yandexMap, ymapMarker },
  computed: {
    balloonTemplate() {
      return "<p>г. Москва, Кавказский бульвар 57, стр.20</p>";
    }
  }
};
</script>

<style lang="scss">
.contacts-page {
  .header {
    padding: 4rem 0 6rem 0;
    background-color: #fcfcfc;
  }
  .body {
    padding-top: 4rem;
    background-color: #f9f9f9;
  }
  .contacts {
    width: 90rem;
    margin: 0 auto;
    display: grid;
    grid-auto-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
  .bold {
    color: #333;
    font-size: 2rem;
    font-weight: bold;
    line-height: 4.2rem;
  }
  .text {
    font-size: 1.4rem;
  }
  .contact {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
  }
  .ymap-container {
    width: 105rem;
    height: 30rem;
    margin-bottom: 6rem;
  }
  .info-title {
    width: 90rem;
    margin: 0 auto 4rem auto;
    font-size: 2rem;
    font-family: "RegalBlack", sans-serif;
  }
  .law-info {
    display: flex;
  }
  .law-info-block {
    margin-right: 2rem;
    .text {
      margin-bottom: 1rem;
    }
  }
}
</style>
