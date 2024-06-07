const { connection, models } = require("./db")

const arg = process.argv[2]

const mapCommadns = {
    testDB: async () => {
        await connection.sync({force: true})
        await models.User.create({
            username: "Angel",
            password: "MercyHEAL!"
        })
        await models.User.create({
            username: "Sigma",
            password: "ImCoolSigma"
        })
    }
}

if (arg in mapCommadns) mapCommadns[arg]()
else console.log("Invalid command")
