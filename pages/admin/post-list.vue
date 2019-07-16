<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column prop="title" label="Название" width="400px" />

    <el-table-column prop="author" label="Автор" />

    <el-table-column label="Дата" width="180">
      <template slot-scope="{row: {date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ date }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="views" label="Просмотры">
      <template slot-scope="{row: {views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="comments" label="Комментарии">
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px"></span>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: "admin",
  computed: {
    posts() {
      return this.$store.getters["posts/getPosts"];
    }
  }
};
</script>

<style>
</style>
