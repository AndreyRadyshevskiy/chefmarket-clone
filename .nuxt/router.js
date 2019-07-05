import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _2d536fe8 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */))
const _b92f9e8a = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */))
const _5878efe7 = () => interopDefault(import('..\\pages\\admin\\create-post.vue' /* webpackChunkName: "pages_admin_create-post" */))
const _120fe141 = () => interopDefault(import('..\\pages\\admin\\post-list.vue' /* webpackChunkName: "pages_admin_post-list" */))
const _72bd4a1e = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages_admin_users" */))
const _6628593f = () => interopDefault(import('..\\pages\\blog\\_id\\index.vue' /* webpackChunkName: "pages_blog__id_index" */))
const _451ef75d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
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
      path: "/admin/create-post",
      component: _5878efe7,
      name: "admin-create-post"
    }, {
      path: "/admin/post-list",
      component: _120fe141,
      name: "admin-post-list"
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
    }],

    fallback: false
  })
}
