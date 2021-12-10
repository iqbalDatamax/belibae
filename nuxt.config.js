export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'belibae',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Marketplacenya orang Lombok' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
        integrity:
          'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU',
        crossorigin: 'anonymous'
      }
    ]
  },

  loading: {
    color: '#00FFFF',
    height: '10px'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css) 
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vue-image-upload.js', mode: 'client' },
    '~/plugins/vee-validate',
    '~/plugins/splide.client',
    '~plugins/vue-js-modal.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'vue-social-sharing/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  pwa: {
   meta: {
    title: 'Belibae',
    author: 'Iqbal Belibae'
   },
   manifest: {
    name: 'Belibae',
    lang: 'en',
    description: 'Marketplacenya Orang Lombok',
    orientation: 'portrait',
    background_color: '#FFFFFF',
    theme_color: '#6440b8',
   },
  },

  workbox: {
    runtimeCaching: [
        {
            urlPattern: 'https://fonts.googleapis.com/.*',
            handler: 'cacheFirst',
            method: 'GET',
            strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
        },
        {
            urlPattern: 'https://fonts.gstatic.com/.*',
            handler: 'cacheFirst',
            method: 'GET',
            strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
        },
    ]
  },

  auth: {
    strategies: {
      local: {
        token: {
        property: 'token',
        // required: true,
        // type: 'Bearer'
        },
        endpoints: {
          login: { url: '/api/auth/signin', method: 'post'},
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get'}
        }
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  //https://apiku.belibae.id/
  axios: {
    baseURL: 'https://apiku.belibae.id/' //http://localhost:8080/'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["@splidejs/vue-splide", "vee-validate/dist/rules"]
  }
}
