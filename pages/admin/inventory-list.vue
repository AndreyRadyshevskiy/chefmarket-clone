<template>
  <div class="inventory-list-page">
    <div class="admin-page-title">Список инвентаря</div>

    <div class="container">
      <el-input v-model="search" placeholder="Искать рецепт" />
      <div class="inventory-list">
        <div v-for="(inv, index) in inventory" class="inventory">
          <img :src="inv.thumbnail" class="inventory-thumb" />
          <span class="inventory-name">{{inv.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  layout: "admin",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    inventory() {
      return this.invent.filter(
        data =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  async asyncData() {
    let invent = [];
    const inventSnapshot = await db.collection("inventory").get();
    inventSnapshot.forEach(inv => {
      invent.unshift(inv.data());
    });

    return { invent };
  }
};
</script>

<style lang="scss">
.inventory-list-page {
  .inventory-list {
    padding-top: 6rem;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }
  .inventory {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 6rem;
  }
  .inventory-thumb {
    margin: 0 auto;
    width: 16rem;
    height: 16rem;
  }
}
</style>
