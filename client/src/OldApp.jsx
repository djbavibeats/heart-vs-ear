import { useState, useEffect } from 'react'

import DummyBracket from './DummyBracket.jsx'
import SmartBracket from './SmartBracket.jsx'

console.log("old")
function App() {
  const [ user, setUser ] = useState(null)
  const [ accessToken, setAccessToken ] = useState("")
  const [ tokenType, setTokenType ] = useState("")
  const getTokenFromUrl = () => {
    if (window.location.href.includes('?')) {
        return window.location.href
            .split('?')[1]
            .split('&')
            .reduce((initial, item) => {
                let parts = item.split('=')
                initial[parts[0]] = decodeURIComponent(parts[1])
                return initial
        }, {})
    }
  }

  useEffect(() => {
    if (accessToken !== "" && tokenType !== "") {
      fetch(`http://localhost:5000/spotify/get-user?access_token=${accessToken}&token_type=${tokenType}`)
        .then(resp => resp.json())
        .then(data => {  
          console.log("Logged user in", data)
          setUser(data.data)
        })
    }
  }, [ accessToken ])
  useEffect(() => {
    const spotifyToken = getTokenFromUrl()

    // If there is a spotify refresh token stored, then we can just use that to authenticate the user
    if (localStorage.getItem('hve_spotify_refresh')) {
      const refresh_token = localStorage.getItem('hve_spotify_refresh')
      fetch(`http://localhost:5000/spotify/refresh?refresh_token=${refresh_token}`)
        .then(resp => resp.json())
        .then(data => {
          setAccessToken(data.data.access_token)
          setTokenType(data.data.token_type)
        })
    // If there is no refresh token stored, then check to see if there is a code in the url
    } else {
      // If there is a code in the url then the user is here on a callback and should be authenticated
      if (spotifyToken) {
        fetch(`http://localhost:5000/spotify/callback?code=${ spotifyToken.code }&state=${ spotifyToken.state }`)
          .then(resp => resp.json())
          .then(data => {
            if (data.status === 200) {
              localStorage.setItem('hve_spotify_refresh', data.data.refresh_token)
              setAccessToken(data.data.access_token)
              setTokenType(data.data.token_type)
            }
          })
      // If there is nothing then we just wait
      } else {
        console.log('there is not a spotify token in the url, is there one in local storage?')
      }
    }
  }, [])

  const spotifyAuth = () => {
    console.log('letsa go')
    window.open(`http://localhost:5000/spotify/login`, '_self')
  }

  return (<>
    <div className="w-screen h-screen bg-black text-white p-8">
      {/* { !user &&
        <div className="border-white border-[3px] p-4 rounded-full min-w-40 text-center hover:cursor-pointer" onClick={ spotifyAuth }>
          Spotify Login
        </div>
      } */}
      {
        user &&
        // <div>
        <DummyBracket
          accessToken={ accessToken }
          tokenType={ tokenType }
        />

        // </div>
      }
      <SmartBracket />
    </div>
    </>)
}

export default App
