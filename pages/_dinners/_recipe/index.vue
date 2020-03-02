<template>
  <div class="recipe-page"></div>
</template>

<script>
export default {
  validate({ params }) {
    return Boolean(params.recipe);
  }
};
</script>

<style>
</style>
