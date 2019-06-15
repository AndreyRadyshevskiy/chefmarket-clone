<template>
  <section class="search">
    <div class="search-inner" :style='{"width" : (isActive ? "100%" : "0px")}'>
      <input
        type="text"
        class="search-field"
        placeholder="поиск по блогу"
        v-show="isActive"
        ref="search"
      >
      <button
        type="button"
        class="search-button-open"
        @click="expandSearch"
        :style='{"margin-left" : (isActive ? "0" : "-25px")}'
      ></button>
      <transition name="fade">
        <button
          type="button"
          class="search-button-close"
          v-show="isActive"
          @click="isActive = !isActive"
        ></button>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    expandSearch() {
      this.isActive = true;
      setTimeout(() => {
        this.$refs.search.focus();
      }, 500);
    }
  }
};
</script>

<style lang="scss">

.search {
  width: 100%;
  position: relative;
  height: 35px;
}
.search-inner {
  width: 0px;
  height: 35px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  border-bottom: 1px solid #ccc;
  transition: width .3s ease-in-out;
  background-color: #fff;
}
.search-field {
  position: absolute;
  right: 0;
  width: calc(100% - 25px);
  flex-grow: 1;
  transition: width .3s ease-in-out;
  padding: 0 15px;
  text-transform: uppercase;
  border: none;
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }
}
.search-button-open {
  background: url('~assets/img/icons/search.svg') no-repeat;
  background-size: 25px 25px;
  display: inline-block;
  border: none;
  width: 25px;
  height: 25px;
  padding: 0;
  cursor: pointer;
  position: absolute;
  left: 0;
  margin-left: -25px;
  transition: all .3s ease-in-out;

  &:focus {
    outline: 0;
  }
}
.search-button-close {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:before,
  &:after {
    position: absolute;
    left: 14px;
    top: 4px;
    content: ' ';
    height: 22px;
    width: 2px;
    background-color: #999;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}
.fade-enter-active {
  transition: opacity .5s;
  transition-delay: .5s;
}
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
