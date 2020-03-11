<template>
  <el-menu :style="{height: '100%'}" :default-openeds="isOpened" class="admin-navigation" router>
    <el-menu-item index="/admin">
      <i class="el-icon-data-line"></i>
      <span>Аналитика</span>
    </el-menu-item>

    <el-submenu index="menu">
      <template slot="title">
        <i class="el-icon-dish"></i>
        <span>Меню</span>
      </template>

      <el-menu-item index="/admin/create-menu">Составить меню</el-menu-item>
      <el-menu-item index="/admin/recipes">Рецепты</el-menu-item>
      <el-menu-item index="/admin/create-recipe">Создать рецепт</el-menu-item>
      <el-menu-item index="/admin/create-ingredient">Создать ингредиент</el-menu-item>
      <el-menu-item index="/admin/inventory-list">Инвентарь</el-menu-item>
      <el-menu-item index="/admin/create-inventory">Создать инвентарь</el-menu-item>
    </el-submenu>

    <el-submenu index="orders">
      <template slot="title">
        <i class="el-icon-shopping-cart-2"></i>
        <span>Заказы</span>
      </template>

      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item one</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-menu-item index="2-4">item one</el-menu-item>
    </el-submenu>

    <el-submenu index="blog">
      <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span>Блог</span>
      </template>

      <el-menu-item index="/admin/post-list">Посты</el-menu-item>
      <el-menu-item index="/admin/create-post">Создать</el-menu-item>
    </el-submenu>

    <el-menu-item index="/admin/users">
      <i class="el-icon-user"></i>
      <span>Пользователи</span>
    </el-menu-item>

    <el-menu-item index="/admin/chefs">
      <i class="el-icon-user"></i>
      <span>Шеф-повара</span>
    </el-menu-item>

    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span>Выйти</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isOpened: ["blog"]
    };
  }
};
</script>

<style lang="scss">
.admin-navigation {
  span,
  i {
    font-weight: 900;
  }
}
</style>

