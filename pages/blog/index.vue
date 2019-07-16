<template>
  <div class="blog-page">
    <div class="container">
      <h1 class="title page-title">Блог о вкусном</h1>

      <SearchBar />

      <main class="post-thumbs-blog">
        <PostThumb
          v-for="(post, index) in posts"
          :key="index"
          :title="post.title"
          :date="post.date"
          :imgUrl="post.thumbnail"
          :text="previewText(post.content, 170)"
          :tags="post.tags"
          :slug="post.slug"
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
      </main>
    </div>
  </div>
</template>

<script>
import SearchBar from "~/components/Blog/SearchBar";
import PostThumb from "~/components/Blog/Posts/PostThumb";
import PostThumbLarge from "~/components/Blog/Posts/PostThumbLarge";

export default {
  layout: "blog",
  components: {
    SearchBar,
    PostThumb,
    PostThumbLarge
  },
  data() {
    return {};
  },
  methods: {
    goToDinners() {},
    previewText(content, maxLength) {
      let tempContent = content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\&nbsp;/g, "")
        .substring(0, maxLength);

      tempContent = tempContent.substr(
        0,
        Math.min(tempContent.length, tempContent.lastIndexOf(" "))
      );
      return tempContent + "...";
    }
  },
  computed: {
    posts() {
      return this.$store.getters["posts/getPosts"];
    }
  }
};
</script>

<style lang="scss">
.post-thumbs-blog {
  padding: 4.5rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1ft);
  grid-gap: 2rem;

  .post-thumb:first-of-type {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-column-end: 4;
    flex-direction: row;
    margin-bottom: 3.5rem;

    .post-thumb-image {
      width: 50%;
      height: 100%;
    }
    .post-thumb-content {
      width: 50%;
    }
    .title {
      font-size: 4rem;
      margin-bottom: 3.5rem;
    }
    .date {
      margin-bottom: 3.5rem;
    }
  }
}

.tag-cloud {
  grid-row-start: 4;
  grid-column-start: 1;
  grid-row-end: 4;
  grid-column-end: 4;
  padding: 6.5rem 0;

  .title {
    font-family: "LatoWeb";
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
    transition: background 0.25s;

    &:hover {
      background: rgba(89, 185, 88, 0.2);
    }
  }
}
.dinners-ads {
  grid-row-start: 6;
  grid-column-start: 1;
  grid-row-end: 6;
  grid-column-end: 4;
  width: 100%;
  padding: 2.5rem 0 6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.5rem;
  height: 14rem;
  background: url("https://www.chefmarket.ru/blog/wp-content/uploads/2019/04/blog-promo-set2.jpg")
    no-repeat center center;
  background-size: cover;
  cursor: pointer;

  .text {
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
  }
}
</style>





