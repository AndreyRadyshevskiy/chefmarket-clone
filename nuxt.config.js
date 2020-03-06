export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex, nofollow" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#59b958" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "swiper/dist/css/swiper.css",
    "@/assets/scss/main.scss",
    "plyr/dist/plyr.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vue-plyr",
    "@/plugins/element-ui",
    "@/plugins/firebase",
    { src: "~/plugins/affix", ssr: false },
    { src: "~/plugins/swiper", ssr: false },
    { src: "~/plugins/ymapPlugin", ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/style-resources", "@nuxtjs/axios", "@nuxtjs/proxy"],

  styleResources: {
    scss: ["~assets/scss/mixins.scss"]
  },
  /*
   ** Build configuration
   */
  axios: {
    credentials: true,
    proxy: true
  },

  proxy: {
    "/register/": {
      target:
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB088LjzbZDiC9hSFSc1eGR63yVq5Kpvuw",
      pathRewrite: { "^/register/": "" }
    },
    "/login/": {
      target:
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB088LjzbZDiC9hSFSc1eGR63yVq5Kpvuw",
      pathRewrite: { "^/login/": "" }
    }
  },

  build: {
    transpile: [/^element-ui/, /^vue-awesome-swiper/],
    /*
     ** You can extend webpack config here
     */

    extend(config, { isClient, loaders: { vue } }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        vue.transformAssetUrls.video = ["src", "poster"];
      }
    }
  }
};
