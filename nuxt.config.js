import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    // title: 'diarydaylate',
    title: '一日遅れの日記',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/you.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/do-something.js',
    '~/plugins/zipcode.js',
    '~/plugins/eyecatch.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  router: {
    middleware: [
      'getCMS'
    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  generate: {
    // 「新人エンジニアの自習室」を参考に async を除いている
    // async routes() {

    routes() {
      const blog = axios
        .get("https://diarydaylate.microcms.io/api/v1/blogs", {
          headers: { "X-MICROCMS-API-KEY": process.env.API_KEY }
        })
        .then(res => {
          return res.data.contents.map(content => {
            // return "/blogs/" + blog.id;
            return `/${content.id}`
          });
        });
      return Promise.all([blog]).then(values => {
        return values.join().split(",");
      });

      // // Promise.all を使ってみる（エラーになる）
      // const axiosA = axios
      //   .get('https://diarydaylate.microcms.io/api/v1/blogs?limit=100', {
      //     headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      //   })
      // const result = await Promise.all([axiosA])
      //   .then(([axiosA]) => {
      //     return [
      //       axiosA.data.contents.map((content) => ({
      //         route: `/${content.id}`,
      //         payload: content
      //       }))
      //     ]
      //   })

      // // Promise.all を使ってみる（エラーになる）
      // const axiosA = axios
      //   .get('https://diarydaylate.microcms.io/api/v1/blogs?limit=100', {
      //     headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      //   })
      // const result = await Promise.all([axiosA])
      //   .then(([axiosA]) => {
      //     [
      //       axiosA.data.contents.map((content) => ({
      //         route: `/${content.id}`,
      //         payload: content
      //       }))
      //     ]
      //   })
      // return result

      // // ここのLimitは、本文のLimitと関係なく、１度作成すれば少なくてよい
      // const pages = await axios
      //   .get('https://diarydaylate.microcms.io/api/v1/blogs?limit=100', {
      //     headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      //   })
      //   .then((res) =>
      //     res.data.contents.map((content) => ({
      //       route: `/${content.id}`,
      //       payload: content
      //     }))
      //   )
      // // console.log('satouroutes=', pages)
      // return pages


      // 次のデータが取れた
      //　satouroutes= [                                                                                                17:37:26
      //   {
      //     route: '/u1hfhvny5jfr',
      //     payload: {
      //       id: 'u1hfhvny5jfr',
      //       createdAt: '2022-08-01T23:01:27.932Z',
      //       updatedAt: '2022-08-01T23:01:27.932Z',
      //       publishedAt: '2022-08-01T23:01:27.932Z',
      //       revisedAt: '2022-08-01T23:01:27.932Z',
      //       title: '小説・パンク修理・買い物・歯医者',
      //       body: '<p>昨日はいろいろあった。．．．
      //       eyecatch: [Object],
      //       category: [Object]
      //     }
      //   },
      //   {...    
      //     payload: {...
      //       category: [Object]
      //     }
      //   }
      // ]
    }
  }
}
