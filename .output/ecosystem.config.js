module.exports = {
    apps: [
      {
        name: 'nuxt-app-prod',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './server/index.mjs'
      }
    ]
  }