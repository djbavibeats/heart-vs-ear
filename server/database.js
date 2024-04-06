import express, { Router } from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const router = express.Router()

import answersbracket from './answers.js'

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

router.get('/users/get-leaderboard', async (req, res) => {
    const users = await User.find({ }).sort({ score: -1 }).limit(25)
    res.send({
        status: 200,
        users: users
    })
})


router.get('/users/score-brackets', async (req, res) => {
    // Test Single User Function
    // const user = await User.findOne({ displayName: "The Stylish Hampton Crab" })
    // let userscore = 0
    // user.bracket[0].divisions.map((division, divisionindex) => {
    //     division.map((round, roundindex) => {
    //         if (roundindex === 0 || roundindex === 1 || roundindex === 2 || roundindex === 3) {
    //             round.matches.map((match, matchindex) => {
    //                 if (match.pick.name === answersbracket.divisions[divisionindex][roundindex].matches[matchindex].pick.name) {
    //                     console.log('correct')
    //                     userscore += 1
    //                 } else {
    //                     console.log(match.pick.name)
    //                     console.log(answersbracket.divisions[divisionindex][roundindex].matches[matchindex].pick.name)
    //                 }
    //             })
    //         }
    //     })

    // })

    // user.bracket[0].semifinals.map((semifinal, semifinalindex) => {
    //     if (semifinal.pick.name === answersbracket.semifinals[semifinalindex].pick.name) {
    //         console.log('semifinal corret')
    //         userscore += 1
    //     } else {
    //         console.log('semifinal incorrect')
    //     }
    // })

    // if (user.bracket[0].champion.name === answersbracket.champion.name) {
    //     console.log('correct champion!')
    //     userscore += 1
    // }
    // console.log(userscore)
    // let updateUser = User.findOneAndUpdate(
    //     { displayName: "The Stylish Hampton Crab" },
    //     { 
    //         score: userscore
    //     }
    // ).exec()

    // Live Function
    // console.log('start scoring')
    // const users = await User.find({ hasBracket: true  })
    // users.map((user, userindex) => {
    //     let userscore = 0
    //     user.bracket[0].divisions.map((division, divisionindex) => {
    //         division.map((round, roundindex) => {
    //             if (roundindex === 0 || roundindex === 1 || roundindex === 2 || roundindex === 3) {
    //                 round.matches.map((match, matchindex) => {
    //                     if (match.pick.name === answersbracket.divisions[divisionindex][roundindex].matches[matchindex].pick.name) {
    //                         userscore += 1
    //                     }
    //                 })
    //             }
    //         })
    //     })
    //     user.bracket[0].semifinals.map((semifinal, semifinalindex) => {
    //         if (semifinal.pick.name === answersbracket.semifinals[semifinalindex].pick.name) {
    //             userscore += 1
    //         }
    //     })
    //     // Championship Scoring
    //     if (user.bracket[0].champion.name === answersbracket.champion.name) {
    //         console.log(user.displayName +  ' picked the correct champion!')
    //         userscore += 1
    //     }
    //     if (userscore >= 40) {
    //         console.log(userindex + " :" + user.displayName + " score after semifinals " + userscore)
    //     }
    //     let updateUser = User.findOneAndUpdate(
    //         { displayName: user.displayName },
    //         { 
    //             score: userscore
    //         }
    //     ).exec()
    // })

    
    
    res.send({
        status: 200,
        user: "done!"
    })
})
export default router