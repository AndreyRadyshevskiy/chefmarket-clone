import { db } from '@/plugins/firebase'

export const state = () => ({
  categories: [
    'Все',
    'Блог основателя',
    'Видеорецепты',
    'Интересное о еде',
    'Кулинарная школа',
    'Новости',
    'Правильное питание',
    'Рецепты'
  ],
  posts: []
})

export const mutations = {
  setPosts(state, { posts }) {
    state.posts = [...posts]
  }
}

export const actions = {
  async createPost({}, postData) {
    try {
      await db.collection('posts').add(postData)
    } catch (err) {
      console.log(err)
    }
  },
  // НАДО ЛИ ВОТ ЭТО?????? ЕСЛИ ЕСТЬ SERVER INIT
  async fetchAdminPosts({ commit, state }) {
    try {
      let posts = []
      const postsSnapshot = await db.collection('posts').get()

      postsSnapshot.forEach(doc => {
        const post = doc.data()
        console.log(doc.data())
        posts.unshift(post)
      })
      // commit('setPosts', { posts })
      return posts
    } catch (err) {
      console.log(err)
    }
  }
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getPosts(state) {
    return state.posts
  }
}
