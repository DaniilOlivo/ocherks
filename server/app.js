const express = require("express")
const { connection } = require("./db")
const { configAuth } = require("./auth")
const flash = require("connect-flash")
const session = require("express-session")

const app = express()
app.on("SIGINT", () => connection.close())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY ?? "test secret",
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
configAuth(app)

module.exports = app
