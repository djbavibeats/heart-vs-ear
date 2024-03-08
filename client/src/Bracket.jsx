import { useEffect, useState } from 'react'

import songs from './utils/songs'

import namelogo from './assets/name-logo.png'

let url = 'http://localhost:5000'

export default function Bracket({ accessToken , tokenType }) {    
    const [ participantsReady, setParticipantsReady ] = useState(false)
    const [ participants, setParticipants ] = useState({
        totalParticipants: 64,
        participantsPerDivision: 16,
        divisions: [
            songs.slice(0, 16),
            songs.slice(16, 32),
            songs.slice(32, 48),
            songs.slice(48, 64),
        ]
    })

    function init() {
        console.log("initializing bracket", accessToken)
        let divisionOneIds = ""
        let divisionTwoIds = ""
        let divisionThreeIds = ""
        let divisionFourIds = ""
        Promise.all(participants.divisions.map((division, divisionindex) => {
            division.map((song, songindex) => {
                switch (divisionindex) {
                    case 0:
                        divisionOneIds += `${song.id},`
                        break
                    case 1:
                        divisionTwoIds += `${song.id},`
                        break
                    case 2:
                        divisionThreeIds += `${song.id},`
                        break
                    case 3:
                        divisionFourIds += `${song.id},`
                        break
                }
            })
        })).then(() => {
            divisionOneIds = divisionOneIds.substring(0, divisionOneIds.length - 1)
            divisionTwoIds = divisionTwoIds.substring(0, divisionTwoIds.length - 1)
            divisionThreeIds = divisionThreeIds.substring(0, divisionThreeIds.length - 1)
            divisionFourIds = divisionFourIds.substring(0, divisionFourIds.length - 1)
            fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionOneIds}`)
                .then(resp => resp.json())
                .then(data => {
                    participants.divisions[0] = data.data.tracks
                    fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionTwoIds}`)
                        .then(resp => resp.json())
                        .then(data => {
                            participants.divisions[1] = data.data.tracks
                            fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionThreeIds}`)
                                .then(resp => resp.json())
                                .then(data => {
                                    participants.divisions[2] = data.data.tracks
                                    fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionFourIds}`)
                                        .then(resp => resp.json())
                                        .then(data => {
                                            participants.divisions[3] = data.data.tracks
                                            setParticipantsReady(true)
                                            setBracketReady(true)
                                        })
                                })
                        })
                })
        })
    }

    useEffect(() => {
        console.log("Ready to setup bracket?", participantsReady)
        if (participantsReady) {
            // Setup Rounds
            var initBracket = {
                id: "userId",
                divisions: [],
                semifinals: [
                    {   
                        "set": 0,
                        "pick": ""
                    },
                    {
                        "set": 1,
                        "pick": ""
                    }
                ],
                champion: ""
            }

            for (let d = 0; d < participants.divisions.length; d++) {
                var numberOfRounds = Math.log(participants.participantsPerDivision) / Math.log(2)
                var division = []

                let roundCount = 0
                let matchCount = 0
                let setCount = 0
                let roundMatches = 0
                let roundParticipants = participants.participantsPerDivision

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
                            pick: "undecided"
                        })

                        if (matchCount % 2 === 1) { setCount = setCount += 1 }
                        matchCount = matchCount += 1
                    }

                    setCount = 0

                    // initBracket.rounds.push(roundConstructor)
                    division.push(roundConstructor)
                    roundParticipants = roundParticipants / 2
                    roundCount = roundCount += 1
                }
                initBracket.divisions.push(division)
            }

            return setBracket(initBracket)
        }
    }, [ participantsReady ])

    const [ party, setParty ] = useState(init)
    const [ bracket, setBracket ] = useState(null)
    const [ bracketReady, setBracketReady ] = useState(false)


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

    const handleSemifinalPick = (division, set, pick) => {
        let bracketCopy = bracket
        bracketCopy.semifinals[set].pick = pick
        setBracket({ ...bracketCopy })
    }

    const handleChampionshipPick = (pick) => {
        let bracketCopy = bracket
        bracketCopy.champion = pick
        setBracket({ ...bracketCopy })
    }

    const handleSaveBracket = () => {
        console.log("Bracket", bracket)
    }

    // let matchcounter = -1

    return (<>
    { bracketReady &&
        bracket && <>
        <div className="absolute top-10 left-0 right-0 flex flex-col items-center justify-center">
            <img className="max-w-[225px]" src={ namelogo } />
            <p className="
                bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
                text-[51px] font-ultra-condensed tracking-[14px]
            ">BRACKET</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-8 w-full items-center p-2">
            {/* Division 1 */}
            <div className={ `flex flex-col gap-5 col-span-2` }>
                <div key={ 0 } className={`division-${ 0 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense" dir={ `${ 0 === 2 || 0 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[0].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`h-full flex flex-col justify-around gap-2`}>
                                    { round.matches.map((match, matchindex) => {
                                        let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images[0].url : "" : ""
                                        let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images[0].url : "" : ""
                                        return (<div key={ matchindex } className={`division-${ 0 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                            <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border border-b-0 min-h-10 ${ 
                                                match.pick ?
                                                match.pick !== "undecided" ? 
                                                    match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                    : "bg-ip-gray-transparent" 
                                                : "bg-ip-gray-transparent "
                                            } `} onClick={ () => handleMatchPick(0, roundindex, match.set, matchindex, match.a, round.final) }>
                                                { imgurlA !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlA || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                                <p className="font-ultra-condensed tracking-wide text-xl pl-2 truncate">{ match.a.name }</p>
                                            </div>
                                            <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4  ${ 
                                                match.pick ?
                                                match.pick !== "undecided" ? 
                                                    match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                    : "bg-ip-gray-transparent" 
                                                : "bg-ip-gray-transparent"
                                            } `} onClick={ () => handleMatchPick(0, roundindex, match.set, matchindex, match.b, round.final) }>
                                                { imgurlB !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlB || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                                <p className="font-ultra-condensed tracking-wide text-xl pl-2 truncate">{ match.b.name }</p>
                                            </div>
                                        </div>)
                                    }) }
                                </div>)
                            }) }
                    </div>
                </div>
            </div>

            {/* Division 3 */}
            <div className={ `flex flex-col gap-5 col-span-2` }>
                <div key={ 2 } className={`division-${ 2 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense" dir={ `${ 2 === 2 || 2 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[2].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`h-full flex flex-col justify-around gap-2`}>
                                { round.matches.map((match, matchindex) => {
                                    let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images[0].url : "" : ""
                                    let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images[0].url : "" : ""
                                    return (<div key={ matchindex } className={`division-${ 2 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                        <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border border-b-0 min-h-10 ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent "
                                        } `} onClick={ () => handleMatchPick(2, roundindex, match.set, matchindex, match.a, round.final) }>
                                            { imgurlA !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlA || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                            <p className="font-ultra-condensed tracking-wide text-xl pr-2 truncate">{ match.a.name }</p>
                                        </div>
                                        <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4  ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent"
                                        } `} onClick={ () => handleMatchPick(2, roundindex, match.set, matchindex, match.b, round.final) }>
                                            { imgurlB !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlB || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                            <p className="font-ultra-condensed tracking-wide text-xl pr-2 truncate">{ match.b.name }</p>
                                        </div>
                                    </div>)
                                }) }
                            </div>)
                        }) }
                    </div>
                </div>
            </div>
                        
            {/* Playoffs */}
            <div className={ `flex flex-col col-span-4 items-center justify-center` }>
                <div className={ `flex flex-col w-full -mb-[10%] -mt-[10%] max-w-[552px]` }>
                    {/* <div className={ `flex justify-center` }>
                        { bracket.champion ? <>
                        <div className="">
                            <p className="text-center">
                                Your Champion<br />
                                { bracket.champion.name }
                            </p>
                        </div>
                        </>
                        : "" 
                        }
                    </div> */}
                    {/* Semifinals */}
                    <div className={ `grid grid-cols-8 gap-2 w-full items-center` }>
                        <div className="col-span-4">
                            <div className={ `flex justify-center` }>
                                <p>Semifinal</p>
                            </div>
                            <div className={`text-sm col-span-1`}>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-2 
                                    ${ bracket.semifinals[0].pick
                                        ? bracket.semifinals[0].pick === bracket.divisions[0].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                `} onClick={ () => handleSemifinalPick(0, 0, bracket.divisions[0].champion) }>
                                    { bracket.divisions[0].champion !== undefined ? 
                                        <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[0].champion.album.images[0].url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl pl-2 truncate">{ bracket.divisions[0].champion ? bracket.divisions[0].champion.name : "" }</p>
                                </div>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4 
                                    ${  bracket.semifinals[0].pick
                                        ? bracket.semifinals[0].pick === bracket.divisions[1].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                `} onClick={ () => handleSemifinalPick(1, 0, bracket.divisions[1].champion) }>
                                    { bracket.divisions[1].champion !== undefined ? 
                                        <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[1].champion.album.images[0].url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl pl-2 truncate">{ bracket.divisions[1].champion ? bracket.divisions[1].champion.name : "" }</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4" dir="rtl">
                            <div className={ `flex justify-center` }>
                                <p>Semifinal</p>
                            </div>
                            <div className={`text-sm col-span-1`}>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-2
                                    ${ bracket.semifinals[1].pick 
                                        ? bracket.semifinals[1].pick === bracket.divisions[2].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                ` } onClick={ () => handleSemifinalPick(2, 1, bracket.divisions[2].champion) }>
                                    { bracket.divisions[2].champion !== undefined ? 
                                        <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[2].champion.album.images[0].url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl pr-2 truncate">{ bracket.divisions[2].champion ? bracket.divisions[2].champion.name : "" }</p>
                                </div>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4 
                                    ${ bracket.semifinals[1].pick 
                                        ? bracket.semifinals[1].pick === bracket.divisions[3].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                `} onClick={ () => handleSemifinalPick(3, 1, bracket.divisions[3].champion) }>
                                    { bracket.divisions[3].champion !== undefined ? 
                                        <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[3].champion.album.images[0].url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl pr-2 truncate">{ bracket.divisions[3].champion ? bracket.divisions[3].champion.name : "" }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Championship */}
                    <div className={ `flex flex-col col-span-4 items-center justify-center` }>
                        <div className={ `flex justify-center w-full` }>
                            <p>Championship</p>
                        </div>
                        <div className={`gap-2 text-sm col-span-1 w-full flex flex-row`}>
                            <div className={`border w-[125px] flex flex-1 flex-col items-center justify-center text-sm 
                                    bg-ip-gray-transparent
                                    hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue
                                `} onClick={ () => handleChampionshipPick(bracket.semifinals[0].pick) }>
                                { bracket.semifinals[0].pick ?
                                    <img className="object-contain" src={ bracket.semifinals[0].pick.album.images[0].url } />
                                    : <div className="h-[271px]"></div>
                                }
                                <div className="min-h-[65px] p-1 items-center justify-center flex">
                                    <p className="font-ultra-condensed tracking-wide text-xl pr-2 text-center">{ bracket.semifinals[0].pick ? bracket.semifinals[0].pick.name : "" }</p>
                                </div>
                            </div>
                            <div className={`border w-[125px] flex flex-1 flex-col items-center justify-center text-sm 
                                    bg-ip-gray-transparent
                                    hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue
                                `} onClick={ () => handleChampionshipPick(bracket.semifinals[1].pick) }>
                                { console.log(bracket.semifinals[1].pick) }
                                { bracket.semifinals[1].pick ? 
                                    <img className="object-contain" src={ bracket.semifinals[1].pick.album.images[0].url } />
                                    : <div className="h-[271px]"></div> 
                                }
                                <div className="min-h-[65px] p-1 items-center justify-center flex">
                                    <p className="font-ultra-condensed tracking-wide text-xl pr-2 text-center">{ bracket.semifinals[1].pick ? bracket.semifinals[1].pick.name : "" }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Division 2 */}
            <div className={ `flex flex-col gap-5 col-span-2` }>
                <div key={ 1 } className={`division-${ 1 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense" dir={ `${ 1 === 2 || 1 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[1].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`h-full flex flex-col justify-around gap-2`}>
                                { round.matches.map((match, matchindex) => {
                                    let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images[0].url : "" : ""
                                    let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images[0].url : "" : ""
                                    return (<div key={ matchindex } className={`division-${ 1 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                        <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border border-b-0 min-h-10 ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent "
                                        } `} onClick={ () => handleMatchPick(1, roundindex, match.set, matchindex, match.a, round.final) }>
                                            { imgurlA !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlA || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                            <p className="font-ultra-condensed tracking-wide text-xl pl-2 truncate">{ match.a.name }</p>
                                        </div>
                                        <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4  ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent"
                                        } `} onClick={ () => handleMatchPick(1, roundindex, match.set, matchindex, match.b, round.final) }>
                                            { imgurlB !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlB || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                            <p className="font-ultra-condensed tracking-wide text-xl pl-2 truncate">{ match.b.name }</p>
                                        </div>
                                    </div>)
                                }) }
                            </div>)
                        }) }
                    </div>
                </div>
            </div>

            {/* Division 4 */}
            <div className={ `flex flex-col gap-5 col-span-2` }>
                <div key={ 3 } className={`division-${ 3 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense" dir={ `${ 3 === 2 || 3 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[3].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`h-full flex flex-col justify-around gap-2`}>
                                { round.matches.map((match, matchindex) => {
                                    let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images[0].url : "" : ""
                                    let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images[0].url : "" : ""
                                    return (<div key={ matchindex } className={`division-${ 3 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                        <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border border-b-0 min-h-10 ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent "
                                        } `} onClick={ () => handleMatchPick(3, roundindex, match.set, matchindex, match.a, round.final) }>
                                            { imgurlA !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlA || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                            <p className="font-ultra-condensed tracking-wide text-xl pr-2 truncate">{ match.a.name }</p>
                                        </div>
                                        <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4  ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent"
                                        } `} onClick={ () => handleMatchPick(3, roundindex, match.set, matchindex, match.b, round.final) }>
                                            { imgurlB !== "" ? <img className="h-[50px] w-[50px]" src={` ${ imgurlB || "" } `} /> : <div className="h-[50px] w-[50px]"></div> }
                                            <p className="font-ultra-condensed tracking-wide text-xl pr-2 truncate">{ match.b.name }</p>
                                        </div>
                                    </div>)
                                }) }
                            </div>)
                        }) }
                    </div>
                </div>
            </div>
        </div>
    </>}
    </>)
}