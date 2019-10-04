import { db } from '@/plugins/firebase'
export const actions = {
  async createIngredient({}, ingredientData) {
    try {
      await db.collection('ingredients').add(ingredientData)
    } catch (err) {
      console.log(err)
    }
  }
}
