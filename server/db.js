const { Sequelize } = require("sequelize")

const connection = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
})

connection.authenticate()
    .then(() => console.log("Database connection established"))
    .catch(err => console.log("Database error: ", err))

module.exports = connection
