import { db } from '@/plugins/firebase'

export const state = () => ({
  chefs: []
})

export const mutations = {
  setChefs(state, { chefs }) {
    state.chefs = [...chefs]
  },
  addChef(state, { chef }) {
    state.chefs = [...state.chefs, chef]
  },
  updateChefs(state, { chef }) {
    const chefIndex = state.chefs.findIndex(obj => obj.uid === chef.uid)
    state.chefs[chefIndex] = chef
  }
}

export const actions = {
  async createChef({}, chefData) {
    try {
      delete chefData.activeChef
      await db.collection('chefs').add(chefData)
    } catch (err) {
      console.log(err)
    }
  },
  async updateChef({}, chefData) {
    try {
      await db
        .collection('chefs')
        .doc(chefData.activeChef)
        .update({
          avatar: chefData.avatar,
          info: chefData.info,
          name: chefData.name,
          quote: chefData.quote
        })
    } catch (err) {
      console.log(err)
    }
  },
  async deleteChef({}, id) {
    await db
      .collection('chefs')
      .doc(id)
      .delete()
  }
}

export const getters = {
  getChefs(state) {
    return state.chefs
  }
}
