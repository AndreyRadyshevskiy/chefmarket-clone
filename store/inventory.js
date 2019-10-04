import { db } from '@/plugins/firebase'
export const actions = {
  async createInventory({}, inventoryData) {
    try {
      await db.collection('inventory').add(inventoryData)
    } catch (err) {
      console.log(err)
    }
  }
}
