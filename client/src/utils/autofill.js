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
                        switch (getRandomInt(2)) {
                            case (0):
                                match.pick = match.a
                                bracket.divisions[divisionindex].champion = match.a
                                break
                            case (1):
                                match.pick = match.b
                                bracket.divisions[divisionindex].champion = match.b
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
    switch (getRandomInt(2)) {
        case (0):
            bracket.semifinals[0].pick = bracket.divisions[0].champion
            break
        case (1):
            bracket.semifinals[0].pick = bracket.divisions[1].champion
            break
        default:
            break
    }

    switch (getRandomInt(2)) {
        case (0):
            bracket.semifinals[1].pick = bracket.divisions[2].champion
            break
        case (1):
            bracket.semifinals[1].pick = bracket.divisions[3].champion
            break
        default:
            break
    }

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