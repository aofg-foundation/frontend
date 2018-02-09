module.exports = {
  vendor: [
    'purest',
    'request',
    'vue-i18n',
    'vue-markdown',
    'vue-progressive-image'
  ],

  plugins: [
    { src: '@/plugins/backend.js', ssr: true },
    { src: '@/plugins/i18n.js', ssr: true },
    // { src: '@/plugins/affix.js', ssr: true },
    { src: '@/plugins/builder.js', ssr: true },
    { src: '@/plugins/lazyimage.js', ssr: false }
  ],

  router: {
    middleware: 'i18n'
  },
  
  css: [
    // '@/plugins/vuse/src/stylus/app.styl',
    'bootstrap/scss/bootstrap.scss',
    '@/static/vendor/font-awesome/css/font-awesome.min.css',
    '@/static/vendor/ionicons/css/ionicons.min.css',
    // '@/static/vendor/katex/katex.min.css',
    '@/assets/css/godlike.scss'
  ],

  // modules: [
  //   '@/modules/customHandler.js'
  // ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'aofg-foundation-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'AOFG Foundation frontend' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/Loading',
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
