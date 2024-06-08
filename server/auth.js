const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { User } = require("./db").models

async function hashPassword(password, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
} 

function configAuth(app=express()) {
    app.use(passport.initialize())
    app.use(passport.session())

    app.get("/login", (req, res) => {

        res.send("Login page " + req.flash('error'))
    })

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))

    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const resultUser = await User.findOne({where: {username}})
            if (!resultUser) return done(null, false, {message: "User with this username not found"})
            if (await bcrypt.compare(password, resultUser.password)) return done(null, resultUser)
            else return done(null, false, {message: "Incorrect password"})    
        } catch (err) {
            return done(err)
        }
    }))

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
    }))

    app.use((req, res, next) => {
        if (req.user) next()
        else res.redirect("/login")
    })
}

module.exports = { configAuth, hashPassword }