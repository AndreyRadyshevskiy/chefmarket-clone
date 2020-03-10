<template>
  <div class="how-it-works-page">
    <section class="mission">
      <h1 class="section-title">
        Лучший способ
        <br />готовить еду дома
      </h1>
      <div class="section-subtitle">
        Наша Миссия «Быть для вас надежным поставщиком качественных
        <br />продуктов, готовить которые одно удовольствие».
      </div>
      <nuxt-link to="/mission" class="link">Подробнее о Миссии</nuxt-link>
      <div class="video">
        <no-ssr>
          <vue-plyr>
            <video poster="@/assets/img/hero-banner.jpg" src="@/assets/video/how-it-works.mp4"></video>
          </vue-plyr>
        </no-ssr>
      </div>
    </section>
    <section class="chefs">
      <h2 class="section-title section-title--md mb2">
        Каждую неделю мы создаем
        <br />60 новых рецептов
      </h2>
      <div class="section-subtitle mb2">
        В нашей команде 18 шеф-поваров, технологов и диетологов. Еженедельно
        <br />мы формируем 4 сбалансированных и функциональных меню по 15 блюд в
        каждом.
      </div>
      <div class="container">
        <ChefsThumbsSlider />
      </div>
    </section>
    <section class="dinners">
      <h2 class="section-title section-title--md mb5">
        Вы выбираете меню и блюда, которые
        <br />вам подходят, и оформляете заказ
      </h2>
      <div class="choice-image-box">
        <img src="@/assets/img/choice.jpg" alt="Изображение меню" class="choice-image" />
      </div>
      <div class="btn-group">
        <nuxt-link to="/dinners" class="btn btn-colored">Выбрать меню</nuxt-link>
        <a href="#" class="link">Подробнее о разнице в меню</a>
      </div>
    </section>
    <section class="production">
      <h2 class="section-title section-title--md mb2">
        Мы закупаем продукты, производим
        <br />ингредиенты, собираем заказ
      </h2>
      <div class="production-grid">
        <div class="production-item">
          <nuxt-link to="/">
            <img src="@/assets/img/how-it-works/purchase-1.jpg" class="production-image" />
            <p class="text">
              Наше производство находится в Москве и соответствует всем нормам
              пищевой отрасли
            </p>
          </nuxt-link>
          <nuxt-link to="/" class="link">Подробнее о производстве</nuxt-link>
        </div>
        <div class="production-item">
          <nuxt-link to="/">
            <img src="@/assets/img/how-it-works/purchase-2.jpg" class="production-image" />
          </nuxt-link>
          <nuxt-link to="/" class="link">Подробнее о наших поставщиках</nuxt-link>
        </div>
        <div class="production-item">
          <nuxt-link to="/">
            <img src="@/assets/img/how-it-works/purchase-3.jpg" class="production-image" />
          </nuxt-link>
          <nuxt-link to="/" class="link">Происхождение продуктов</nuxt-link>
        </div>
        <div class="production-item">
          <nuxt-link to="/">
            <img src="@/assets/img/how-it-works/purchase-4.jpg" class="production-image" />
          </nuxt-link>
          <nuxt-link to="/" class="link">Сертификаты соответсвия</nuxt-link>
        </div>
      </div>
    </section>
    <section class="delivery">
      <h2 class="section-title section-title--md mb2">Бесплатно привозим ваш заказ</h2>
      <SelectBox :options="regions" :default-option="0" class="pb4">
        <template v-slot:default="slotProps">
          <div class="section-subtitle" v-if="slotProps.activeOption == 'МОСКВА'">
            Ежедневная бесплатная доставка по Москве и до 60 км от МКАД.
            <br />В удобный для вас интервал времени.
          </div>
          <div class="section-subtitle" v-if="slotProps.activeOption == 'САНКТ-ПЕТЕРБУРГ'">
            Бесплатная доставка по Санкт-Петербургу и до 30 км от города.
            <br />Каждый день, кроме субботы. В удобный для вас интервал времени.
          </div>
          <div class="section-subtitle" v-if="slotProps.activeOption == 'НИЖНИЙ НОВГОРОД'">
            Бесплатная доставка по Нижнему Новгороду и до 30 км от города
            <br />по четвергам и воскресеньям. В удобный для вас интервал времени.
          </div>
        </template>
      </SelectBox>
      <nuxt-link to="/" class="link">Подробнее о доставке</nuxt-link>
      <img
        src="@/assets/img/how-it-works/delivery.jpg"
        alt="Изображение автомобиля доставки"
        class="delivery-image"
      />
    </section>
    <section class="product">
      <h2 class="section-title section-title--md mb2">В нашей коробке продукты и рецепты</h2>
      <div class="section-subtitle mb6">
        Все ингредиенты отдельно упакованы, маркированы в соответствии с ГОСТ и
        ТУ.
        <br />К каждому блюду прилагается фоторецепт.
      </div>
      <div class="unpacking-video-box">
        <video src="@/assets/video/unpacking.mp4" class="unpacking-video" autoplay loop muted></video>
      </div>
    </section>
    <section class="cashback">
      <h2 class="section-title section-title--md mb2">Кешбэк за каждый заказ</h2>
      <div class="section-subtitle mb6">
        Кешбэк начисляется в бонусных рублях,
        <br />которыми можно оплачивать новые заказы.
      </div>
      <div class="cashback-grid">
        <div class="cashback-item">
          <img src="@/assets/img/how-it-works/cashback-1.svg" alt="Кешбек" class="cashback-image" />
          <span class="cashback-text">
            Возвращаем на ваш счет
            <br />до 5% от каждого заказа
          </span>
        </div>
        <div class="cashback-item">
          <img src="@/assets/img/how-it-works/cashback-2.svg" alt="Кешбэк" class="cashback-image" />
          <span class="cashback-text">
            Копить или тратить -
            <br />решать вам
          </span>
        </div>
        <div class="cashback-item">
          <img src="@/assets/img/how-it-works/cashback-3.svg" alt="Кэшбэк" class="cashback-image" />
          <span class="cashback-text">
            Чем больше заказов,
            <br />тем больше кешбэк
          </span>
        </div>
      </div>
      <nuxt-link to="/" class="link">Подробнее о кешбэке</nuxt-link>
    </section>
    <section class="recipes">
      <h2 class="section-title section-title--md mb6">
        Смотрите, как легко готовить
        <br />по нашим рецептам
      </h2>
      <RecipesVideoSlider />
      <nuxt-link to="/dinners" class="btn btn-colored">Выбрать меню</nuxt-link>
    </section>
    <section class="environment">
      <h2 class="section-title section-title--md mb2">
        Пустые коробку и термопакет заберем
        <br />обратно при доставке следующего заказа!
      </h2>
      <div class="section-subtitle mb6">
        Мы заботимся о природе, поэтому отправляем тару на повторное
        <br />использование или переработку. Сдайте коробку и термопакет курьеру
        <br />при следующей доставке и помогите нам сделать мир чище!
      </div>
      <div class="banner">
        <div class="banner-item">
          <span class="lg">37,1</span>
          <span class="md">Тонн Макулатуры</span>
          <span class="sm">сдано всего</span>
        </div>
        <div class="banner-item">
          <span class="lg">4,5</span>
          <span class="md">тонн макулатуры</span>
          <span class="sm">сдано за октябрь 2019</span>
        </div>
        <div class="banner-item">
          <span class="lg">371</span>
          <span class="md">дерево спасли</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ChefsThumbsSlider from "@/components/Sections/ChefsThumbsSlider";
