<template>
  <div class="single-post">
    <div class="container">
      <h1 class="title">Что приготовить на скорую руку</h1>
      <header class="post-header">
        <time class="date">04.05.2019</time>
        <SocialShare />
        <SearchBar :style="SearchBarStyles"/>
      </header>
      <div class="single-post-inner">
        <main class="single-post-main">
          <article class="post">
            <div class="post-img"></div>
            <p class="text">Каждая хозяйка хотя бы единожды попадала в ситуацию, когда нужны рецепты на скорую руку. Неожиданно заглянули гости, дети вернулись раньше из школы, приехали родственники.      Непредвиденные приятные встречи проверяют на креативность и сообразительность. Чтобы все получилось, главное – не волноваться и знать, что можно приготовить на скорую руку.
            </p>
            <h2>Гнезда из пасты с мясной начинкой</h2>
            <p class="text">
              Этот рецепт станет находкой для любой хозяйки. При наличии ингредиентов, приготовление не отнимет более 30 минут.
            </p>
            <h3>Потребуется:</h3>
            <ul>
              <li>Готовые гнезда из пасты – 1 упаковка;</li>
              <li>Фарш говяжий – 0,5 кг.;</li>
              <li>Твердый сыр – 0,2 кг.;</li>
              <li>Морковь – 1 шт.;</li>
              <li>Луковица – 1 шт.;</li>
              <li>Чеснок – 2-3 зубка;</li>
              <li>Соль, специи по вкусу.</li>
            </ul>
            <figure>
              <img src="" alt="">
              <figcaption>Гнезда из пасты с мясной начинкой</figcaption>
            </figure>
            <h3>Приготовление</h3>
            <ol>
              <li>Если вы не знаете, что приготовить быстро и вкусно на скорую руку, обязательно попробуйте этот рецепт. Фарш посолите, поперчите, вымешайте.</li>
              <li>Очистите овощи, измельчите, обжарьте на небольшом количестве подсолнечного масла.</li>
              <li>Вскипятите воду.</li>
              <li>Начините плотно сырые гнезда фаршем.</li>
              <li>Положите заготовки в широкую кастрюлю с толстым дном или на большую сковороду.</li>
              <li>Залейте гнезда кипятком по верхнему уровню, чтобы простой рецепт на скорую руку
              приготовился быстро.</li>
              <li>Посыпьте сверху обжаренными овощами, измельченным чесноком, посолите.</li>
              <li>Доведите содержимое до кипения, потушите 5 минут без крышки.</li>
              <li>Накройте крышкой, убавьте огонь и тушите на слабом огне еще 10 минут.</li>
              <li>Выключите, оставьте настояться 5 минут.</li>
              <li>Потрите сыр на терке, посыпьте гнезда перед подачей.</li>
            </ol>
          </article>
        </main>
      </div>

      <section class="comments">
        <!-- Add condition -->
        <div class="header" v-if="true">
          <h3 class="comments-title">Комментарии к статье</h3>
          <a href="#" class="btn btn-colored">Оставить комментарий</a>
        </div>
        <Comment
          v-for="comment in 4"
          :key="comment"
          :comment="comment"
        />
        <CommentForm />
      </section>

    </div>
  </div>
</template>

<script>
import SocialShare from '@/components/Socials/SocialShare'
import SearchBar from '@/components/Blog/SearchBar'
import Comment from '@/components/Blog/Posts/Comment'
import CommentForm from '@/components/Blog/Posts/CommentForm'

export default {
  validate({params}) {
    return Boolean(params.id)
  },
  data() {
    return {
      SearchBarStyles : {
        position: 'absolute'
      }
    }
  },
  components: {
    SocialShare,
    SearchBar,
    Comment,
    CommentForm
  }
}
</script>

<style lang="scss">

.single-post {
  padding: 4.5rem 0;

  .title {
    margin-bottom: 2rem;
  }
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

.post-img {
  background: url('https://www.chefmarket.ru/blog/wp-content/uploads/2019/05/cook-e1556954945111.jpg') no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 50rem;
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
</style>
