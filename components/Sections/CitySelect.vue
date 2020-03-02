<template>
  <div class="city-select">
    <div class="section-subtitle" v-if="region == 'МОСКВА'">
      Ежедневная бесплатная доставка по Москве и до 60 км от МКАД.
      <br />В удобный для вас интервал времени.
    </div>
    <div class="section-subtitle" v-if="region == 'САНКТ-ПЕТЕРБУРГ'">
      Бесплатная доставка по Санкт-Петербургу и до 30 км от города.
      <br />Каждый день, кроме субботы. В удобный для вас интервал времени.
    </div>
    <div class="section-subtitle" v-if="region == 'НИЖНИЙ НОВГОРОД'">
      Бесплатная доставка по Нижнему Новгороду и до 30 км от города
      <br />по четвергам и воскресеньям. В удобный для вас интервал времени.
    </div>
    <div class="region">
      <span class="region-select" ref="regionSelect" @click="showOptions">
        {{ region }}
        <span class="expand-arrow-green"></span>
      </span>
      <ul class="region-options" v-show="regionSelect" @click="setRegion">
        <li :class="['region-option',{active: region=='МОСКВА'}]">МОСКВА</li>
        <li :class="['region-option',{active: region=='САНКТ-ПЕТЕРБУРГ'}]">САНКТ-ПЕТЕРБУРГ</li>
        <li :class="['region-option', {active: region=='НИЖНИЙ НОВГОРОД'}]">НИЖНИЙ НОВГОРОД</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      region: "МОСКВА",
      regionSelect: false
    };
  },
  methods: {
    showOptions() {
      this.regionSelect = !this.regionSelect;
      this.$refs.regionSelect.classList.toggle("opened");
    },
    setRegion(event) {
      this.region = event.target.textContent;
      this.$refs.regionSelect.classList.toggle("opened");
      this.regionSelect = false;
    }
  }
};
</script>

<style lang="scss">
.city-select {
  margin-bottom: 4rem;
  .section-subtitle {
    margin-bottom: 2rem;
  }
  text-align: center;
  .select-box {
    margin: 2rem 0 4rem 0;
    width: 35rem;
  }
  .el-input__inner {
    border-radius: 30px;
    padding: 2.4rem 3rem;
    font-size: 1.2rem;
  }
  .region {
    width: 35rem;
    margin: 0 auto;
    position: relative;
  }
  .expand-arrow-green {
    transform-origin: 50% 50%;
    margin: 0;
  }
  .region-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    padding: 1.6rem 2rem;
    border-radius: 30px;
    width: 100%;
    border: 1px solid #dadada;
    cursor: pointer;
    &.opened {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.opened .expand-arrow-green {
      transform: rotate(-135deg);
    }
  }
  .region-options {
    width: 35rem;
    position: absolute;
    border-left: 1px solid #dadada;
    border-right: 1px solid #dadada;
    text-align: left;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .region-option {
    font-size: 1.2rem;
    padding: 1.6rem 2rem;
    border-bottom: 1px solid #dadada;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #fff;
    &.active {
      background-color: #f0f0f0;
    }
    &:hover {
      background-color: #59b958;
      color: #ffffff;
    }
  }
}
</style>
