import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d536fe8 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */))
const _b92f9e8a = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */))
const _29fc58d0 = () => interopDefault(import('..\\pages\\contacts.vue' /* webpackChunkName: "pages_contacts" */))
const _ef476dfc = () => interopDefault(import('..\\pages\\how-it-works.vue' /* webpackChunkName: "pages_how-it-works" */))
const _8adc1b52 = () => interopDefault(import('..\\pages\\mission.vue' /* webpackChunkName: "pages_mission" */))
const _8b8cf534 = () => interopDefault(import('..\\pages\\reviews.vue' /* webpackChunkName: "pages_reviews" */))
const _77538430 = () => interopDefault(import('..\\pages\\true-chef.vue' /* webpackChunkName: "pages_true-chef" */))
const _7ac66703 = () => interopDefault(import('..\\pages\\admin\\chefs.vue' /* webpackChunkName: "pages_admin_chefs" */))
const _1c704958 = () => interopDefault(import('..\\pages\\admin\\create-ingredient.vue' /* webpackChunkName: "pages_admin_create-ingredient" */))
const _d61f42b6 = () => interopDefault(import('..\\pages\\admin\\create-inventory.vue' /* webpackChunkName: "pages_admin_create-inventory" */))
const _075cf526 = () => interopDefault(import('..\\pages\\admin\\create-menu.vue' /* webpackChunkName: "pages_admin_create-menu" */))
const _1b81f0ee = () => interopDefault(import('..\\pages\\admin\\create-menu-test.vue' /* webpackChunkName: "pages_admin_create-menu-test" */))
const _5878efe7 = () => interopDefault(import('..\\pages\\admin\\create-post.vue' /* webpackChunkName: "pages_admin_create-post" */))
const _3107d3d6 = () => interopDefault(import('..\\pages\\admin\\create-recipe.vue' /* webpackChunkName: "pages_admin_create-recipe" */))
const _1d7215c9 = () => interopDefault(import('..\\pages\\admin\\inventory-list.vue' /* webpackChunkName: "pages_admin_inventory-list" */))
const _120fe141 = () => interopDefault(import('..\\pages\\admin\\post-list.vue' /* webpackChunkName: "pages_admin_post-list" */))
const _e569ca8a = () => interopDefault(import('..\\pages\\admin\\recipes.vue' /* webpackChunkName: "pages_admin_recipes" */))
const _72bd4a1e = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages_admin_users" */))
const _6628593f = () => interopDefault(import('..\\pages\\blog\\_id\\index.vue' /* webpackChunkName: "pages_blog__id_index" */))
const _451ef75d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _1b0ee9db = () => interopDefault(import('..\\pages\\_dinners\\index.vue' /* webpackChunkName: "pages__dinners_index" */))
const _782a3dcc = () => interopDefault(import('..\\pages\\_dinners\\_recipe\\index.vue' /* webpackChunkName: "pages__dinners__recipe_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _2d536fe8,
    name: "admin"
  }, {
    path: "/blog",
    component: _b92f9e8a,
    name: "blog"
  }, {
    path: "/contacts",
    component: _29fc58d0,
    name: "contacts"
  }, {
    path: "/how-it-works",
    component: _ef476dfc,
    name: "how-it-works"
  }, {
    path: "/mission",
    component: _8adc1b52,
    name: "mission"
  }, {
    path: "/reviews",
    component: _8b8cf534,
    name: "reviews"
  }, {
    path: "/true-chef",
    component: _77538430,
    name: "true-chef"
  }, {
    path: "/admin/chefs",
    component: _7ac66703,
    name: "admin-chefs"
  }, {
    path: "/admin/create-ingredient",
    component: _1c704958,
    name: "admin-create-ingredient"
  }, {
    path: "/admin/create-inventory",
    component: _d61f42b6,
    name: "admin-create-inventory"
  }, {
    path: "/admin/create-menu",
    component: _075cf526,
    name: "admin-create-menu"
  }, {
    path: "/admin/create-menu-test",
    component: _1b81f0ee,
    name: "admin-create-menu-test"
  }, {
    path: "/admin/create-post",
    component: _5878efe7,
    name: "admin-create-post"
  }, {
    path: "/admin/create-recipe",
    component: _3107d3d6,
    name: "admin-create-recipe"
  }, {
    path: "/admin/inventory-list",
    component: _1d7215c9,
    name: "admin-inventory-list"
  }, {
    path: "/admin/post-list",
    component: _120fe141,
    name: "admin-post-list"
  }, {
    path: "/admin/recipes",
    component: _e569ca8a,
    name: "admin-recipes"
  }, {
    path: "/admin/users",
    component: _72bd4a1e,
    name: "admin-users"
  }, {
    path: "/blog/:id",
    component: _6628593f,
    name: "blog-id"
  }, {
    path: "/",
    component: _451ef75d,
    name: "index"
  }, {
    path: "/:dinners",
    component: _1b0ee9db,
    name: "dinners"
  }, {
    path: "/:dinners/:recipe",
    component: _782a3dcc,
    name: "dinners-recipe"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
