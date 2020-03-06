<template>
  <div class="compare-page">
    <h1 class="section-title mb4">Что выбрать?</h1>
    <div class="container-lg">
      <table
        class="table"
        cellspacing="0"
        @mouseover="highlightColumnOn"
        @mouseleave="highlightColumnOff"
        ref="table"
      >
        <thead class="table-head">
          <tr>
            <th></th>
            <th>Оригинальное</th>
            <th>Семейное</th>
            <th>20 минут</th>
            <th>Баланс</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="param"></td>
            <td>
              <el-button class="btn btn-colored" @click="goToDinners"
                >Выбрать меню</el-button
              >
            </td>
            <td>
              <el-button class="btn btn-colored" @click="goToDinners"
                >Выбрать меню</el-button
              >
            </td>
            <td>
              <el-button class="btn btn-colored" @click="goToDinners"
                >Выбрать меню</el-button
              >
            </td>
            <td>
              <el-button class="btn btn-colored" @click="goToDinners"
                >Выбрать меню</el-button
              >
            </td>
          </tr>
          <tr>
            <td class="param">Цена за порцию</td>
            <td>от 273 Р</td>
            <td>от 234 Р</td>
            <td>от 263 Р</td>
            <td>oт 308 Р</td>
          </tr>
          <tr>
            <td class="param">Размер порции</td>
            <td>~ 500 г</td>
            <td>~ 500 г</td>
            <td>~ 500 г</td>
            <td>~ 500 г</td>
          </tr>
          <tr>
            <td class="param">Время приготовления</td>
            <td>25-40 минут</td>
            <td>25-40 минут</td>
            <td>15-20 минут</td>
            <td>25-40 минут</td>
          </tr>
          <tr>
            <td class="param">Количество дней</td>
            <td>от 3 до 7</td>
            <td>от 3 до 7</td>
            <td>от 3 до 7</td>
            <td>от 3 до 7</td>
          </tr>
          <tr class="sub-heading">
            <td>Ингридиенты</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="param">Без свинины</td>
            <td class="td-text">Можно заменить</td>
            <td class="td-text">Можно заменить</td>
            <td class="td-text">Можно заменить</td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Без жирного мяса</td>
            <td></td>
            <td><i class="check"></i></td>
            <td></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Премиальная рыба</td>
            <td><i class="check"></i></td>
            <td></td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Больше свежих овощей и фруктов</td>
            <td><i class="check"></i></td>
            <td></td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Разнообразные крупы</td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Без сливочного масла</td>
            <td></td>
            <td></td>
            <td></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Без молочной продукции</td>
            <td></td>
            <td></td>
            <td></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Без соли и сахара</td>
            <td></td>
            <td></td>
            <td></td>
            <td><i class="check"></i></td>
          </tr>
          <tr class="sub-heading">
            <td>Рецептура</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="param">Выбор блюд</td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Без интенсивной жарки</td>
            <td></td>
            <td></td>
            <td></td>
            <td><i class="check"></i></td>
          </tr>
          <tr>
            <td class="param">Пониженная калорийность</td>
            <td></td>
            <td></td>
            <td></td>
            <td><i class="check"></i></td>
          </tr>
          <tr class="sub-heading">
            <td>Подходит</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="param">Детям</td>
            <td></td>
            <td><i class="check"></i></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="param">Постящимся и веганам</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="td-text">Можно выбрать</td>
          </tr>
          <tr>
            <td class="param">Для снижения веса и диабетикам</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="td-text">Можно выбрать</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hovered: null
    };
  },
  methods: {
    highlightColumnOn(e) {
      if (
        e.target.tagName.toLowerCase() == "td" ||
        e.target.tagName.toLowerCase() == "th"
      ) {
        var index = e.target.cellIndex;
        this.hovered &&
          this.hovered.forEach(function(cell) {
            cell.classList.remove("hovered");
          });
        if (index > 0) {
          this.hovered = Array.prototype.map.call(
            this.$refs.table.rows,
            function(row) {
              let i = index;
              while (!cell && i >= 0) {
                var cell = row.cells[i];
                i -= 1;
              }
              return cell;
            }
          );
          this.hovered.forEach(function(cell) {
            cell.classList.add("hovered");
          });
        }
      }
    },
    highlightColumnOff(e) {
      this.hovered &&
        this.hovered.forEach(function(cell) {
          cell.classList.remove("hovered");
        });
      this.hovered = null;
    },
    goToDinners(e) {
      let index = e.target.closest("td").cellIndex;
      let name = this.$refs.table.rows[0].cells[index - 1].nextElementSibling
        .textContent;
      this.$store.commit("menu/setActiveMenuSetName", name);
      this.$router.push("/dinners");
    }
  }
};
</script>

<style lang="scss">
.compare-page {
  padding: 6rem 0;
  background-color: #fff;
  .table {
    width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;
  }
  th {
    padding: 2.8rem 0;
    border-bottom: 1px solid #dadada;
  }
  td {
    font-size: 2rem;
    text-align: center;
    border-bottom: 1px solid #dadada;
    color: #6cc16b;
  }
  .param {
    color: #333;
    font-size: 1.4rem;
    padding: 2rem 0;
    text-align-last: left;
  }
  .td-text {
    font-size: 1.6rem;
    color: #333;
    font-weight: normal;
  }
  .sub-heading td {
    font-size: 1.6rem;
    font-weight: bold;
    color: #333;
    padding: 2rem 0;
    background-color: #f9f9f9;
    border-bottom: none;
  }
  i.check {
    display: inline-block;
    width: 10px;
    height: 16px;
    margin: -3px 10px 3px;
    border: solid #6cc16b;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
  thead th {
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  td .btn {
    display: none;
    margin: 0 auto;
  }
  td.hovered .btn {
    display: block;
  }
  .hovered {
    background-color: #f6fbf6;
  }
  tr:nth-of-type(1) {
    height: 5rem;
  }
  tr:nth-of-type(1) td {
    border-bottom: none;
  }
}
</style>
