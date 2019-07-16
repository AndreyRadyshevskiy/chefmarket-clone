import { getUserFromCookie, getUserFromSession } from '@/helpers'
import { db } from '@/plugins/firebase'

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await commit('auth/setUSER', {
        name: user.name,
        email: user.email,
        uid: user.user_id
      })
    }
    let posts = []
    const postSnapshot = await db.collection('posts').get()
    postSnapshot.forEach(doc => {
      const post = doc.data()
      posts.unshift(post)
    })
    commit('posts/setPosts', { posts })
  }
}
