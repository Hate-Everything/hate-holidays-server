const Joi = require("joi")
require("dotenv").config()

const config = {
  redirect_uri: process.env.REDIRECT_URI,
  client_secret: process.env.NODE_ENV === 'development' ? process.env.CLIENT_SECRET_DEVELOPMENT : process.env.CLIENT_SECRET,
  proxy_url: process.env.PROXY_URL
}

const envVarsSchema = Joi.object({
  redirect_uri: Joi.string().optional(),
  client_secret: Joi.string().required(),
  proxy_url: Joi.string().optional()
})

const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = config
