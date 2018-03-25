// Load environment variables where API keys and passwords are configured
if (process.env.NODE_ENV === "production") {
  module.exports = require("./env.prod");
} else {
  module.exports = require("./env.dev");
}
