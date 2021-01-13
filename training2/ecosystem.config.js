module.exports = {
  apps: [
    {
      name: "Management_PROD",
      script: "./server.js",
      watch: true,
      env: {
        "PORT": 4005,
        "NODE_ENV": "production",
      }
    },
  ]
}

