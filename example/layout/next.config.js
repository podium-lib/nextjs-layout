module.exports = {
  serverRuntimeConfig: {
    podium: {
      name: 'nextjs-demo',
      pathname: '/',
      podlets: [
        {
          name: 'header',
          uri: 'http://localhost:7070/manifest.json',
        },
        {
          name: 'footer',
          uri: 'http://localhost:8080/footer/manifest.json',
        }
      ]
    },
  },
}
