export const state = () => ({
  activeRegion: null,
  activePhone: null,
  regionArr: [
    { name: 'Москва', phone: '+7(495) 374-61-32' },
    { name: 'Санкт-Петербург', phone: '+7(812) 407-24-73' },
    { name: 'Нижний Новгород', phone: '+7(800) 333-26-32'}
  ]
})

export const mutations = {
  setActiveRegion (state, regionObj) {
    state.activeRegion = regionObj.name
    state.activePhone = regionObj.phone
  }
}

export const getters = {
  region(state) {
    return state.activeRegion ? state.activeRegion : 'Москва'
  },
  phone(state) {
    return state.activePhone ? state.activePhone : '+7(495) 374-61-32'
  }
}

