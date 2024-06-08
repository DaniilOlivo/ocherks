const app = require("./server/app")
require("dotenv").config()

const PORT = process.env.PORT ?? 5000

app.listen(PORT, "0.0.0.0", () => console.log("http://127.0.0.1:" + PORT))
