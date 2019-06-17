<template>
  <form class="comment-form" @submit.prevent="onSubmit">
    <textarea v-model="controls.text" rows="8" cols="45" required></textarea>
    <div class="d-flex">
      <input v-model.trim="controls.name" type="text" placeholder="Ваше имя" required>
      <input v-model.trim="controls.email" type="email" placeholder="Ваш email">
      <button type="submit" class="btn btn-colored">Отправить комментарий</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      controls: {
        text: '',
        name: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        text: this.controls.text,
        name: this.controls.name,
        email: this.controls.email
      }
    }
  }
}
</script>

<style lang="scss">

.comment-form {
  padding-top: 2rem;

  textarea {
    width: 100%;
    outline: none;
    resize: vertical;
    padding: .5rem 1rem;
    border: 1px solid #ccc;
    margin-bottom: 2rem;

    &:focus {
      border: 1px solid #92949c;
    }
  }
  .d-flex {
    justify-content: space-between;
  }
  input {
    width: 32%;
    font-size: 1.2rem;
    text-transform: uppercase;
    border: 1px solid #ccc;
    border-radius: 45px;
    outline: none;
    padding: 0 2rem;

    &:focus {
      border: 1px solid #92949c;
    }
  }
  .btn {
    width: 32%;
  }
}
</style>
