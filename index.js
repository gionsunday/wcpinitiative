require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const express= require('express')
const path = require('path')
const app = express()

const regRouter =  require('./routes/route')
const paystackPayment = require('./routes/paystackroute')
const {connectDB} = require('./db/dbCon')

app.use('/', express.static(path.join(__dirname,'public')))
app.use(express.json())

app.use(cors())

app.use('/wcpi/api', regRouter)
app.use('/paystack', paystackPayment)


const port = process.env.PORT
const start = async () =>{
    try {
        await connectDB(process.env.URL_STRING, console.log("Connection Successful"))
        app.listen(port, console.log(`Server is Live at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
