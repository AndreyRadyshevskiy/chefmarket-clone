import { getUserFromCookie, getUserFromSession } from "@/helpers";
import { db } from "@/plugins/firebase";

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req);
    if (user) {
      await commit("auth/setUSER", {
        name: user.name,
        email: user.email,
        uid: user.user_id
      });
    }

    let dates = [];
    let menuData = [];
    const [datesSnapshot, menuDataSnapshot] = await Promise.all([
      db
        .collection("dates")
        .orderBy("status", "desc")
        .get(),
      db
        .collection("menu")
        .where("status", "==", 1)
        .where("menuSetName", "==", "Оригинальное")
        .get()
    ]);
    datesSnapshot.forEach(date => {
      dates.unshift(date.data());
    });
    menuDataSnapshot.forEach(md => {
      menuData.unshift(md.data());
    });
    menuData = menuData[0].recipes;
    commit("menu/setDates", { dates });
    commit("menu/setActiveMenuData", menuData);

    // убрать вот это все в соотв страницы
    let posts = [];
    let chefs = [];
    const [postsSnapshot, chefsSnapshot] = await Promise.all([
      db.collection("posts").get(),
      db.collection("chefs").get()
    ]);
    postsSnapshot.forEach(post => {
      posts.unshift(post.data());
    });
    chefsSnapshot.forEach(chef => {
      chefs.push(Object.assign({ uid: chef.id }, chef.data()));
    });
    commit("posts/setPosts", { posts });
    commit("chefs/setChefs", { chefs });

    // let posts = [];
    // const postSnapshot = await db.collection("posts").get();
    // postSnapshot.forEach(doc => {
    //   const post = doc.data();
    //   posts.unshift(post);
    // });
    // commit("posts/setPosts", { posts });

    // let chefs = [];
    // const postSnapshot = await db.collection("chefs").get();
    // postSnapshot.forEach(doc => {
    //   const chef = doc.data();
    //   chefs.unshift(chef);
    // });
    // commit("chefs/setChefs", { chefs });
  }
};
// FETCH MULTIPLE COLLECTIONS EXAMPLE
// async asyncData() {
//   let ingredients = [];
//   let inventory = [];
//   const [ingredientsSnapshot, inventorySnapshot] = await Promise.all([
//     db.collection("ingredients").get(),
//     db.collection("inventory").get()
//   ]);
//   ingredientsSnapshot.forEach(ingr => {
//     ingredients.unshift(ingr.data().name);
//   });
//   inventorySnapshot.forEach(inv => {
//     inventory.unshift(inv.data().name);
//   });
//   return { ingredients, inventory };
// },
export const strict = false
