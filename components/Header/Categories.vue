<template>
  <div class="categories">
    <div class="container">
      <nav class="categories-menu">
        <a href class="categories-nav-item">Все</a>
        <a href class="categories-nav-item">Блог Основателя</a>
        <a href class="categories-nav-item">Видеорецепты</a>
        <a href class="categories-nav-item">Интересное о еде</a>
        <a href class="categories-nav-item">Кулинарная школа</a>
        <a href class="categories-nav-item">Новости</a>
        <a href class="categories-nav-item">Правильное питание</a>
        <a href class="categories-nav-item">Рецепты</a>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.categories {
  background: #f9f9f9;

  .categories-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6.5rem;
  }
  .categories-nav-item {
    font-size: 1.4rem;
    color: rgba(51, 51, 51, 0.7);
    padding: 1.5rem;
  }
}
</style>
