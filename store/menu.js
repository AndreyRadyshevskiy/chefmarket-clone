import { db } from '@/plugins/firebase'
export const actions = {
  async createMenu({}, menuData) {
    try {
      await db.collection('menu').add(menuData)
    } catch (err) {
      console.log(err)
    }
  }
}
