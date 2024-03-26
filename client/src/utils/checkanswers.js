const checkanswers = (userbracket, answersbracket) => {
    let checkbracket = userbracket
    // Round 1, 2, Sweet 16, and Elite 8 Scoring
    Promise.all(
        checkbracket.divisions.map((division, divisionindex) => {
            Promise.all(
                division.map((round, roundindex) => {
                    if (
                        roundindex === 0
                        // || roundindex === 1
                        // || roundindex === 2
                        // || roundindex === 3
                    ) {
                        round.matches.map((match, matchindex) => {
                            if (match.pick.name === answersbracket.divisions[divisionindex][roundindex].matches[matchindex].pick.name) {
                                return match.correct = true
                            } else {
                                return match.correct = false
                            }
                        })
                    }
                })
            )
        })
    )
    // Final Four Scoring
    // Promise.all(
    //     checkbracket.semifinals.map((semifinal, semifinalindex) => {
    //         if (semifinal.pick.name === answersbracket.semifinals[semifinalindex].pick.name) {
    //             return semifinal.correct = true
    //         } else {
    //             return semifinal.correct = false
    //         }
    //     })
    // )
    // Championship Scoring
    // if (checkbracket.champion.name === answersbracket.champion.name) {
    //     checkbracket.champion.correct = true
    // } else {
    //     checkbracket.champion.correct = false
    // }
    return checkbracket
}
export { checkanswers }