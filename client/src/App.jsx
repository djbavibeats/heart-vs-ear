import { useState, useEffect } from 'react'

import Bracket from './Bracket'
import namelogo from './assets/name-logo.png'
import symbolLogo from './assets/symbol-logo.png'

let url = 'https://heart-vs-ear.onrender.com'

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
      fetch(`${url}/spotify/get-user?access_token=${accessToken}&token_type=${tokenType}`)
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
      fetch(`${url}/spotify/refresh?refresh_token=${refresh_token}`)
        .then(resp => resp.json())
        .then(data => {
          setAccessToken(data.data.access_token)
          setTokenType(data.data.token_type)
        })
    // If there is no refresh token stored, then check to see if there is a code in the url
    } else {
      // If there is a code in the url then the user is here on a callback and should be authenticated
      if (spotifyToken) {
        fetch(`${url}/spotify/callback?code=${ spotifyToken.code }&state=${ spotifyToken.state }`)
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
    window.open(`${url}/spotify/login`, '_self')
  }

  async function share() {
    const shareData = {
        title: "I Prevail - Heart Vs. Ear",
        text: "Sixty-four songs enter, only one will remain.",
        url: "https://zippy-lily-3f86ad.netlify.app",
    }

    if (navigator.share && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log("Shared successfully")
        } catch (err) {
            console.log(`Error: ${err}`)
        }
     } else {
        // do something else like copying the data to the clipboard
        console.log(`Can't share in this browser`)
     }
}

function openMenu() {
    window.open('https://iprevailband.com/')
}

  return (<>
    <div className="content-wrapper flex flex-col items-center justify-center text-white">
      <div className="h-20 flex items-center justify-between w-screen px-8 bg-none absolute top-0 z-10">
          {/* Share Icon */}
          <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer" onClick={ share }>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>  
          </div>
          
          {/* Menu Icon */}
          <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer" onClick={ openMenu }>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </div>
      </div>
      <div className="absolute top-4 md:top-6 left-0 right-0 flex flex-col items-center justify-center z-0">
          <img className="max-w-[125px] md:max-w-[225px]" src={ namelogo } />
          <p className="text-center -mr-[10px]
              bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
              text-[39px] md:text-[51px] font-ultra-condensed tracking-[4px] md:tracking-[15px]
          ">BRACKET</p>
      </div>
      { !user &&
        <div className="w-[500px] mt-[150px] flex items-center justify-start flex-col gap-8">
          <p className="text-center
              bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
              text-[39px] md:text-[51px] font-ultra-condensed tracking-[4px] md:tracking-[14px] -mr-[18px]
          ">HOW TO PLAY</p>
          <p className="text-center mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Magna aliqua. 
            Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            <br/><br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            <br/><br/>
            Participation requires a Spotify account.
          </p>
          <div className="flex flex-row items-center justify-center gap-x-2 bg-gradient-to-t from-cyan-400 to-ip-blue text-black font-bold drop-shadow-glow-sm px-4 py-3 rounded-xl min-w-40 text-center hover:cursor-pointer hover:scale-105 transition-all" onClick={ spotifyAuth }>
            <div className="mt-[1.75px]"><p className="text-md">LOG IN</p></div> 
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512">
              <path d="M217 401L345 273c9.4-9.4 9.4-24.6 0-33.9L217 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0zM344 80l80 0c22.1 0 40 17.9 40 40l0 272c0 22.1-17.9 40-40 40l-80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c48.6 0 88-39.4 88-88l0-272c0-48.6-39.4-88-88-88l-80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24z"/>
            </svg>
          </div>
          <div>
            <img src={ symbolLogo } className="h-[100px]" />
          </div>
        </div>
      }
      {
        user &&
          <Bracket 
            user={ user }
            accessToken={ accessToken }
            tokenType={ tokenType }
          />
      }
    </div>
    <div className="h-[45px] bg-ip-blue relative flex items-center justify-between px-4 text-sm">
      <div className="w-1/3 text-left">
        <p>
          I Prevail. Fearless Records.
        </p>
      </div>
      <div className="w-1/3 text-center">
        <p>
          Terms of Service. Privacy Policy.
        </p>
      </div>
      <div className="w-1/3 text-right">
        <p>
          Design + Development <strong>Volt Creative</strong>
        </p>
      </div>
    </div>
    </>)
}

export default App
