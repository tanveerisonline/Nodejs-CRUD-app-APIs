const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
// require("dotenv/config")

//Importing Routes
const postRoute = require("./routes/post")
const getRoute = require("./routes/get")

//Middlewares
app.use(cors())
app.use(bodyParser.json())
// Routes
app.use("/", getRoute)
app.use("/post", postRoute)

// THIS IS HOW WE CAN CONNECT TO DATA BASE USING DOT ENV FILE -------START

// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
//   console.log("connected")
// )

// -----------------------END

// DB CONNECTiON

mongoose.connect(
  `mongodb+srv://tanveerisonline:Realme%4010a@nodeapis.aoq0mgx.mongodb.net/?retryWrites=true&w=majority`
)

// RUNNING APP ON LOCAL HOST SERVER ON PREFFERED PORT ID:
app.listen(3000)
