const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}
const autofill = (bracket) => {
    // Regular matches
    Promise.all(bracket.divisions.map((division, divisionindex) => {
        Promise.all(
            division.map((round, roundindex) => {
                if (roundindex === 0 || roundindex === 1 || roundindex === 2) {
                    round.matches.map(match => {
                        switch (getRandomInt(2)) {
                            case (0):
                                match.pick = match.a
                                if (match.number % 2 === 0) {
                                    division[roundindex+1].matches[match.set].a = match.a
                                } else {
                                    division[roundindex+1].matches[match.set].b = match.a
                                }
                                break
                            case (1):
                                match.pick = match.b
                                if (match.number % 2 === 0) {
                                    division[roundindex+1].matches[match.set].a = match.b
                                } else {
                                    division[roundindex+1].matches[match.set].b = match.b
                                }
                                break
                            default:
                                break
                        }
                    })
                } else if (roundindex === 3) {
                    round.matches.map(match => {
                        console.log(match)
                        switch (getRandomInt(2)) {
                            case (0):
                                match.pick = match.a
                                console.log('this match needs to be assigned to the semifinals', match, divisionindex)
                                switch(divisionindex) {
                                    case (0):
                                        bracket.semifinals[0].a = match.a
                                        break
                                    case (1):
                                        bracket.semifinals[0].b = match.a
                                        break
                                    case (2):
                                        bracket.semifinals[1].a = match.a
                                        break
                                    case (3):
                                        bracket.semifinals[1].b = match.a
                                        break
                                    default:
                                        break
                                }
                                // if (divisionindex === 0 || divisionindex === 1){
                                //     bracket.semifinals[0].a = match.a
                                // }
                                break
                            case (1):
                                match.pick = match.b
                                console.log('this match needs to be assigned to the semifinals', match, divisionindex)
                                switch(divisionindex) {
                                    case (0):
                                        bracket.semifinals[0].a = match.b
                                        break
                                    case (1):
                                        bracket.semifinals[0].b = match.b
                                        break
                                    case (2):
                                        bracket.semifinals[1].a = match.b
                                        break
                                    case (3):
                                        bracket.semifinals[1].b = match.b
                                        break
                                    default:
                                        break
                                }
                                break
                            default: 
                                break
                        }
                    })
                }
            })
        )
        
    }))
    
    // Semifinals
    bracket.semifinals.map((semifinal, semifinalindex) => {
        switch (getRandomInt(2)) {
            case (0):
                // bracket.semifinals[0].pick = bracket.divisions[0].champion
                bracket.semifinals[semifinalindex].pick = bracket.semifinals[semifinalindex].a
                break
            case (1):
                // bracket.semifinals[0].pick = bracket.divisions[1].champion
                bracket.semifinals[semifinalindex].pick = bracket.semifinals[semifinalindex].b
                break
            default:
                break
        }
    })

    // switch (getRandomInt(2)) {
    //     case (0):
    //         bracket.semifinals[1].pick = bracket.divisions[2].champion
    //         break
    //     case (1):
    //         bracket.semifinals[1].pick = bracket.divisions[3].champion
    //         break
    //     default:
    //         break
    // }

    // Championship
    switch (getRandomInt(2)) {
        case (0):
            bracket.champion = bracket.semifinals[0].pick
            break
        case (1):
            bracket.champion = bracket.semifinals[1].pick
            break
        default:
            break
    }

    return bracket
}

export { autofill }