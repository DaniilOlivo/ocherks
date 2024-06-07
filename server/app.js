const express = require("express")
const { connection }  = require("./db")

const app = express()
app.on("SIGINT", () => connection.close())

module.exports = app
