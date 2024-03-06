import { useEffect, useState } from 'react'


export default function DummyBracket({ accessToken, tokenType }) {  
    const [ bracket, setBracket ] = useState({
        id: "lalala",
        rounds: [
            {
                number: 1,
                final: false,
                matches: [
                    {
                        number: 1,
                        a: "one",
                        b: "two",
                        pick: ""
                    },
                    {
                        number: 2,
                        a: "three",
                        b: "four",
                        pick: ""
                    },
                    {
                        number: 3,
                        a: "five",
                        b: "six",
                        pick: ""
                    },
                    {
                        number: 4,
                        a: "seven",
                        b: "eight",
                        pick: ""
                    }
                ]
            },
            {
                number: 2,
                final: false,
                matches: [
                    {
                        number: 1,
                        a: "",
                        b: "",
                        pick: ""
                    },
                    {
                        number: 2,
                        a: "",
                        b: "",
                        pick: ""
                     }
                ]
            },
            {
                number: 3,
                final: true,
                matches: [
                    {
                        number: 1,
                        a: "",
                        b: "",
                        pick: ""
                    }
                ],
            }
        ]
    })

    useEffect(() => {
        console.log("Bracket Changed!")
        console.log(bracket)
    }, [ bracket ])

    const handleMatchPick = (round, match, pick) => {
        let bracketCopy = bracket
        bracketCopy.rounds[round-1].matches[match-1].pick = pick
        if (round === 1 && match === 1) {
            bracketCopy.rounds[1].matches[0].a = pick
        }

        else if (round === 1 && match === 2) {
            bracketCopy.rounds[1].matches[0].b = pick
        }

        else if (round === 1 && match === 3) {
            bracketCopy.rounds[1].matches[1].a = pick
        }

        else if (round === 1 && match === 4) {
            bracketCopy.rounds[1].matches[1].b = pick
        }

        else if (round === 2 && match === 1) {
            bracketCopy.rounds[2].matches[0].a = pick
        }

        else if (round === 2 && match === 2) {
            bracketCopy.rounds[2].matches[0].b = pick
        }

        else if (round === 3 && match === 1) {
            console.log("here")
            // bracketCopy.rounds[3].matches[0].
        }
        setBracket({
            id: bracketCopy.id,
            rounds: { ...bracketCopy.rounds }
        })
    }

    const saveBracket = () => {
        console.log(bracket)
    }
    return (<>
        <div className={`grid grid-cols-4 gap-10 items-center`}>
            {/* Round One */}
            <div>
                {/* Match One */}
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(1, 1, "one") }>
                        <p>{ bracket.rounds[0].matches[0].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(1, 1, "two") }>
                        <p>{ bracket.rounds[0].matches[0].b }</p>
                    </div>
                </div>

                {/* Match Two */}
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(1, 2, "three") }>
                        <p>{ bracket.rounds[0].matches[1].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(1, 2, "four") }>
                        <p>{ bracket.rounds[0].matches[1].b }</p>
                    </div>
                </div>

                {/* Match Three */}
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(1, 3, "five") }>
                        <p>{ bracket.rounds[0].matches[2].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(1, 3, "six") }>
                        <p>{ bracket.rounds[0].matches[2].b }</p>
                    </div>
                </div>

                {/* Match Four */}
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(1, 4, "seven") }>
                        <p>{ bracket.rounds[0].matches[3].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(1, 4, "eight") }>
                        <p>{ bracket.rounds[0].matches[3].b }</p>
                    </div>
                </div>
            </div>

            {/* Round Two */}
            <div className="">
                {/* Match One */}
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(2, 1, `${ bracket.rounds[1].matches[0].a }`) }>
                        <p>{ bracket.rounds[1].matches[0].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(2, 1, `${ bracket.rounds[1].matches[0].b }`) }>
                        <p>{ bracket.rounds[1].matches[0].b }</p>
                    </div>
                </div>

                {/* Match Two */}
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(2, 2, `${ bracket.rounds[1].matches[1].a }`) }>
                        <p>{ bracket.rounds[1].matches[1].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(2, 2,  `${ bracket.rounds[1].matches[1].b }`) }>
                        <p>{ bracket.rounds[1].matches[1].b }</p>
                    </div>
                </div>
            </div>

            {/* Round Three */}
            <div className="">
                <div className="border-2 mb-8">
                    <div className="border-b-2 p-2 h-12" onClick={ () => handleMatchPick(3, 1, `${ bracket.rounds[2].matches[0].a }`) }>
                        <p>{ bracket.rounds[2].matches[0].a }</p>
                    </div>
                    <div className="p-2 h-12" onClick={ () => handleMatchPick(3, 1, `${ bracket.rounds[2].matches[0].b }`) }>
                        <p>{ bracket.rounds[2].matches[0].b }</p>
                    </div>
                </div>
            </div>

            {/* Champion */}
            <div className="">
                <div className="border-2 mb-8">
                    <div className="p-2 h-12">
                        <p>{ bracket.rounds[2].matches[0].pick }</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div onClick={ saveBracket }>
                Save Bracket
            </div>
        </div>
    </>)
}