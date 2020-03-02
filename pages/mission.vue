<template>
  <div class="mission-page">
    <h1 class="section-title mb2">
      Миссия Команды
      <br />Шефмаркет
    </h1>
    <div class="section-subtitle mb4">
      Шефмаркет осознает ответственность перед своими клиентами,
      <br />сотрудниками, акционерами и партнерами, а также обществом
      <br />и природой. Мы ориентированы на создание долгосрочных ценностей.
    </div>
    <img src="@/assets/img/mission/1001.jpg" alt="изображение миссии" class="mission-image mb4" />
    <div class="section-subtitle mb4">
      Наша Миссия заключается в успешном и сбалансированном
      <br />выполнении трех ролей:
    </div>
    <img src="@/assets/img/quote.svg" class="quote" />
    <h2 class="section-title section-title--md">Рыночная роль</h2>
    <div class="section-subtitle mb4">
      Производить здоровую и вкусную еду, обеспечивать высокий уровень
      <br />сервиса, соответствующие растущим ожиданиям наших клиентов.
    </div>
    <img src="@/assets/img/mission/1002.jpg" alt="изображение миссии" class="mission-image mb6" />
    <img src="@/assets/img/quote.svg" class="quote" />
    <h2 class="section-title section-title--md">Экономическая роль</h2>
    <div class="section-subtitle mb4">
      Управлять компанией так, чтобы ее прибыль и капитализация росли,
      <br />а сотрудники получали возможности для карьерного роста и достойное
      <br />вознаграждение за достойный труд.
    </div>
    <img src="@/assets/img/mission/1003.jpg" alt="изображение миссии" class="mission-image mb6" />
    <img src="@/assets/img/quote.svg" class="quote" />
    <h2 class="section-title section-title--md">Социальная роль</h2>
    <div class="section-subtitle mb4">
      Вести бизнес с полным осознанием нашей ответственности перед
      <br />сегодняшними и будущими поколениями людей в России и во всем мире —
      <br />сокращая отходы продуктов питания и загрязнение природы.
    </div>
    <img src="@/assets/img/mission/1004.jpg" alt="изображение миссии" class="mission-image mb6" />
    <div class="section-subtitle mb4">
      Мы мотивируем поиск эффективных и творческих методов реализации
      <br />нашей Миссии при одновременном сохранении уважения к людям внутри
      <br />и вне компании. Мы учитываем положения нашей Миссии во всех
      <br />повседневных делах для того, чтобы наша компания могла получать
      <br />прибыль, чтобы наши сотрудники, партнеры, клиенты и общество
      <br />в целом получали выгоды от того, как Шефмаркет ведет свой бизнес.
    </div>
    <nuxt-link to="/how-it-works" class="btn btn-colored">Как это работает</nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.mission-page {
  padding: 6rem 0;
  text-align: center;
  .section-subtitle {
    font-size: 2rem;
  }
  .mission-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 90rem;
    width: 100%;
    height: 47rem;
    object-fit: cover;
  }
  .quote {
    display: block;
    margin: 0 auto 4rem auto;
  }
}
</style>
