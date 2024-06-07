const { Sequelize, DataTypes } = require("sequelize")

const connection = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
})

const models = {
    User: connection.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

connection.authenticate()
    .then(() => console.log("Database connection established"))
    .catch(err => console.log("Database error: ", err))

connection.sync()

module.exports = { connection, models }
