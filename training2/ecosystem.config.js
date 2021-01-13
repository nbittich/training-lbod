module.exports = {
  apps: [
    {
      name: "TRAINING",
      script: "./serverprod.js",
      watch: true,
      env: {
        "PORT": 4005,
        "NODE_ENV": "production",
      }
    },
  ]
}

