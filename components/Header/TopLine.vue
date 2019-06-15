<template>
  <header class="top-line">
    <div class="container">
      <div class="top-line-inner">
        <div class="region" ref="regionOptions">
          <span>Ваш регион доставки:</span>
          <span class="region-select" @click="regionSelect = !regionSelect">
            {{ region }}
            <span class="expand-arrow-green"></span>
          </span>
          <ul class="region-options" v-show="regionSelect" @click="setRegion">
            <li class="region-option">Москва</li>
            <li class="region-option">Санкт-Петербург</li>
            <li class="region-option">Нижний Новгород</li>
          </ul>
        </div>
        <a href="tel:+74953746132" class="phone-link">{{ phone }}</a>
        <a href="#" class="top-line-link">
          <img src="~/assets/img/icons/ready-food.svg" class="icon-food">
          <span>Готовая еда</span>
          <img src="~/assets/img/icons/link.svg" class="icon-link">
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      regionSelect: false
    };
  },
  computed: {
    ...mapGetters({
      region: 'region/region',
      phone: 'region/phone'
    })
  },
  mounted() {
    window.addEventListener("click", this.close);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.close);
  },
  methods: {
    setRegion(event) {
      const region = event.target.textContent;
      const activeRegionObj = this.$store.state.region.regionArr.find(
        el => el.name == region
      )
      this.$store.commit('region/setActiveRegion', activeRegionObj)
      this.regionSelect = false;
    },
    close(event) {
      if (!this.$refs.regionOptions.contains(event.target)) {
        this.regionSelect = false;
      }
    }
  }
};
</script>

<style lang="scss">

.top-line {
  background: #333;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;

  @include respond(tab-port) {
    display: none;
  }

  .container {
    width: 100%;
    max-width: 126rem;
    padding: 0;
  }
  .top-line-inner {
    display: flex;
    align-items: center;
    height: 4rem;
    padding: 0 2rem;
  }
  .region {
    position: relative;

    .region-select {
      padding: 1rem 0;
      cursor: pointer;
    }
    .region-options {
      position: absolute;
      background: #fff;
      color: #333;
      font-weight: normal;
      box-shadow: 0 4px 10px 0 hsla(0,0%,65%,.5);
      padding: 1rem 0;
      width: 20rem;
      left: 46%;
      top: 2rem;
      z-index: 100;

      &::after {
        content: " ";
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        background: #fff;
        top: -6px;
        left: calc(50% - 1rem);
        transform: rotate(45deg);
      }
    }
    .region-option {
      padding: 1rem 2.3rem;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }

  .phone-link {
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    margin-left: 3.5rem;
  }

  .top-line-link {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: auto;
    color: #fff;
    opacity: .8;
    padding: .5rem 0;

    &:hover {
      opacity: 1;
    }
    .icon-food {
      width: 1.4rem;
      height: 1.4rem;
    }
    .icon-link {
      display: inline-block;
      margin-left: 2px;
      margin-bottom: -1px;
    }
  }
}
</style>

