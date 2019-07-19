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
    let chefs = []
    const [postsSnapshot, chefsSnapshot] = await Promise.all([
      db.collection('posts').get(),
      db.collection('chefs').get()
    ])
    postsSnapshot.forEach(post => {
      posts.unshift(post.data())
    })
    chefsSnapshot.forEach(chef => {
      chefs.push(Object.assign({ uid: chef.id }, chef.data()))
    })
    commit('posts/setPosts', { posts })
    commit('chefs/setChefs', { chefs })

    //   let posts = []
    //   const postSnapshot = await db.collection('posts').get()
    //   postSnapshot.forEach(doc => {
    //     const post = doc.data()
    //     posts.unshift(post)
    //   })
    //   commit('posts/setPosts', { posts })

    //   let chefs = []
    //   const postSnapshot = await db.collection('chefs').get()
    //   postSnapshot.forEach(doc => {
    //     const chef = doc.data()
    //     chefs.unshift(chef)
    //   })
    //   commit('chefs/setChefs', { chefs })
  }
}
