import path from "path";
const env = require("dotenv");

env.config({ path: path.join(__dirname, "../.env") });

const config = {
  env: {
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    isTest: process.env.NODE_ENV === "test",
  },
};

module.exports = config;
