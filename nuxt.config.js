const resolve = require('path').resolve
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'DealsWill Online Shopping Promotions - The Latest Coupons & Promo Codes - DealsWill.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/reset.css',
    '~assets/css/common.css',
    '~assets/css/style.css'
  ],
  cache: {
    max: 1000,
    maxAge: 900000
  },
  dev: (process.env.NODE_ENV !== 'production'),
  plugins: ['~plugins/vue-svg-icon', '~plugins/vue2-toast', '~plugins/config', '~plugins/vue-awesome-swiper', '~plugins/vuejs-paginate'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    plugins: [
      new ExtractTextPlugin({
        filename: (getPath) => {
          return getPath('css/[name].css').replace('css/js', 'css')
        },
        allChunks: true
      })
    ],
    vendor: [
      'axios',
      'qs',
      './utils/fetch.js',
      './utils/Global.js',
      './utils/utils.js'
    ],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    extendRoutes(routes) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/notFound.vue')
      })
    },
    scrollBehavior(to, from, savedPosition) {
      // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // 目标页面子组件少于两个
        if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
          // 如果目标页面子组件中存在配置了scrollToTop为true
          position = { x: 0, y: 0 }
        }
        // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  }
}