import SelectBox from "@/components/UI/SelectBox";
import RecipesVideoSlider from "@/components/Sections/RecipesVideoSlider";
export default {
  components: {
    ChefsThumbsSlider,
    SelectBox,
    RecipesVideoSlider
  },
  computed: {
    regions() {
      return this.$store.getters["region/getRegions"].map(item =>
        item.name.toUpperCase()
      );
    }
  }
};
</script>

<style lang="scss">
.how-it-works-page {
  .mission {
    text-align: center;
    padding-top: 6rem;
  }
  .video {
    width: 90rem;
    display: block;
    margin: 6rem auto;
  }
  .plyr__control--overlaid,
  .plyr--video .plyr__control.plyr__tab-focus,
  .plyr--video .plyr__control:hover,
  .plyr--video .plyr__control[aria-expanded="true"] {
    background: #59b958;
  }
  .plyr--video .plyr__control.plyr__tab-focus,
  .plyr--video .plyr__control:hover,
  .plyr--video .plyr__control[aria-expanded="true"] {
    background: #59b958;
    color: #fff;
  }
  .plyr__control.plyr__tab-focus {
    box-shadow: 0 0 0 5px rgba(89, 185, 88, 0.5);
  }
  .plyr--full-ui input[type="range"] {
    color: #59b958;
  }
  .slide-image {
    border-radius: 50%;
    height: 29rem;
  }
  .dinners {
    padding-top: 5rem;
    background-color: #f9f9f9;
  }
  .choice-image-box {
    width: 96rem;
    margin: 0 auto;
  }
  .choice-image {
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.21);
  }
  .btn-group {
    padding: 6rem 0;
    text-align: center;

    .btn {
      margin-right: 4rem;
    }
  }
  .production {
    padding: 6rem 0;
  }
  .production-grid {
    width: 96rem;
    margin: 6rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 2.5rem 4.5rem;
  }
  .production-item {
    position: relative;
    text-align: center;
  }
  .text {
    position: absolute;
    top: 30%;
    font-size: 2.4rem;
    font-family: "RegalBlack", sans-serif;
    color: #fff;
  }
  .production-image {
    width: 100%;
    display: block;
    margin-bottom: 2rem;
  }
  .delivery {
    text-align: center;
    padding-bottom: 6rem;
  }
  .delivery-image {
    max-width: 117rem;
    display: block;
    margin: 0 auto;
  }
  .unpacking-video-box {
    max-width: 114rem;
    margin: 0 auto 6rem auto;
  }
  .unpacking-video {
    width: 100%;
  }
  .cashback {
    text-align: center;
    padding-bottom: 7rem;
  }
  .cashback-grid {
    width: 120rem;
    margin: 6rem auto;
    display: flex;
    justify-content: space-between;
  }
  .cashback-item {
    width: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cashback-image {
    height: 7.5rem;
    margin-bottom: 1rem;
  }
  .cashback-text {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 2.8rem;
  }
  .recipes {
    text-align: center;
    padding: 6rem 0;
    background-color: #f9f9f9;
  }
  .environment {
    padding: 6rem 0 8rem 0;
  }
  .banner {
    width: 94rem;
    height: 23rem;
    margin: 0 auto;
    padding-top: 6rem;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    background: url("~assets/img/how-it-works/social-responsibility-banner.jpg")
      no-repeat center;
  }
  .banner-item {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .lg {
      font-size: 5rem;
    }
    .md {
      font-size: 1.8rem;
      text-transform: uppercase;
      font-weight: bold;
      line-height: 2.8rem;
    }
    .sm {
      font-size: 1.8rem;
      font-weight: bold;
    }
  }
}
</style>
