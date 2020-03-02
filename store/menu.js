import { db } from "@/plugins/firebase";

export const state = () => ({
  dates: [],
  activeMenuData: [],
  activeDateIndex: 1,
  activeMenuSetName: "Оригинальное"
});

export const mutations = {
  setDates(state, { dates }) {
    state.dates = [...dates];
  },
  setActiveDateIndex(state, index) {
    state.activeDateIndex = index;
  },
  setActiveMenuData(state, menuData) {
    state.activeMenuData = menuData;
  },
  setActiveMenuSetName(state, menuSetName) {
    state.activeMenuSetName = menuSetName;
  }
};

export const actions = {
  async createMenu({}, menuData) {
    try {
      await db.collection("menu").add(menuData);
    } catch (err) {
      console.log(err);
    }
  },
  async fetchActiveMenuData({ commit, state }) {
    let menuData = [];
    const recipesSnapshot = await db
      .collection("menu")
      .where("status", "==", state.activeDateIndex)
      .where("menuSetName", "==", state.activeMenuSetName)
      .get();
    recipesSnapshot.forEach(md => {
      menuData.unshift(md.data());
    });
    menuData = menuData[0].recipes;
    commit("setActiveMenuData", menuData);
  }
};

export const getters = {
  getDates(state) {
    return state.dates;
  },
  getActiveMenuData(state) {
    return state.activeMenuData;
  },
  getActiveDateIndex(state) {
    return state.activeDateIndex;
  },
  getActiveMenuSetName(state) {
    return state.activeMenuSetName;
  }
};
