module.exports = {
  apps: [
    {
      name: "TRAINING",
      script: "./server.js",
      watch: true,
      env: {
        "PORT": 4005,
        "NODE_ENV": "production",
      }
    },
  ]
}

