import { useEffect, useState } from 'react'

let participants = {
    total: 8,
    divisions: [
        [
            { name: "one" },
            { name: "two" },
            { name: "three" },
            { name: "four" },
            { name: "five" },
            { name: "six" },
            { name: "seven" },
            { name: "eight" },
        ],
        [
            { name: "nine" },
            { name: "ten" },
            { name: "eleven" },
            { name: "twelve" },
            { name: "thirteen" },
            { name: "fourteen" },
            { name: "fifteen" },
            { name: "sixteen" },
        
        ],
        [
            { name: "seventeen" },
            { name: "eighteen" },
            { name: "nineteen" },
            { name: "twenty" },
            { name: "twentyone" },
            { name: "twentytwo" },
            { name: "twentythree" },
            { name: "twentyfour" },
        
        ],
        [
            { name: "twentyfive" },
            { name: "twentysix" },
            { name: "twentyseven" },
            { name: "twentyeight" },
            { name: "twentynine" },
            { name: "thirty" },
            { name: "thirtyone" },
            { name: "thirtytwo" },        
        ]
    ]
}

function init() {
    console.log("initializing bracket")
    // Setup Rounds
    var initBracket = {
        id: "userId",
        rounds: [],
        divisions: [],
        champion: null
    }

    for (let d = 0; d < participants.divisions.length; d++) {
        var numberOfRounds = Math.log(participants.total) / Math.log(2)
        var division = []
    
        let roundCount = 0
        let matchCount = 0
        let setCount = 0
        let roundMatches = 0
        let roundParticipants = participants.total
    
        for (var i = 0; i < numberOfRounds; i++) {
            roundMatches = roundParticipants / 2 
    
            var roundConstructor = {
                number: roundCount,
                numberOfParticipants: roundParticipants,
                final: false,
                matches: []
            }
    
            if (roundMatches === 1) { roundConstructor.final = true }
    
            for (var j = 0; j < roundMatches; j++) {
                roundConstructor.matches.push({
                    number: matchCount,
                    set: setCount,
                    a: i === 0 ? participants.divisions[d][ matchCount * 2 ] : "",
                    b: i === 0 ? participants.divisions[d][ ( matchCount*2 ) + 1 ] : "",
                    pick: ""
                })
    
                if (matchCount % 2 === 1) { setCount = setCount += 1 }
                matchCount = matchCount += 1
            }
    
            setCount = 0
    
            initBracket.rounds.push(roundConstructor)
            division.push(roundConstructor)
            roundParticipants = roundParticipants / 2
            roundCount = roundCount += 1
        }
        initBracket.divisions.push(division)
    }
    return initBracket
}

export default function Bracket() {
    const [ bracket, setBracket ] = useState(init)

    useEffect(() => {
        console.log(bracket)
    }, [ bracket ])

    const handleMatchPick = (division, round, set, match, pick, isFinal) => {
        let bracketCopy = bracket
        bracketCopy.divisions[division][round].matches[match].pick = pick

        if (!isFinal) {
            if (match % 2 === 0) {
                bracketCopy.divisions[division][round+1].matches[set].a = pick
            } else if (match % 2 === 1) {
                bracketCopy.divisions[division][round+1].matches[set].b = pick
            }
        } else {
            bracketCopy.divisions[division].champion = pick
        }
        setBracket({ ...bracketCopy })
 
    }

    // let matchcounter = -1

    return (<>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 w-full items-center">
  
            { bracket.divisions.map((division, divisionindex) => {
                
                return (
                <div key={ divisionindex } className="h-full flex flex-col border-2 p-2 gap-5">
                    <div className="text-left">
                        <p className="font-bold text-2xl">Division { divisionindex + 1 }</p>
                    </div>
                    <div className="grid grid-cols-3 gap-5 grid-flow-col-dense" dir={ `${divisionindex % 2 === 0 ? 'ltr' : 'rtl' }` }>
                        { division.map((round, roundindex) => {
                            return (<div key={ roundindex } className={`h-full flex flex-col justify-around gap-10`}>
                                { round.matches.map((match, matchindex) => {
                                    // matchcounter += 1
                                    return (<div key={ matchindex } className={`border-2`}>
                                        <div className="flex items-center border-b-2 p-2" onClick={ () => handleMatchPick(divisionindex, roundindex, match.set, matchindex, match.a, round.final) }>
                                            <p>{ match.a.name }</p>
                                        </div>
                                        <div className="flex items-center p-2" onClick={ () => handleMatchPick(divisionindex, roundindex, match.set, matchindex, match.b, round.final) }>
                                            <p>{ match.b.name }</p>
                                        </div>
                                    </div>)
                                }) }
                            </div>)
                        }) }
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-2xl">Champion: { division.champion ? division.champion.name : 'Undecided' } </p>
                    </div>
                </div>
                )
            }) }
        </div>
    </>)
}