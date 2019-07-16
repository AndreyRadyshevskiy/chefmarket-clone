<template>
  <article class="post-thumb">
    <nuxt-link
      :to="'/blog/' + slug"
      class="post-thumb-image"
      :style="{backgroundImage: 'url(' + imgUrl + ')'}"
    ></nuxt-link>
    <div class="post-thumb-content">
      <h3 class="title">
        <nuxt-link :to="'/blog/' + slug">{{ title }}</nuxt-link>
      </h3>
      <time class="date">{{ date }}</time>
      <p class="text">{{ text }}</p>
      <div class="tags">
        <a href v-for="tag in tags" class="tag">{{tag}}</a>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "PostThumb",
  props: {
    slug: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
.post-thumb {
  display: flex;
  flex-direction: column;
  height: 51.4rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;

  .post-thumb-image {
    height: 22rem;
    display: block;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: cover;
  }
  .post-thumb-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1.5rem 2.5rem;
  }
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
    a {
      color: #333;
    }
  }
  .date {
    margin-bottom: 1rem;
  }
  .text {
    line-height: 2.2rem;
    margin-bottom: auto;
  }
  .tag {
    display: inline-block;
    color: rgba(51, 51, 51, 0.6);
    margin-right: 1rem;

    &:hover {
      color: #a6d8a5;
    }
  }
}
</style>

