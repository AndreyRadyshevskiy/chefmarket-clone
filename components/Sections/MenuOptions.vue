<template>
  <div class="menu-options">
    <div class="menu-options-inner">
      <SelectBox :options="portions" :default-option="2" width="14rem" />
      <SelectBox :options="persons" :default-option="1" width="14rem" />
      <div class="price">3 591 ₽</div>
      <div class="info">i</div>
      <button class="btn btn-black btn-transparent">Изменить состав</button>
      <button class="btn btn-colored">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import SelectBox from "@/components/UI/SelectBox";
export default {
  components: {
    SelectBox
  },
  data() {
    return {
      portions: ["3 БЛЮДА", "4 БЛЮДА", "5 БЛЮД", "6 БЛЮД", "7 БЛЮД"],
      persons: ["1 ПЕРСОНА", "2 ПЕРСОНЫ", "4 ПЕРСОНЫ"]
    };
  },
  computed: {
    defaultPortion() {
      return portions[2];
    },
    defaultPerson() {
      return persons[1];
    }
  }
};
</script>

<style lang="scss">
.menu-options {
  position: sticky;
  top: calc(5rem - 2px);
  z-index: 1;
  background-color: #f9f9f9;
  .menu-options-inner {
    display: flex;
    align-items: center;
    width: 117rem;
    margin: 0 auto;
    padding: 2rem 4rem;
  }
  .price {
    font-size: 2rem;
    margin-left: auto;
    margin-right: 1.5rem;
  }
  .info {
    width: 3rem;
    height: 3rem;
    color: #59b958;
    font-size: 2.2rem;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
  }
  .select-box {
    margin-right: 1rem;
  }
  .btn:nth-of-type(1) {
    margin-right: 2rem;
  }
}
</style>
