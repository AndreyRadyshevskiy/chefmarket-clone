<template>
  <div class="menu-options">
    <SelectBox :options="portions" />
    <!-- <SelectBox /> -->
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
      portions: ["3 БЛЮДА", "4 БЛЮДА", "5 БЛЮД", "6 БЛЮД", "7 БЛЮД"]
    };
  },
  computed: {
    defaultOption() {
      return portions[2];
    }
  }
};
</script>

<style lang="scss"></style>
