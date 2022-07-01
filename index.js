const express = require("express")
const bodyParser = require("body-parser")
const fetch = require("node-fetch")
const cors = require('cors')

const { client_id, client_secret, redirect_uri } = require("./config")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: "text/*" }))
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/authenticate", (req, res) => {
  const { code } = req.body

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  })
    .then((response) => response.json())
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      return res.status(400).json(error)
    });
});

app.get("/profile", (req, res) => {
  const { access_token } = req.headers
  console.log('access_token =', access_token)
  fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  })
  .then((response) => response.json())
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((error) => {
    return res.status(400).json(error)
  });
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
