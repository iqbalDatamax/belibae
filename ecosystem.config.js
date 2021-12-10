module.exports = {
  apps: [
    {
      name: 'belibae',
      port: 3000,
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: '/var/www/appbelibae',
      args: 'start'
    },
    {
      name: 'adminbelibae',
      port: 4000,
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: '/var/www/adminbelibae',
      args: 'start'
    }
  ]
}