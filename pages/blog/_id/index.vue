<template>
  <div class="single-post-page">
    <div class="container">
      <!-- breadcrumbs -->
      <h1 class="title">{{ post.title }}</h1>
      <header class="post-header">
        <time class="date">{{ post.date }}</time>
        <SocialShare />
        <SearchBar :style="SearchBarStyles" />
      </header>

      <div class="post-inner">
        <main class="post-main">
          <article class="post">
            <div :style="{backgroundImage: 'url(' + post.thumbnail + ')'}" class="post-img"></div>
            <div class="post-content" v-html="post.content"></div>
          </article>
        </main>
        <aside class="post-aside-promo">
          <affix class="promo-img" relative-element-selector=".post" style="width: 300px"></affix>
        </aside>
      </div>

      <section class="comments">
        <!-- Add condition -->
        <div class="header" v-if="true">
          <h3 class="comments-title">Комментарии к статье</h3>
          <a href="#" class="btn btn-colored">Оставить комментарий</a>
        </div>
        <Comment v-for="comment in 4" :key="comment" :comment="comment" />
        <CommentForm />
      </section>
    </div>
  </div>
</template>

<script>
import SocialShare from "@/components/Socials/SocialShare";
import SearchBar from "@/components/Blog/SearchBar";
import Comment from "@/components/Blog/Posts/Comment";
import CommentForm from "@/components/Blog/Posts/CommentForm";
import { db } from "@/plugins/firebase";

export default {
  validate({ params }) {
    return Boolean(params.id);
  },
  async asyncData({ params }) {
    const query = await db
      .collection("posts")
      .where("slug", "==", params.id)
      .get();

    let post;
    query.forEach(doc => (post = doc.data()));
    return { post };
  },
  data() {
    return {
      SearchBarStyles: {
        position: "absolute"
      }
    };
  },
  components: {
    SocialShare,
    SearchBar,
    Comment,
    CommentForm
  }
};
</script>

<style lang="scss">
.single-post-page {
  padding: 4.5rem 0;

  .title {
    margin-bottom: 2rem;
  }
  .post-header {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 4.5rem;

    .date {
      margin-right: 3rem;
    }
  }
  .post-inner {
    display: flex;
  }
  .post-main {
    flex: 0 0 calc(100% - 300px);
    padding-right: 5rem;
  }

  .post-img {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 50rem;
    margin-bottom: 5rem;
  }
  .post-content {
    color: #333;
    p {
      line-height: 2.6rem;
    }
    h3 {
      padding: 3rem 0;
    }
    ul li,
    ol li {
      margin-left: 2.5rem;
      line-height: 2.4rem;
      padding-bottom: 1rem;
    }
    ul li {
      position: relative;

      &::before {
        position: absolute;
        top: 0;
        left: -2.5rem;
        content: "—";
      }
    }
    img {
      margin: 1rem 0;
    }
  }
  .post-aside-promo {
    width: 30rem;

    .promo-img {
      background: url("~assets/img/promo/post-aside-promo.png") no-repeat;
      background-size: cover;
      width: 100%;
      height: 60rem;
    }
  }
  .comments {
    padding-top: 5.5rem;
    border-top: 1px solid #ccc;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .comments-title {
      font-size: 4rem;
    }
  }
}
</style>
