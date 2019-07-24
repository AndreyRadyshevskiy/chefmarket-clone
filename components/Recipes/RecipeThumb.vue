<template>
  <div class="recipe-thumb-admin">
    <el-card>
      <div class="recipe-image">
        <div class="recipe-tags">
          <span class="recipe-tag">#До 20 минут</span>
          <span class="recipe-tag">#Без духовки</span>
          <span class="recipe-tag">#Азия</span>
        </div>
      </div>
      <div class="recipe-footer">
        <h6
          class="recipe-title"
        >Мидии в устричном соусе со шпинатной лапшой и стружкой тунца «Бонито»</h6>
        <div class="recipe-expires">
          Готовить
          <b>1 - 2 день</b>
        </div>
        <div class="recipe-stats">
          <img src="~/assets/img/dinners/svg/pot.svg" />
          <span class="weight">450г</span>
          <img src="~/assets/img/dinners/svg/time-half.svg" />
          <span class="time">20 минут</span>
          <img src="~/assets/img/dinners/svg/cook2.svg" />
          <span class="difficulty">Готовить легко</span>
          <span class="kkal">На 100г блюда: 109 кКалб 6.0 | 5.0 | 10.0 БЖУ</span>
        </div>
      </div>
    </el-card>
    <div class="btn-group">
      <el-button type="primary" size="small" icon="el-icon-edit">Редактировать</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete">Удалить</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.recipe-thumb-admin {
  .el-card__body {
    padding: 0;
  }
  .recipe-image {
    background: url("~assets/img/dinners/dish1.jpeg") no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 200px;
    position: relative;
  }
  .recipe-tags {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }
  .recipe-tag {
    background-color: rgba(122, 124, 130, 0.8);
    padding: 0.5rem;
    border-radius: 5px;
    color: #fff;
    font-size: 1.2rem;
  }
  .recipe-footer {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2.4rem;
  }

  .recipe-title {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.4rem;
    padding-top: 1rem;
    padding-bottom: 2.4rem;
  }
  .recipe-expires {
    font-size: 1.2rem;
    padding-bottom: 2.4rem;
  }
  .recipe-stats {
    font-size: 1.2rem;
    display: flex;
    align-items: flex-end;

    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.6rem;
    }
  }
  .weight,
  .time,
  .difficulty {
    margin-right: 2rem;
  }
  .difficulty {
    font-weight: 900;
  }
  .kkal {
    font-size: 1rem;
    color: #7f7f7f;
    display: none;
  }
  .btn-group {
    padding: 2rem 0;
    text-align: center;
  }
}
</style>

