const { connection, models } = require("./db")
const { hashPassword } = require("./auth")

const arg = process.argv[2]

const mapCommadns = {
    testDB: async () => {
        await connection.sync({force: true})
        await models.User.create({
            username: "Angel",
            password: await hashPassword("MercyHEAL!")
        })
        await models.User.create({
            username: "Sigma",
            password: await hashPassword("ImCoolSigma")
        })
    }
}

if (arg in mapCommadns) mapCommadns[arg]()
else console.log("Invalid command")
