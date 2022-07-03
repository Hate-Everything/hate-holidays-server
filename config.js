const Joi = require("joi")
require("dotenv").config()

const config = {
  client_id: process.env.CLIENT_ID,
  redirect_uri: process.env.REDIRECT_URI,
  client_secret: process.env.CLIENT_SECRET,
  proxy_url: process.env.PROXY_URL
}

const envVarsSchema = Joi.object({
  client_id: Joi.string().required(),
  redirect_uri: Joi.string().optional(),
  client_secret: Joi.string().required(),
  proxy_url: Joi.string().optional()
})

const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = config
