export default defineNuxtConfig({
  components: {
        global: true,
        dirs: ['~/components']
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt','nuxt-icon'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
  // components: [
  //   {
  //     path: '~/components',
  //     pathPrefix: false,
  //   },
  // ],
})