import { useRef, useEffect, useState } from 'react'
import { Howl } from 'howler'
import songs from './utils/songs'
import symbolLogo from './assets/symbol-logo.png'

import { autofill } from './utils/autofill'

let url = 'https://heart-vs-ear.onrender.com'
// let url = 'http://localhost:5000'

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear()
        let difference = +new Date(`2024-03-17T00:00:00`) - +new Date()

        let timeLeft = {}

        if (difference >= 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60 )) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }

        return timeLeft
    }

    const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearTimeout(timer)
    })

    const timerComponents = []

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div key={ interval } className="w-[70px] h-[80px] flex flex-col items-center justify-center">
                <p className="leading-[42px] text-[42px] font-ultra-condensed tracking-[2px]">{ timeLeft[interval] }</p>
                <p className="leading-[18px] font-ultra-condensed tracking-[2px]">{ interval }</p>
            </div>
        )
    })

    return (<>
            { timerComponents }
    </>)


}

const OrientationPrompt = () => {
    return (<>
        <p>Orientation Prompt</p>
    </>)
}
export default function Bracket({ accessToken , tokenType, user }) {    
    const [ participantsReady, setParticipantsReady ] = useState(false)
    const [ instructionVisible, setInstructionVisible ] = useState(false)
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
                    let divisionOneTracks = []
                    data.data.tracks.map(track => {
                        divisionOneTracks.push({
                            album: {
                                images: track.album.images[0]
                            },
                            artists: track.artists,
                            external_urls: track.external_urls,
                            href: track.href,
                            id: track.id,
                            name: track.name,
                            type: track.type,
                            uri: track.uri,
                            preview_url: track.preview_url ? track.preview_url : "unavailable"
                        })
                    })
                    participants.divisions[0] = divisionOneTracks
                    fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionTwoIds}`)
                        .then(resp => resp.json())
                        .then(data => {
                            let divisionTwoTracks = []
                            data.data.tracks.map(track => {
                                divisionTwoTracks.push({
                                    album: {
                                        images: track.album.images[0]
                                    },
                                    artists: track.artists,
                                    external_urls: track.external_urls,
                                    href: track.href,
                                    id: track.id,
                                    name: track.name,
                                    type: track.type,
                                    uri: track.uri,
                                    preview_url: track.preview_url ? track.preview_url : "unavailable"
                                })
                            })
                            participants.divisions[1] = divisionTwoTracks
                            fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionThreeIds}`)
                                .then(resp => resp.json())
                                .then(data => {
                                    let divisionThreeTracks = []
                                    data.data.tracks.map(track => {
                                        divisionThreeTracks.push({
                                            album: {
                                                images: track.album.images[0]
                                            },
                                            artists: track.artists,
                                            external_urls: track.external_urls,
                                            href: track.href,
                                            id: track.id,
                                            name: track.name,
                                            type: track.type,
                                            uri: track.uri,
                                            preview_url: track.preview_url ? track.preview_url : "unavailable"
                                        })
                                    })
                                    participants.divisions[2] = divisionThreeTracks
                                    fetch(`${url}/spotify/get-bracket-tracks?access_token=${accessToken}&token_type=${tokenType}&ids=${divisionFourIds}`)
                                        .then(resp => resp.json())
                                        .then(data => {
                                            let divisionFourTracks = []
                                            data.data.tracks.map(track => {
                                                divisionFourTracks.push({
                                                    album: {
                                                        images: track.album.images[0]
                                                    },
                                                    artists: track.artists,
                                                    external_urls: track.external_urls,
                                                    href: track.href,
                                                    id: track.id,
                                                    name: track.name,
                                                    type: track.type,
                                                    uri: track.uri,
                                                    preview_url: track.preview_url ? track.preview_url : "unavailable"
                                                })
                                            })
                                            participants.divisions[3] = divisionFourTracks
                                            setParticipantsReady(true)
                                            setBracketReady(true)
                                        })
                                })
                        })
                })
        })
    }

    useEffect(() => {
        if (participantsReady) {
            // Setup Rounds
            if (user.bracket.length !== 0) {
                setBracket(user.bracket[0])
            } else {
                var initBracket = {
                    id: user._id,
                    divisions: [],
                    divisionChamps: [
                        {
                            "set": 0,
                            "pick": ""
                        },
                        {
                            "set": 1,
                            "pick": ""
                        },
                        {
                            "set": 2,
                            "pick": ""
                        },
                        {
                            "set": 3,
                            "pick": ""
                        }
                    ],
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
                    championship: [
                        {
                            "set": 0,
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
        }
    }, [ participantsReady ])

    const [ party, setParty ] = useState(init)
    const [ bracket, setBracket ] = useState(null)
    const [ bracketReady, setBracketReady ] = useState(false)
    const [ submitting, setSubmitting ] = useState(false)

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
        console.log(bracket)
        bracketCopy.semifinals[set].pick = pick
        setBracket({ ...bracketCopy })
    }

    const handleChampionshipPick = (pick) => {
        let bracketCopy = bracket
        bracketCopy.champion = pick
        setBracket({ ...bracketCopy })
    }

    const autofillBracket = () => {
        let autoBracket = autofill(bracket)
        setBracket({ ...autoBracket })
    }
    
    const clearBracket = () => {
        var initBracket = {
        	id: user._id,
            divisions: [],
            divisionChamps: [
                {
                    "set": 0,
                    "pick": ""
                },
                {
                    "set": 1,
                    "pick": ""
                },
                {
                    "set": 2,
                    "pick": ""
                },
                {
                    "set": 3,
                    "pick": ""
                }
            ],
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
            championship: [
                {
                    "set": 0,
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

    const handleSaveBracket = () => {
        let saveBracket = bracket
        setSubmitting(true)
        fetch(`${url}/database/users/update-bracket`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(saveBracket)
        }).then(resp => resp.json())
        .then(data => {
            setSubmitting(false)
        })
        /*
        THIS STUFF ALL HAS TO DO WITH PLAYLIST SAVING
        let winnerURIs = []
        saveBracket.divisions.map(round => {
            for (let i = 0; i < round.length; i++) {
                if (round[i].number === 0) {
                    round[i].matches.map(match => {
                        console.log(match.pick.uri)
                        winnerURIs.push(match.pick.uri)
                        
                    })
                }
            }
        })
        fetch(`${url}/spotify/make-bracket-playlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                spotifyId: user.spotifyId,
                spotifyRefreshToken: user.spotifyRefreshToken,
                winnerURIs: winnerURIs
            })
        })
        */
    }

    useEffect(() => {
    }, [ bracket ])

    const toggleInstructionsModal = () => {
        setInstructionVisible(!instructionVisible)
    }
    // let matchcounter = -1

    const renderText = (matchname) => {
        if (matchname) {
            if (matchname.split('').length >= 15) {
                return (<div className="relative flex overflow-x-hidden w-full">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="font-ultra-condensed tracking-wide text-xl mx-2">{ matchname }</span>
                        <span className="font-ultra-condensed tracking-wide text-xl mx-2">{ matchname }</span>
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
                        <span className="font-ultra-condensed tracking-wide text-xl mx-2">{ matchname }</span>
                        <span className="font-ultra-condensed tracking-wide text-xl mx-2">{ matchname }</span>
                    </div>
                </div>)
            } else {
                return (<div><span className="font-ultra-condensed tracking-wide text-xl mx-2">{ matchname }</span></div>)
            }
        }
    }

    useEffect(() => {
        if (bracketReady) {
            document.querySelector('html').style.minWidth = '1400px'
            document.querySelector('body').style.minWidth = '1400px'
        } else {
            console.log('not yet')
        }
    }, [ bracketReady ])

    const previewAudio = useRef(new Howl({ 
        src: "https://p.scdn.co/mp3-preview/b3368b85360333a9cb4b3242ad431179bd1b14bf?cid=9a35c8ababfc499ba5d709d474eebc73",
        html5: true
    }))

    const [ currentPreview, setCurrentPreview ] = useState({ match: '', participant: '' })

    const playAudioPreview = (matchnumber, track) => {
        console.log(matchnumber)

        if (currentPreview.match === matchnumber && previewAudio.current._src === track.preview_url) {
            setCurrentPreview({
                match: "",
                participant: ""
            })
            previewAudio.current.stop()
        } else {
            setCurrentPreview({
                match: matchnumber,
                participant: track.id
            })
            previewAudio.current.unload()
            previewAudio.current._src = track.preview_url
            previewAudio.current.stop()
            previewAudio.current.play()
        }
    }

    const renderAlbumArt = (match, participant) => {
        console.log(participant)
        return (<div className="relative">
            { participant.preview_url === "unavailable" ? "" : 
                <div onClick={ () => playAudioPreview(match.number, participant) } className="absolute h-[50px] w-[50px] top-0 right-0 bottom-0 left-0 flex items-end justify-start p-1">
                { currentPreview.match === match.number 
                    ? currentPreview.participant === participant.id ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                        <path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                        <path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                    </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                </svg>  }
                </div>
            }
            <img className="z-10 min-h-[50px] h-[50px] min-w-[50px] w-[50px]" src={` ${ participant.album.images.url || "" } `} />
        </div>)
    }

    const renderChampionshipAlbumArt = (match, participant) => {
        return (<div className="relative">
            { participant.preview_url === "unavailable" ? "" : 
                <div onClick={ () => playAudioPreview(98, participant) } className="absolute h-[100px] w-[100px] top-0 right-0 bottom-0 left-0 flex items-end justify-start p-1">
                { currentPreview.match === 98 
                    ? currentPreview.participant === participant.id ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                        <path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                        <path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                    </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                </svg>  }
                </div>
            }
            <img className="object-contain z-10 mt-[1px]  h-[98px] w-[98px]" src={` ${ participant.album.images.url || "" } `} />
        </div>)
    }
    
    return (<>
    <div>
    { submitting &&
        <div className="absolute z-[999] h-full w-full bg-black top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <p>Submitting your bracket...</p>
        </div>
    }
    {
        !bracketReady &&
        <div className="absolute z-0 h-full w-full bg-black top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            Loading...
        </div>
    }
    { bracketReady &&
        bracket && <>
        {/* TODO: Make it so you are prompted to view the device in landscape mode on mobile */}
        {/* <OrientationPrompt /> */}
        <div className="flex flex-col gap-4 items-center bracket-container text-white">
            <div className="max-w-[28rem] items-center flex-wrap justify-center flex gap-4 z-10">
                <div className="min-w-52 flex flex-row items-center justify-center gap-x-2 
                    bg-transparent text-white font-bold border-2
                    px-4 py-3 rounded-xl text-center hover:cursor-pointer hover:scale-105 transition-all" 
                    onClick={ autofillBracket }
                >
                    <div className="mt-[1.75px]"><p className="text-sm">AUTOFILL BRACKET</p></div> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                    </svg>
                </div>
                
                <div className="min-w-52 flex flex-row items-center justify-center gap-x-2 
                    bg-transparent text-white font-bold border-2
                    px-4 py-3 rounded-xl text-center hover:cursor-pointer hover:scale-105 transition-all" 
                    onClick={ clearBracket }
                >
                    <div className="mt-[1.75px]"><p className="text-sm">CLEAR BRACKET</p></div> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/>
                    </svg>
                </div>
                
                <div className="min-w-52 flex flex-row items-center justify-center gap-x-2 bg-gradient-to-t from-cyan-400 to-ip-blue text-black font-bold drop-shadow-glow-sm px-4 py-3 rounded-xl text-center hover:cursor-pointer hover:scale-105 transition-all" 
                    onClick={ handleSaveBracket }
                >
                    <div className="mt-[1.75px]"><p className="text-sm">SAVE BRACKET</p></div> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                        <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>  
                    </svg>
                </div>
            </div>
            <div className="flex flex-col items-center z-10">
                <div className='flex items-center'>
                    <p className="text-center -mr-[10px]
                        bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
                        text-[20px] md:text-[32px] font-ultra-condensed tracking-[4px] md:tracking-[14px]
                    ">NEXT ROUND</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <CountdownTimer />
                </div>
                <div className="mt-2 flex flex-row items-center justify-center gap-x-2 
                    bg-transparent text-white font-bold border-2
                    px-4 py-3 rounded-xl text-center hover:cursor-pointer hover:scale-105 transition-all" 
                    onClick={ toggleInstructionsModal }
                >
                    <div className="mt-[1.75px]"><p className="text-sm">HOW TO PLAY</p></div> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                    </svg>
                </div>

            </div>
        </div>
        <div className="grid grid-cols-4 gap-1 md:gap-8 min-w-[1400px] p-2 z-1 relative -mt-[300px] md:-mt-[335px] text-white">
            {/* Division 1 */}
            <div className={ `flex flex-col gap-5 col-span-2 md:col-span-2 h-full w-full` }>
                <div key={ 0 } className={`division-${ 0 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense h-full" dir={ `${ 0 === 2 || 0 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[0].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`relative h-full flex flex-col justify-around gap-2`}>
                                    { roundindex === 0 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 1</div> : "" }
                                    { roundindex === 1 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 2</div> : "" }
                                    { round.matches.map((match, matchindex) => {
                                        let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images.url : "" : ""
                                        let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images.url : "" : ""
                                        return (<div key={ matchindex } className={`division-${ 0 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                            { roundindex === 2 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Sweet 16</div> : "" }
                                            { roundindex === 3 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Elite 8</div> : "" }
                                            <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border border-b-0 min-h-10 ${ 
                                                match.pick ?
                                                match.pick !== "undecided" ? 
                                                    match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                    : "bg-ip-gray-transparent" 
                                                : "bg-ip-gray-transparent "
                                            } `} onClick={ () => handleMatchPick(0, roundindex, match.set, matchindex, match.a, round.final) }>
                                                { imgurlA !== "" ? 
                                                    <>{ renderAlbumArt(match, match.a) }</>
                                                    : <div className="h-[50px] w-[50px]"></div> }
                                                { renderText(match.a.name) }
                                            </div>
                                            <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4  ${ 
                                                match.pick ?
                                                match.pick !== "undecided" ? 
                                                    match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                    : "bg-ip-gray-transparent" 
                                                : "bg-ip-gray-transparent"
                                            } `} onClick={ () => handleMatchPick(0, roundindex, match.set, matchindex, match.b, round.final) }>
                                                { imgurlB !== "" ? 
                                                    <>{ renderAlbumArt(match, match.b) }</>
                                                    : <div className="h-[50px] w-[50px]"></div> }
                                                { renderText(match.b.name) }
                                                
                                            </div>
                                        </div>)
                                    }) }
                                </div>)
                            }) }
                    </div>
                </div>
            </div>

            {/* Division 3 */}
            <div className={ `flex flex-col gap-5 col-span-2 md:col-span-2 h-full w-full` }>
                <div key={ 2 } className={`division-${ 2 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense h-full" dir={ `${ 2 === 2 || 2 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[2].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`relative h-full flex flex-col justify-around gap-2`}>
                                { roundindex === 0 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 1</div> : "" }
                                { roundindex === 1 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 2</div> : "" }
                                { round.matches.map((match, matchindex) => {
                                    let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images.url : "" : ""
                                    let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images.url : "" : ""
                                    return (<div key={ matchindex } className={`division-${ 2 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                        { roundindex === 2 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Sweet 16</div> : "" }
                                        { roundindex === 3 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Elite 8</div> : "" }
                                        <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row justify-between items-center border border-b-0 min-h-10 ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent "
                                        } `} onClick={ () => handleMatchPick(2, roundindex, match.set, matchindex, match.a, round.final) }>
                                            { imgurlA !== "" ? 
                                                <>{ renderAlbumArt(match, match.a) }</>
                                                : <div className="h-[50px] w-[50px]"></div> }
                                            { renderText(match.a.name) }
                                        </div>
                                        <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row justify-between items-center border min-h-10 mb-4  ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent"
                                        } `} onClick={ () => handleMatchPick(2, roundindex, match.set, matchindex, match.b, round.final) }>
                                            { imgurlB !== "" ? 
                                                <>{ renderAlbumArt(match, match.b) }</>
                                                : <div className="h-[50px] w-[50px]"></div> }
                                            { renderText(match.b.name) }
                                        </div>
                                    </div>)
                                }) }
                            </div>)
                        }) }
                    </div>
                </div>
            </div>
                        
            {/* Desktop Playoffs */}
            <div className={ `flex flex-col col-span-4 items-center justify-center z-50` }>
                <div className={ `flex flex-col w-full -mb-[10%] md:-mb-[10%] -mt-[30%] md:-mt-[17.5%] max-w-[612px]` }>
                    <div className={ `flex justify-center mb-8` }>
                        { bracket.champion ? <>
                            <div className={`border max-w-[250px] min-h-[360px] flex flex-1 flex-col items-center justify-center text-sm 
                                
                                ${ bracket.champion ? "bg-ip-blue drop-shadow-glow" 
                                : "bg-ip-gray-transparent"
                                }
                                hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue
                                `}>
                                <p className={ `font-ultra-condensed tracking-wide text-center text-xl px-2 h-[35px] flex items-center justify-center border-b` }>
                                    Your Champion
                                </p>
                                <p className={ `font-ultra-condensed tracking-wide text-center text-xl px-2 min-h-[75px] flex items-center justify-center` }>
                                    { bracket.champion.name }
                                </p>
                                <img className="object-contain h-[250px]" src={ bracket.champion.album.images.url } />
                            </div>
                        </>
                        : <div className={`border max-w-[250px] min-h-[360px] flex flex-1 flex-col items-center justify-center text-sm 
                        bg-ip-gray-transparent
                        hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue
                        `}>
                        <p className={ `font-ultra-condensed tracking-wide text-center text-xl px-2 h-[35px] flex items-center justify-center border-b` }>
                            Your Champion
                        </p>
                        <p className={ `font-ultra-condensed tracking-wide text-center text-xl px-2 min-h-[75px] flex items-center justify-center` }>
                            Undecided
                        </p>
                        <div className="object-contain h-[250px]"></div>
                    </div>
                        }
                    </div>
                    <div className={ `flex flex-col col-span-4 items-center justify-center mb-8` }>
                        <div className={ `flex justify-center w-full mb-2` }>
                            <p className="text-2xl text-center -mr-[10px] font-ultra-condensed w-full">Championship</p>
                        </div>
                        <div className={`gap-2 text-sm col-span-1 w-full flex flex-row`}>
                            <div className={`h-[100px] border flex flex-1 flex-row items-center justify-start text-sm 
                                    ${ bracket.champion ?
                                        bracket.champion === bracket.semifinals[0].pick ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                        : "bg-ip-gray-transparent"
                                    }
                                    hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue
                                `} onClick={ () => handleChampionshipPick(bracket.semifinals[0].pick) }>
                                { bracket.semifinals[0].pick ?
                                    <>{ renderChampionshipAlbumArt(bracket, bracket.semifinals[0].pick) }</>
                                    // <img className="object-contain h-[100px] max-h-full" src={ bracket.semifinals[0].pick.album.images.url } />
                                    : <div className="h-[100px]"></div>
                                }
                                <div className="min-h-[100px] p-1 items-center justify-center flex">
                                    <p className="font-ultra-condensed tracking-wide px-2 text-xl text-right">{ bracket.semifinals[0].pick ? bracket.semifinals[0].pick.name : "" }</p>
                                </div>
                            </div>
                            <div className={`h-[100px] border flex flex-1 flex-row-reverse items-center justify-between text-sm 
                                    ${ bracket.champion ?
                                        bracket.champion === bracket.semifinals[1].pick ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                        : "bg-ip-gray-transparent"
                                    }
                                    hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue
                                `} onClick={ () => handleChampionshipPick(bracket.semifinals[1].pick) }>
                                { bracket.semifinals[1].pick ?
                                    <>{ renderChampionshipAlbumArt(bracket, bracket.semifinals[1].pick) }</>
                                    // <img className="object-contain h-[100px] max-h-full" src={ bracket.semifinals[1].pick.album.images.url } />
                                    : <div className="h-[100px]"></div>
                                }
                                <div className="min-h-[100px] p-1 items-center justify-center flex">
                                    <p className="font-ultra-condensed tracking-wide px-2 text-xl text-left">{ bracket.semifinals[1].pick ? bracket.semifinals[1].pick.name : "" }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Semifinals */}
                    <div className={ `grid grid-cols-8 gap-2 w-full items-center` }>
                        <div className="col-span-4">
                            <div className={ `flex justify-center mb-2` }>
                                <p className="text-2xl text-center -mr-[10px] font-ultra-condensed w-full">Final Four</p>
                            </div>
                            <div className={`text-sm col-span-1`}>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-2 
                                    ${ bracket.semifinals[0].pick
                                        ? bracket.semifinals[0].pick === bracket.divisions[0].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                `} onClick={ () => handleSemifinalPick(0, 0, bracket.divisions[0].champion) }>
                                    { bracket.divisions[0].champion ?
                                        bracket.divisions[0].champion !== undefined ? 
                                        
                                        <>{ renderAlbumArt(bracket.semifinals[0], bracket.divisions[0].champion) }</>
                                        // <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[0].champion.album.images.url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl px-2">{ bracket.divisions[0].champion ? bracket.divisions[0].champion.name : "" }</p>
                                </div>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4 
                                    ${  bracket.semifinals[0].pick
                                        ? bracket.semifinals[0].pick === bracket.divisions[1].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                `} onClick={ () => handleSemifinalPick(1, 0, bracket.divisions[1].champion) }>
                                    { bracket.divisions[1].champion ?
                                        bracket.divisions[1].champion !== undefined ? 
                                        <>{ renderAlbumArt(bracket.semifinals[0], bracket.divisions[1].champion) }</>
                                        // <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[1].champion.album.images.url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl px-2">{ bracket.divisions[1].champion ? bracket.divisions[1].champion.name : "" }</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4" dir="rtl">
                            <div className={ `flex justify-center mb-2` }>
                                <p className="text-2xl text-center -mr-[10px] font-ultra-condensed w-full">Final Four</p>
                            </div>
                            <div className={`text-sm col-span-1`}>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row justify-between items-center border min-h-10 mb-2
                                    ${ bracket.semifinals[1].pick 
                                        ? bracket.semifinals[1].pick === bracket.divisions[2].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                ` } onClick={ () => handleSemifinalPick(2, 1, bracket.divisions[2].champion) }>
                                    { bracket.divisions[2].champion ?
                                        bracket.divisions[2].champion !== undefined ? 
                                        
                                        <>{ renderAlbumArt(bracket.semifinals[0], bracket.divisions[2].champion) }</>
                                        // <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[2].champion.album.images.url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl text-left px-2">{ bracket.divisions[2].champion ? bracket.divisions[2].champion.name : "" }</p>
                                </div>
                                <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row justify-between items-center border min-h-10 mb-4 
                                    ${ bracket.semifinals[1].pick 
                                        ? bracket.semifinals[1].pick === bracket.divisions[3].champion ? "bg-ip-blue" : "bg-ip-gray-transparent" 
                                        : "bg-ip-gray-transparent"
                                    }
                                `} onClick={ () => handleSemifinalPick(3, 1, bracket.divisions[3].champion) }>
                                    { bracket.divisions[3].champion ?
                                        bracket.divisions[3].champion !== undefined ? 
                                        <>{ renderAlbumArt(bracket.semifinals[0], bracket.divisions[3].champion) }</>
                                        // <img className="h-[50px] w-[50px]" src={ `${ bracket.divisions[3].champion.album.images.url }` } />
                                        : <div className="h-[50px] w-[50px]"></div>
                                        : <div className="h-[50px] w-[50px]"></div>
                                    }
                                    <p className="font-ultra-condensed tracking-wide text-xl text-left px-2">{ bracket.divisions[3].champion ? bracket.divisions[3].champion.name : "" }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Division 2 */}
            <div className={ `flex flex-col gap-5 col-span-2 md:col-span-2 h-full` }>
                <div key={ 1 } className={`division-${ 1 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense h-full" dir={ `${ 1 === 2 || 1 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[1].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`relative h-full flex flex-col justify-around gap-2`}>
                            { roundindex === 0 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 1</div> : "" }
                            { roundindex === 1 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 2</div> : "" }
                                { round.matches.map((match, matchindex) => {
                                    let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images.url : "" : ""
                                    let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images.url : "" : ""
                                    return (<div key={ matchindex } className={`division-${ 1 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                        { roundindex === 2 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Sweet 16</div> : "" }
                                        { roundindex === 3 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Elite 8</div> : "" }
                                        <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border border-b-0 min-h-10 ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent "
                                        } `} onClick={ () => handleMatchPick(1, roundindex, match.set, matchindex, match.a, round.final) }>
                                            { imgurlA !== "" ? 
                                                <>{ renderAlbumArt(match, match.a) }</>
                                                : <div className="h-[50px] w-[50px]"></div> }
                                            { renderText(match.a.name) }
                                        </div>
                                        <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center border min-h-10 mb-4  ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent"
                                        } `} onClick={ () => handleMatchPick(1, roundindex, match.set, matchindex, match.b, round.final) }>
                                            { imgurlB !== "" ? 
                                                <>{ renderAlbumArt(match, match.b) }</>
                                                : <div className="h-[50px] w-[50px]"></div> }
                                            { renderText(match.b.name) }
                                        </div>
                                    </div>)
                                }) }
                            </div>)
                        }) }
                    </div>
                </div>
            </div>

            {/* Division 4 */}
            <div className={ `flex flex-col gap-5 col-span-2 md:col-span-2 h-full` }>
                <div key={ 3 } className={`division-${ 3 } h-full flex flex-col gap-2` }>
                    <div className="grid grid-cols-4 gap-2 grid-flow-col-dense h-full" dir={ `${ 3 === 2 || 3 === 3 ? 'rtl' : 'ltr' }` }>
                        { bracket.divisions[3].map((round, roundindex) => {
                            return (<div key={ roundindex } className={`relative h-full flex flex-col justify-around gap-2`}>
                                { roundindex === 0 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 1</div> : "" }
                                { roundindex === 1 ? <div className="text-2xl text-center font-ultra-condensed w-full absolute -top-[40px]">Round 2</div> : "" }
                                { round.matches.map((match, matchindex) => {
                                    let imgurlA = match.a ? match.a !== "undecided" ? match.a.album.images.url : "" : ""
                                    let imgurlB = match.b ? match.b !== "undecided" ? match.b.album.images.url : "" : ""
                                    return (<div key={ matchindex } className={`division-${ 3 } round-${ roundindex } match-${ matchindex } text-sm`}>
                                        { roundindex === 2 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Sweet 16</div> : "" }
                                        { roundindex === 3 ? <div className="text-2xl text-center font-ultra-condensed w-full -mt-8 mb-2">Elite 8</div> : "" }
                                        <div className={`hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center justify-between border border-b-0 min-h-10 ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.a.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent "
                                        } `} onClick={ () => handleMatchPick(3, roundindex, match.set, matchindex, match.a, round.final) }>
                                            { imgurlA !== "" ? 
                                                <>{ renderAlbumArt(match, match.a) }</>
                                                : <div className="h-[50px] w-[50px]"></div> }
                                            { renderText(match.a.name) }
                                        </div>
                                        <div className={ `hover:cursor-pointer hover:drop-shadow-glow hover:bg-gradient-to-t hover:from-cyan-400 hover:to-ip-blue flex flex-row items-center justify-between border min-h-10 mb-4  ${ 
                                            match.pick ?
                                            match.pick !== "undecided" ? 
                                                match.pick.name === match.b.name ? "bg-ip-blue" : "bg-ip-gray-transparent"
                                                : "bg-ip-gray-transparent" 
                                            : "bg-ip-gray-transparent"
                                        } `} onClick={ () => handleMatchPick(3, roundindex, match.set, matchindex, match.b, round.final) }>
                                            { imgurlB !== "" ? 
                                                <>{ renderAlbumArt(match, match.b) }</>
                                                : <div className="h-[50px] w-[50px]"></div> }
                                            { renderText(match.b.name) }
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
    {
        !bracketReady &&
        <div className="bg-black h-screen"></div>
    }
    </div>
    {
        instructionVisible &&
        <div className="absolute h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,1)] top-0 left-0 right-0 bottom-0 z-50">
        <div className="max-w-[500px] py-8 px-16 flex items-center justify-start flex-col gap-8 relative">
            <div className="absolute top-4 right-1 py-1 px-1 hover:cursor-pointer text-white" onClick={ toggleInstructionsModal }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6">
                    <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </div>
            <p className="text-center
                bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
                text-[39px] md:text-[51px] font-ultra-condensed tracking-[4px] md:tracking-[14px] -mr-[18px]
            ">HOW TO PLAY</p>
            <p className="text-center mb-2">
                Join I Prevail for their bracket-ology tournament in which 64 of the band’s top performing songs will compete against each other for the title of top-streamed track!
                <br/><br/>
                Winners of each round will be determined by their streaming performance on Spotify in that pre-determined amount of time.
                <br/><br/>
                Select your picks for which track will out-stream it’s competitor, or click the autofill option to have your bracket randomly filled out for you.
                <br/><br/>
                Submit your bracket and share your picks on socials to see who will have the winning bracket!
                <br/><br/>
                There can only be one champion… “they can try to copy but they can’t compete.”
                <br/><br/>
                Participation requires a Spotify account.
            </p>
            <div className="">
                <img src={ symbolLogo } className="h-[100px]" />
            </div>
        </div>
        </div>
    }
    </>)
}