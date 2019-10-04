import { db } from '@/plugins/firebase'
export const actions = {
  async createRecipe({}, recipeData) {
    try {
      await db.collection('recipes').add(recipeData)
    } catch (err) {
      console.log(err)
    }
  }
}
