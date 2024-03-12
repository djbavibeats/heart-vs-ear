import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import spotify from './spotify.js'
import database from './database.js'

dotenv.config()

const PORT = 5000

const app = express()
app.use(bodyParser.json({ limit: '170kb' }))
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/api', (req, res) => {
    res.json({
        message: 'hi from the server!'
    })
})

app.use('/spotify', spotify)
app.use('/database', database)

app.listen(PORT, () => {
    console.log(`Server is up at port ${ PORT }`)
})