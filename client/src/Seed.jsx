import { useState, useEffect } from 'react'

export default function Seed({ track }) {
    console.log(track.name)
    console.log(track.album.images[0].url)
    return (<>
        <div className="h-16 w-80 flex items-center bg-[#2f3034] hover:bg-[#ff0000] mb-2">
            <div className="h-16 w-16 flex">
                <img src={ track.album.images[0].url } />
            </div>
            <div className="h-16 w-64 flex items-center p-4">
                <p>{ track.name }</p>
            </div>
        </div>
    </>)
}