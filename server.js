const app = require('./src/app')
const connectDB = require('./src/db/db')
const dotenv = require('dotenv')

dotenv.config()


connectDB()

app.listen(3000, () => {
    console.log("Server is listening on 3000")
})