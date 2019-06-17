<template>
  <div class="comment">
    <div class="author">Лариса</div>
    <div class="date">01.06.2019 в 16:53</div>
    <p class="text">Хорошая подборка рецептов, на любой вкус. Хаш, похож на наш холодец, только горячий. Лепёшки, обязательно попробую. А ещё понравился салат, печёных овощей, но сейчас многие делают салаты, из печёных овощей, это как мода, так что уже и не совсем армянское блюдо.</p>
    <a href="nofollow" class="reply-link">Ответить</a>
    <!-- Implement respond  -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.comment {
  padding: 2rem 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
  }
  .author {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: .5rem;
  }
  .date {
    font-size: 1.2rem;
    color: #ccc;
    margin-bottom: 1rem;
  }
  .text {
    font-size: 1.4rem;
    line-height: 2.4rem;
    margin-bottom: 1.5rem;
  }
  .reply-link {
    font-size: 1.2rem;
    color: #333;
    border-bottom: 1px dashed;
    transition: color .25s;

    &:hover {
      color: #a6d8a5;
    }
  }
}
</style>
