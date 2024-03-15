import express, { Router } from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const router = express.Router()

const url = process.env.MONGODB_URL
const { Schema, model } = mongoose
const userSchema = new Schema({
    displayName: String,
    email: String,
    spotifyRefreshToken: String,
    spotifyId: String,
    spotifyEmail: String,
    bracket: [],
    score: Number,
    hasBracket: Boolean
})
const User = model('User', userSchema)

mongoose.connect(url)

router.get('/users/get', async (req, res) => {
    const spotifyId = req.query.spotify_id || null
    const user = await User.findOne({ spotifyId: spotifyId }).exec()

    res.send({
        status: 200,
        user: user
    })
})

router.post('/users/create', async (req, res) => {
    const user = new User({
        displayName: req.body.displayName,
        spotifyRefreshToken: req.body.spotifyRefreshToken,
        spotifyId: req.body.spotifyId,
        spotifyEmail: req.body.spotifyEmail,
        bracket: [],
        hasBracket: false,
        score: 0
    })

    await user.save()
    res.send({
        status: 200,
        user: user
    })
})

router.post('/users/update-bracket', async (req, res) => {


    let updateUser = await User.findOneAndUpdate(
        { _id: req.body.id },
        { 
            bracket: req.body,
            hasBracket: true 
        }
    ).exec()

    res.send({
        status: 200,
        user: updateUser
    })
})
export default router