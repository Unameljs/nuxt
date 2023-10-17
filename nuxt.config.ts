// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:[
    '@ant-design-vue/nuxt'
  ],
  app:{
    head:{
      link:[
        {rel:"icon",type:"image/jpeg",href:"favicon.jpg"}
      ]
    }
  }
})
