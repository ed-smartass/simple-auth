import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'universal',
    target: 'server',
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    serverMiddleware: [
        '~/api/user.js',
    ],
    css: [
    ],
    plugins: [
        { src: '@plugins/nuxt-client-init.js', ssr: false },
        '@/plugins/axios'
    ],
    components: true,
    buildModules: [
        '@nuxtjs/vuetify'
    ],
    modules: [
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
    ],
    axios: {},
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            themes: {
                light: {
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
    build: {
    }
}
