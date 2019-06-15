<template>
  <div class="blog">
    <div class="container">
      <h1 class="title page-title">Блог о вкусном</h1>

      <SearchBar/>

      <main class="posts-thumbs">

        <PostThumbLarge/>

        <div class="posts-thumbs-row">
          <PostThumb
            v-for="post in 12"
            :key="post"
            id="1"
            title="Что приготовить на скорую руку"
            date="04.05.2019"
            imgUrl="https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/cook-e1556954945111.jpg"
            text="Каждая хозяйка хотя бы единожды попадала в ситуацию, когда
              нужны рецепты на скорую руку. Неожиданно заглянули гости..."
          />

          <section class="tag-cloud">
            <h5 class="title">Популярные теги</h5>
            <div class="tag-cloud-inner">
              <a href class="tag">#О нас</a>
              <a href class="tag">#Производство</a>
              <a href class="tag">#Детское питание</a>
              <a href class="tag">#ЗОЖ</a>
              <a href class="tag">#Правильное питание</a>
              <a href class="tag">#Блюда на праздник</a>
              <a href class="tag">#Мясные блюда</a>
              <a href class="tag">#Блюда из рыбы и морепродуктов</a>
              <a href class="tag">#Первые блюда</a>
              <a href class="tag">#Вторые блюда</a>
              <a href class="tag">#Салаты</a>
              <a href class="tag">#Каши</a>
              <a href class="tag">#Закуски</a>
              <a href class="tag">#Десерты</a>
            </div>
          </section>

          <section class="dinners-ads" @click="goToDinners">
            <span class="text">3 ужина на двоих с бесплатной доставкой за 1490 руб.</span>
            <a href="#" class="btn btn-colored">Подробнее</a>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SearchBar from "~/components/Blog/SearchBar"
import PostThumb from "~/components/Blog/Posts/PostThumb"
import PostThumbLarge from "~/components/Blog/Posts/PostThumbLarge"

export default {
  layout: "blog",
  components: {
    SearchBar,
    PostThumb,
    PostThumbLarge
  },
  methods: {
    goToDinners() {}
  }
};
</script>

<style lang="scss">

.posts-thumbs {
  padding: 4.5rem 0;
}
.posts-thumbs-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 2.5rem;
}
.tag-cloud {
  padding: 6.5rem 0;

  .title {
    font-family: 'LatoWeb';
    font-size: 2rem;
    padding-bottom: 2rem;
  }
  .tag {
    display: inline-block;
    font-size: 1.2rem;
    line-height: 3rem;
    border: 1px solid #59b958;
    border-radius: 15px;
    padding: 0 20px;
    margin: 0 1rem 1.5rem 0;
    transition: background .25s;

    &:hover {
      background: rgba(89,185,88,.2);
    }
  }
}
.dinners-ads {
  width: 100%;
  padding: 2.5rem 0 6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.5rem;
  height: 14rem;
  background: url('https://www.chefmarket.ru/blog/wp-content/uploads/2019/04/blog-promo-set2.jpg') no-repeat center center;
  background-size: cover;
  cursor: pointer;

  .text {
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
  }
}
</style>





