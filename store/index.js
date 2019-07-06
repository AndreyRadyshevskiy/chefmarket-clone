import { getUserFromCookie, getUserFromSession } from '@/helpers'

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
  }
}
