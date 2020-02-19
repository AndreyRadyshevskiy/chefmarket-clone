import { db } from "@/plugins/firebase";
export const actions = {
  async createRecipe({}, recipeData) {
    try {
      await db.collection("recipes").add(recipeData);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteRecipe({}, id) {
    let query = await db
      .collection("recipes")
      .where("title", "==", id)
      .get();

    query.forEach(doc => doc.ref.delete());
  }
};
