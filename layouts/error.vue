<template>
  <div class="error-page">
    <div class="container">
      <div class="error-page-inner">
        <img src="~/assets/img/error.jpg" class="error-image">
        <div class="error-content">
          <h1 class="error-title">Ошибка {{error.statusCode }}</h1>
          <p
            class="error-text"
            v-if="error.statusCode === 404"
          >Страница, которую вы запрашиваете, не существует. Возможно, она была удалена, или вы набрали неверный адрес.</p>
          <p class="error-text" v-else>Возникла ошибка...</p>
          <a href="/" class="btn btn-colored">Вернуться на главную</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style lang="scss">
.error-page {
  .error-page-inner {
    display: flex;
  }
  .error-title,
  .error-text {
    margin-bottom: 6rem;
  }

  .error-title {
    font-size: 6rem;
  }

  .error-content {
    padding: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

