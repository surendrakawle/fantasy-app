module.exports = {
    apps: [
      {
        name: "fantasy-backend",
        script: "dist/server.js",
        instances: "max",
        exec_mode: "cluster"
      }
    ]
  };
  