<template>
  <div class="select-container">
    <div class="slot-box mb2">
      <slot :activeOption="activeOption"></slot>
    </div>
    <div class="select-box">
      <span class="selected" ref="selected" @click="showOptions">
        {{activeOption}}
        <span class="expand-arrow-green"></span>
      </span>
      <ul class="options" v-show="visible" @click="setOption">
        <li
          v-for="(option, index) in options"
          :key="index"
          :class="['option', { active: activeOption == option }]"
        >{{ option }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options", "defaultOption"],
  data() {
    return {
      visible: false,
      activeOption: this.options[this.defaultOption]
    };
  },
  methods: {
    showOptions() {
      this.visible = !this.visible;
      this.$refs.selected.classList.toggle("opened");
    },
    setOption(event) {
      this.activeOption = event.target.textContent;
      this.$refs.selected.classList.toggle("opened");
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
.select-container {
  .select-box {
    width: 35rem;
    margin: 0 auto;
    position: relative;
  }
  .expand-arrow-green {
    transform-origin: 50% 50%;
    margin: 0;
  }
  .selected {
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
  .options {
    width: 35rem;
    position: absolute;
    border-left: 1px solid #dadada;
    border-right: 1px solid #dadada;
    text-align: left;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .option {
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
