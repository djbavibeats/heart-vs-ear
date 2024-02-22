import { useEffect } from 'react'

import Seed from './Seed.jsx'

import songs from './utils/songs'

export default function Bracket({ accessToken, tokenType }) {
    useEffect(() => {
        console.log(songs)
        var track_ids_string = ""
        songs.map((song, index) => {
            console.log(index)
            if (index === 0) {
                track_ids_string = song.spotify_id
            } else {
                track_ids_string = track_ids_string + "," + song.spotify_id
            }
        })
        console.log(track_ids_string)
        fetch(`http://localhost:5000/spotify/get-bracket-tracks?trackIDsString=${track_ids_string}&access_token=${accessToken}&token_type=${tokenType}`)
            .then(resp => resp.json())
            .then(data => {
                console.log("Got tracks", data)
            })
    }, [])
    return (<>
        <div className="flex flex-col items-center">
            <div>
                <h1>Heart vs. Ear</h1>
            </div>
            <div>
                { songs.map((song, index) => {
                    return <Seed key={ index } song={ song } />
                })}
            </div>
        </div>
        
    </>)
}