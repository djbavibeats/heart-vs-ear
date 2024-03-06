import { useEffect, useState } from 'react'

import Round from './Round.jsx'
import Seed from './Seed.jsx'

import songs from './utils/songs'
import seeds from './utils/seeds'

export default function Bracket({ accessToken, tokenType }) {
    const [ tracks, setTracks ] = useState(null)

    const [ participants, setParticipants ] = useState(0)
    const [ rounds, setRounds ] = useState([])
    const [ userBracket, setUserBracket ] = useState([])

    const [ loading, setLoading ] = useState(true)
    const [ initialized, setInitialized ] = useState(false)

    const constructRound = (p, n) => {
        let matches = []
        let count = 0
        for (let i = 0; i < p.length; i+=2) {
            matches.push({
                matchNumber: count,
                a: p[i],
                b: p[i+1],
                winner: null
            })
            count++
        }
        let round = {
            number: n,
            complete: false,
            matches: matches
        }
        setRounds([
            ...rounds,
            round
        ])
    }

    useEffect(() => {
        if (initialized) {
            console.log("Round One Intialized", rounds)
        }
    }, [ rounds ])

    useEffect(() => {
        var track_ids_string = "" 
        var possible = Math.log(seeds.length) / Math.log(2)
        console.log("Checking if it possible to form a bracket with number of songs given (" + seeds.length + ").")
        if (possible % 1 !== 0) {
            console.log("Stop right there! I can't make a bracket with that many tracks!")
        } else {
            console.log("Valid number of tracks for bracket creation. There will be " + possible + " rounds.")
            setParticipants(seeds.length)

            // Setup Round 1
            let participants = seeds
            constructRound(participants, 1)
            setInitialized(true)
            // songs.map((song, index) => {
            //     if (index === 0) {
            //         track_ids_string = song.spotify_id
            //     } else {
            //         track_ids_string = track_ids_string + "%2C" + song.spotify_id
            //     }
            // })
            // fetch(`http://localhost:5000/spotify/get-bracket-tracks?trackIDsString=${track_ids_string}&access_token=${accessToken}&token_type=${tokenType}`)
            //     .then(resp => resp.json())
            //     .then(data => {
            //         setTracks(data.data.tracks)
            //     })
        }
    }, [])

    useEffect(() => {
        if (tracks) {
            console.log("We've got tracks.")
            console.log(tracks)
            setLoading(false)
        } else {
            // console.log("No tracks yet.")
        }
    }, [ tracks ])
    
    const moveToNextRound = (bool, r) => {
        if (bool) {
            console.log("Ready for next round", r)
            let nextRoundParticipants = r.matches.map(match => {
                return match.winner
            })
            console.log(nextRoundParticipants)
            constructRound(nextRoundParticipants, r.number+1)
            
        } else {
            console.log("Not ready for next round", r)
        }
    }

    useEffect(() => {
        console.log("User bracket updated!")
        console.log(userBracket)
    }, [ userBracket ])

    const renderRounds = (rounds) => {
        return Array.from(
            { length: rounds.length },
            (_, i) => {
                return (<div className="col-span-1" key={ i }>
                    <Round  
                        round={ rounds[i] } 
                        moveToNextRound={ moveToNextRound }
                    />
                </div>)
            }
        )
    }

    return (<>
        { initialized &&
        
            <>
                <div className={`grid grid-cols-4 gap-10 items-center`}>
                    {/* Round One */}
                    {/* { renderRounds(rounds) } */}
                    <div>
                        {/* Match One */}
                        <div className="border-2 mb-8">
                            <div className="border-b-2 p-2">
                                <p>One</p>
                            </div>
                            <div className="p-2">
                                <p>Two</p>
                            </div>
                        </div>

                        {/* Match Two */}
                        <div className="border-2 mb-8">
                            <div className="border-b-2 p-2">
                                <p>Three</p>
                            </div>
                            <div className="p-2">
                                <p>Four</p>
                            </div>
                        </div>

                        {/* Match Three */}
                        <div className="border-2 mb-8">
                            <div className="border-b-2 p-2">
                                <p>Five</p>
                            </div>
                            <div className="p-2">
                                <p>Six</p>
                            </div>
                        </div>

                        {/* Match Four */}
                        <div className="border-2 mb-8">
                            <div className="border-b-2 p-2">
                                <p>Seven</p>
                            </div>
                            <div className="p-2">
                                <p>Eight</p>
                            </div>
                        </div>
                    </div>

                    {/* Round Two */}

                    {/* Round Three */}

                    {/* Round Four */}
                </div>
            </>
        }
            {/* Round One: 32 Participants */}

            {/* Round Two: 16 Participants */}

            {/* Round Three: 8 Participants */}

            {/* Round Four: 4 Participants */}

            {/* Round Five: 2 Participants */}
            {/*
            <div>
                { loading === false &&
                    tracks.map((track, index) => {
                        if (index % 2 === 0) {
                            return <Round 
                                key={ index }
                                seedA={ tracks[index] }
                                seedB={ tracks[index+1]}
                            />
                            // if (index === 0) {
                            //     console.log('first round')
                            // } else if (index === (tracks.length-1)) {
                            //     console.log('last round')
                            // }
                        }
                        // console.log(tracks[index].name)
                        // console.log(tracks[index+1].name)
                        // return <Seed key={ index } track={ track } />
                    })
                }
            </div>
            */}
    </>)
}