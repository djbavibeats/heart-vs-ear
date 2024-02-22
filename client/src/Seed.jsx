import { useState, useEffect } from 'react'

export default function Seed({ song }) {
    const { spotifyData, setSpotifyData } = useState(null)
    useEffect(() => {
        fetch('http://localhost:5000/api', {
            method: 'GET'
        }).then(resp => { resp.json() }).then(data => console.log(data))
    })
    useEffect(() => {

    }, [ spotifyData ])

    return (<>
        <p>{ song.seed }: { song.spotify_id }</p>
    </>)
}