import { useEffect } from 'react'
import { useState } from 'react'

import Seed from './Seed.jsx'

const Match = ({ number, match, userRound, handleUserRoundChange }) => {
    const [ userMatch, setUserMatch ] = useState(match)

    useEffect(() => {
        handleUserRoundChange(userMatch)
    }, [ userMatch ])

    const handleChoice = (pick) => {
        setUserMatch({
            ...userMatch,
            winner: pick
        })
    }

    return (<div className="border-2 mb-4">
        <div
            className="border-b-2 p-4" 
            onClick={ () => handleChoice(match.a) }>
            { match.a.name } { userMatch.winner && userMatch.winner.name === match.a.name ? " - Chosen Winner!" : "" }
        </div>
        <div
            className="border-b-2 p-4"
            onClick={ () => handleChoice(match.b) }>
            { match.b.name } { userMatch.winner && userMatch.winner.name === match.b.name ? " - Chosen Winner!" : "" }
        </div>
    </div>)
}

export default function Round({ round, moveToNextRound }) {
    const [ userRound, setUserRound ] = useState(round)

    useEffect(() => {
        if (userRound.matches.every(match => match.winner !== null)) {
            moveToNextRound(true, userRound)
        } else {
            moveToNextRound(false, userRound)
        }
    }, [ userRound ])

    const handleUserRoundChange = (stuff) => {
        let copy = userRound
        copy.matches[stuff.matchNumber].winner = stuff.winner
        setUserRound({
            ...copy
        })
    }

    return (<>
        { round.matches.map((match, index) => {
            return (<Match 
                key={ index } 
                number={ index } 
                match={ match } 
                userRound={ userRound } 
                handleUserRoundChange={ handleUserRoundChange }
            />)
        }) }
    </>)

}