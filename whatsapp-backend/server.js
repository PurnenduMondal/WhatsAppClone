//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher"
import cors from 'cors'
import dotenv from 'dotenv'

//app config
const app = express()
const port = process.env.PORT || 5000
dotenv.config()

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER
});



//middleware
app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection
db.once('open', () =>{
    console.log("db is connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

//api routes
app.get('/', (req, res) => {res.status(200).send("hello world")})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) =>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) =>{
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`Listening on port: ${port}`))
