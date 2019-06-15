<template>
  <div class="post-thumb post-thumb-large">
    <nuxt-link
      :to="'/blog/' + 1"
      :style="{backgroundImage: 'url(https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/cook-e1556954945111.jpg)'}"
      class="post-thumb-image"
    />
    <div class="post-thumb-content">
      <h3 class="title">
        <nuxt-link :to="'/blog/' + 1">Что приготовить на скорую руку</nuxt-link>
      </h3>
      <time class="date">4 мая 2019</time>
      <p class="text">
        Каждая хозяйка хотя бы единожды попадала в ситуацию, когда
        нужны рецепты на скорую руку. Неожиданно заглянули гости, дети
        вернулись раньше из школы...
      </p>
      <div
        class="tags"
      >#Блюда из мяса #Блюда из овощей #Блюда из рыбы и морепродуктов #Блюда на праздник #вкусно #Вторые блюда #готовить #приготовление #Рецепты #сладости</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">

.post-thumb-large {
  display: flex;
  width: 100%;
  min-height: 42rem;
  flex-direction: row;
  margin-bottom: 3.5rem;

  .post-thumb-image {
    flex: 0 0 50%;
    height: inherit;
  }
  .post-thumb-content {
    padding: 2.5rem 4rem;
  }
  .title {
    font-size: 4rem;
    margin-bottom: 3.5rem;
  }
  .text {
    line-height: 2.4rem;
    margin-bottom: auto;
    margin-top: auto;
  }
}
</style>
