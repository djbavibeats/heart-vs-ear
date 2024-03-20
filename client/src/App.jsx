import { useState, useEffect, useRef } from 'react'

import Bracket from './Bracket'
import namelogo from './assets/name-logo.png'
import symbolLogo from './assets/symbol-logo.png'
import spotifyLogo from './assets/Spotify_Logo_RGB_White.png'

let url = 'https://heart-vs-ear.onrender.com'
// let url = 'http://localhost:5000'
// just a test comment


const TermsModal = ({ toggleTermsModalVisible }) => {
  const [ width, setWidth ] = useState(window.innerWidth)
  const [ height, setHeight ] = useState(window.innerHeight)
  const termsModal = useRef()

  const handleWindowSizeChange = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange)
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange)
      }
  }, [])

  useEffect(() => {
      termsModal.current.style.width = width + 'px'
      termsModal.current.style.height = height + 'px'
  }, [ width ])
  return (<div className={`bg-[rgba(0,0,0,.75)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-[999]`} ref={ termsModal }>
      <div className={`w-full h-full px-2 md:w-full md:h-full bg-black flex items-center justify-start flex-col overflow-y-scroll md:overflow-y-auto`}>
        <div className="absolute top-4 right-4 py-1 px-1 hover:cursor-pointer text-white" onClick={ toggleTermsModalVisible }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6">
                <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </div>
        <div className="text-white px-8 pt-8 pb-16">
        I PREVAIL “BRACKET-OLOGY” Contest Official Rules
        <br/><br/>
        NO PURCHASE NECESSARY. PURCHASE WILL NOT IMPROVE CHANCES OF WINNING. PARTICIPATION DOES NOT REQUIRE A SPOTIFY PREMIUM MEMBERSHIP.
        <br/><br/>
        ELIGIBILITY: I PREVAIL “BRACKET-OLOGY” Contest (“Contest”) begins on Wednesday, March 20, 2024 Eastern time, you must submit Your Bracket (as defined herein) by Monday, March 25th at 11:59pm Eastern time in order to participate, and the Contest will end on Monday, April 8, 2024 at 11:59pm Eastern time. The Contest is open to legal residents of the United States, excluding Rhode Island, who are 18 years of age or older at time of entry. Void where prohibited. You are not eligible to enter the contest if you are an employee of Concord Music Group, Inc. (“Sponsor,” “we,” us,” “our”) or its respective parent companies, subsidiaries, affiliates, advertising agencies, public relations agencies, prize suppliers, including any vendors providing services in connection with this Contest (collectively, the “Sponsor Affiliates”), or an employee, agent, director, or officer (including members of their immediate family – i.e., spouse, mother, father, in-laws, grandmother, grandfather, brother, sister, children and grandchildren – or same household) of Sponsor or any Sponsor Affiliate.
        <br/><br/>
        TO ENTER: To enter, log in to your Spotify account using the following link provided below: 
        <br/><br/>
        <a href="https://bracket.iprevailband.com">https://bracket.iprevailband.com/</a>
        <br/><br/>
        Once logged in, you will be provided with a bracket template consisting of 64 of I PREVAIL’s top performing sound recordings. The portal will guide you through completing your bracket (“Your Bracket”); you may also choose the “randomized bracket” selection provided in the portal if you so please. YOU MUST SUBMIT YOUR BRACKET BEFORE MONDAY, MARCH 25, AT 11:59PM EASTERN TIME TO BE ELIGIBLE TO PARTICIPATE.
        <br/><br/>
        From TUESDAY, MARCH 26 at 12:00AM EASTERN STANDARD TIME to MONDAY, APRIL 8 at 11:59PM EASTERN STANDARD TIME (the “First Round” and each “round” hereafter shall collectively be referred to as a “Round” or the “Rounds”) analytics populating the number of times each song was played solely within the time allotted (“listenship”) for the First Round will be logged to select the winner of each pairing of songs on the bracket template.
        <br/><br/>
        From TUESDAY, MARCH 26 at 12:00AM EASTERN STANDARD TIME to WEDNESDAY, MARCH 27 at 11:59PM EASTERN STANDARD TIME (the “Second Round”), the prevailing thirty-two (32) songs on the bracket will be selected solely from the top-performing listenship recorded during the Second Round. 
        <br/><br/>
        From THURSDAY, MARCH 28 at 12:00AM EASTERN STANDARD TIME to FRIDAY, MARCH 29 at 11:59PM EASTERN STANDARD TIME (the “Third Round”), the prevailing sixteen (16) songs on the bracket will be selected solely from the top-performing listenship recorded during the Third Round. 
        <br/><br/>
        From SATURDAY, MARCH 30 at 12:00AM EASTERN STANDARD TIME to MONDAY, APRIL 1 at 11:59PM EASTERN STANDARD TIME (the “Fourth Round”), the prevailing eight (8) songs on the bracket will be selected solely from the top-performing listenship recorded during the Fourth Round. 
        <br/><br/>
        From TUESDAY, APRIL 2 at 12:00AM EASTERN STANDARD TIME to WEDNESDAY, APRIL 3 at 11:59PM EASTERN STANDARD TIME (the “Fifth Round”), the prevailing four (4) songs on the bracket will be selected solely from the top-performing listenship recorded during the Fifth Round. 
        <br/><br/>
        From THURSDAY, APRIL 4 at 12:00AM EASTERN STANDARD TIME to FRIDAY, APRIL 5 at 11:59PM EASTERN STANDARD TIME (the “Sixth Round”), the prevailing two (2) songs on the bracket will be selected solely from the top-performing listenship recorded during the Sixth Round. 
        <br/><br/>
        From SATURDAY, APRIL 6 at 12:00AM EASTERN STANDARD TIME to MONDAY, APRIL 8 at 11:59PM EASTERN STANDRAD TIME (the “Championship Round”), the prevailing song on the bracket will be selected solely from the top-performing listenship recorded during the Championship Round. 
        <br/><br/>
        For the sake of clarity, listenship will not compound from one Round to the next, and listenship accumulated prior to the date of the Contest is void for the purposes of the Contest.
        Once you have formally submitted Your Bracket on the portal link provided, please share Your Bracket on your preferred social media platform and use the following hashtag on your post:  “#iprevailbracket” (the “Social Post”).
        <br/><br/>
        You may only submit a bracket to the Contest portal once. 
        <br/><br/>
        GRANT OF RIGHTS: By submitting Your Bracket to us and selecting “agree” on the landing page following your log in at the link provided in the Contest instructions, you give the Sponsor permission to view your Spotify account data (i.e. your email, your Spotify subscription, account country, explicit contest filter settings, your name, your profile picture, your Spotify followers, and your public playlists), view your Spotify account activity (i.e. what you’ve saved in your library and who you follow), and you give Sponsor permission to take actions in Spotify on your behalf (i.e. add and remove items in your library, created/edit/follow private playlists, and manage who you follow) (“Your Data”). You may remove this access at any time by opting out of data sharing in your Spotify account settings. For the avoidance of doubt, Sponsor will not store Your Data at any time. 
        <br/><br/>
        JUDGING: The participant who has selected the most accurate bracket will be awarded the grand prize outlined below. A participant will be eligible for the second place prize outlined below if their bracket predicts the correct outcome for all Rounds except the Championship Round. Lastly, a participant will be eligible for the third place prize outlined below if their bracket predicts the correct outcome for all Rounds except the Sixth Round and the Championship Round. 
        <br/><br/>
        If there are multiple winning brackets for a prize, the Artist will determine a tie-breaker by randomly select one winner (the “Winner”) for each prize as outlined below (collectively, the “Winners”). For the avoidance of doubt, the Artist will not be utilizing metrics from social media engagement of the Social Post as an element of criteria in selecting the Winners of the Contest.
        <br/><br/>
        PRIZE: The following prizes (individually, the “Prize” and collectively referred to as the “Prizes”) (by way of an Amex giftcard) will be awarded to each Winner:
        <br/><br/>
        First Place Prize: US$500.00<br/>
        Second Place Prize: US$300.00<br/>
        Third Place Prize: US$200.00<br/>
        <br/><br/>
        Neither Sponsor nor Sponsor Affiliates make or offer any warranty or guarantee, either express or implied (including, without limitation, quality, merchantability, and fitness for a particular purpose) in connection with this Contest or any prize. Prize details and availability are subject to change, in which case a prize of equal value may be substituted at Sponsor's sole discretion. The Prizes consist only of the items listed, are non- transferable, with no cash redemption or substitution except at Sponsor's sole discretion. Federal, state, or local taxes on prizes, if any, and any other costs, fees or expenses not listed above are the sole responsibility of the Winners. Odds of winning depend on the number of eligible entries received, and accuracy of Your Bracket as it relates to listenship during the specified period of time provided herein.
        <br/><br/>
        NOTIFICATION: Winner will be notified by email address, using the contact information provided or collected at time of entry. The Winner will be subject to proving eligibility, including, but not limited to, verification of the Winner’s name, age and social security number. If Winner cannot furnish verifiable and valid proof of age within forty-eight (48) hours after being notified of winning the sweepstakes or Winner cannot be reached after five (5) days from first notification attempt, an alternate Winner may be chosen from among the eligible entries received, in the Sponsor’s sole discretion. Void where prohibited and restricted by law. Additional restrictions may apply.
        <br/><br/>
        PUBLICITY & MARKETING: Acceptance of any prize constitutes permission to the Sponsor to use your name, voice, statements, image and likeness for purposes of advertising and trade in any medium, without further compensation or notice, unless prohibited by law. Submission of your contact information in connection with this Contest (whether or not required), including name, mailing address, phone number, and email address, constitutes permission for Sponsor to add you to Sponsor’s contact database and to contact you in the future for promotional and other reasons. You may opt-out of receiving such communications as set forth in Sponsor’s Privacy Policy (located at https://concord.com/privacy-policy/) or as provided within any such marketing materials (e.g., using the “Unsubscribe” feature provided in the footer of Sponsor’s emails).
        <br/><br/>
        NO LIABILITY & INDEMNIFICATION: Sponsor and Sponsor Affiliates are not responsible for, and entrants release each from any failures of any kind (whether caused by computer, technical, or human error), that may either limit the entrant’s ability to submit an entry, claim a prize, or otherwise participate in this Contest, or Sponsor’s ability to include all eligible entries, conduct random drawings, notify potential winners, or otherwise execute this Contest in the manner intended. Entrants further release and agree to indemnify Sponsor and Sponsor Affiliates from any and all liability, claims or actions of any kind whatsoever arising from injuries, damages, or losses to persons or property which may be sustained in connection with this Contest including, but not limited to: (a) the receipt, ownership or use of any prize awarded; (b) any travel or prize-related activity; (c) any typographical or other error in these Official Rules or any other materials disseminated by Sponsor; and (d) any technical malfunction, failure, error, omission, interruption, deletion, defect, delay in operation or communications line failure, regardless of cause, with any equipment, systems, networks, lines, satellites, servers, computers, or providers used by an entrant or Sponsor.
        <br/><br/>
        OTHER TERMS: Decisions of Sponsor and/or Artist on all matters related to the Contest are final. Sponsor reserves the right to cancel or modify the Contest for any reason, including but not limited to, if fraud, misconduct or technical failures destroy the integrity of the Contest, or if a computer virus, bug, or other technical problem corrupts the administration, security, or proper administration of the Contest as determined by Sponsor, in its sole discretion. Sponsor reserves the right to disqualify or prohibit the participation of an individual if fraud or tampering is suspected, or if the individual fails to comply with any requirement of participation or with any provision in these Official Rules. CAUTION: ANY ATTEMPT TO DELIBERATELY DAMAGE OR UNDERMINE THE OPERATION OF THIS
        CONTEST IS A VIOLATION OF CRIMINAL & CIVIL LAWS. SPONSOR RESERVES THE RIGHT TO DISQUALIFY AND/OR SEEK DAMAGES FROM ANY INDIVIDUAL MAKING ANY SUCH ATTEMPTS TO THE FULL EXTENT PERMITTED BY LAW.
        <br/><br/>
        JURISDICTION: Any claims or lawsuits related to the Contest brought against any Sponsor shall be brought in the federal or state courts of the State of Tennessee. By participating in the Contest, you agree to the jurisdiction and venue of such courts and waive all objections to such jurisdiction and venue.
        <br/><br/>
        WINNER LIST: To obtain the name of the Winners (available after June 14, 2024) send a self-addressed stamped envelope (residents of Vermont may omit return postage) to: I PREVAIL “BRACKET-OLOGY” Contest, 5750 Wilshire Boulevard, Suite 450, Los Angeles, CA 90036.
        <br/><br/>
        SPONSOR: CMGI Recorded Music Assets, LLC through Fearless Records, a division of Concord Music Group, Inc.
        </div>
    </div>
  </div>)
}

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
          const spotifyInfo = data.data
          fetch(`${url}/database/users/get?spotify_id=${data.data.id}`)
            .then(resp => resp.json())
            .then(data => {
              if (data.user) {
                // This runs when a user is returning
                setUser(data.user)
              } else {
                const newUser = {
                  displayName: spotifyInfo.display_name,
                  spotifyEmail: spotifyInfo.email,
                  spotifyRefreshToken: localStorage.getItem('hve_spotify_refresh'),
                  spotifyId: spotifyInfo.id
                }
                fetch(`${url}/database/users/create`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newUser)
                }).then(resp => resp.json())
                .then(data => {
                  let newuser = data.user
                  // This is runs when a user first signs up
                  fetch(`${url}/spotify/follow-i-prevail`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      spotifyId: data.user.spotifyId,
                      spotifyRefreshToken: data.user.spotifyRefreshToken
                    })
                  })
                  .then(resp => resp.json())
                  .then(data => {
                    setUser(newuser)
                  })
                })
              }
            })
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

  
  const [ termsModalVisible, setSaveModalVisible ] = useState(false)

  const toggleTermsModalVisible = () => {
    setSaveModalVisible(!termsModalVisible)
}

  const spotifyAuth = () => {
    window.open(`${url}/spotify/login`, '_self')
  }

  async function share() {
    const shareData = {
        title: "I Prevail - Bracket-ology",
        text: "I just submitted my #iprevailbracket!",
        url: "https://bracket.iprevailband.com",
    }

    if (navigator.share && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log("Shared successfully")
        } catch (err) {
            console.log(`Error: ${err}`)
            alert("Error")
        }
     } else {
        // do something else like copying the data to the clipboard
        console.log(`Can't share in this browser`)
        alert("Sharing is not enabled in this browser")
     }
}

function openMenu() {
    window.open('https://iprevailband.com/', '_blank')
}

  return (<>
    {
        termsModalVisible &&
        <TermsModal toggleTermsModalVisible={ toggleTermsModalVisible } />
    }
    <div className="content-wrapper flex flex-col items-center justify-start text-white">
      <div className="h-20 flex items-center justify-between bg-none w-full top-0 left-0 right-0 px-4 z-20">
      {/* <div className="bg-red-500 fixed w-fulls top-0 left-0 right-0 flex h-20 items-center justify-between"> */}
          {/* Share Icon */}
          <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block md:hidden w-6 h-6 hover:cursor-pointer" onClick={ share }>
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
      <div className="flex flex-col items-center justify-center w-full top-4 md:top-6 -mt-[50px] left-0 right-0 z-10">
          <img className="max-w-[125px] md:max-w-[225px]" src={ namelogo } />
          <p className="text-center -mr-[10px]
              bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
              text-[39px] md:text-[51px] font-ultra-condensed tracking-[4px] md:tracking-[15px]
          ">BRACKET-OLOGY</p>
      </div>
      { !user &&
        <div className="flex items-center justify-start flex-col gap-8 max-w-screen w-screen h-full md:mt-[25px]">
          <div className="w-[90%] sm:[500px] md:w-[700px] flex items-center flex-col justify-start gap-4">
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
            <div className="flex flex-row items-center justify-center gap-x-2 bg-gradient-to-t from-cyan-400 to-ip-blue text-black font-bold drop-shadow-glow-sm px-4 py-3 rounded-xl min-w-40 text-center hover:cursor-pointer hover:scale-105 transition-all" onClick={ spotifyAuth }>
              <div className="mt-[1.75px]"><p className="text-sm">LOGIN WITH SPOTIFY</p></div> 
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                <path d="M217 401L345 273c9.4-9.4 9.4-24.6 0-33.9L217 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0zM344 80l80 0c22.1 0 40 17.9 40 40l0 272c0 22.1-17.9 40-40 40l-80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l80 0c48.6 0 88-39.4 88-88l0-272c0-48.6-39.4-88-88-88l-80 0c-13.3 0-24 10.7-24 24s10.7 24 24 24z"/>
              </svg>
            </div>
            <div className="">
              <img src={ spotifyLogo } className="w-[80px]" />
            </div>
            <div className="pb-8">
              <img src={ symbolLogo } className="h-[100px]" />
            </div>
          </div>
        </div>
      }
      {
        user &&
          <Bracket 
            user={ user }
            accessToken={ accessToken }
            tokenType={ tokenType }
            setUser={ setUser }
          />
      }
    </div>
    <div className="h-[45px] bg-ip-blue flex flex-row md:flex-row items-center justify-between px-4 text-sm">
      <div className="w-1/3 text-left">
        <p className="text-[10px] md:text-[14px] leading-[12px]">
          <a href="https://iprevailband.com/" target="_blank" rel="noopener">I Prevail.</a>
          &nbsp; 
          <a href="https://fearlessrecords.com/" target="_blank" rel="noopener">Fearless Records.</a>
        </p>
      </div>
      <div className="w-1/3  text-center">
        <p className="text-[10px] md:text-[14px] leading-[12px]">
          <span onClick={ toggleTermsModalVisible } className="hover:cursor-pointer">Terms of Service.</span>
          {/* <a href="https://concord.com/terms/" target="_blank" rel="noopener">Terms of Service.</a>  */}
          &nbsp;
          <a href="https://concord.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy.</a>
        </p>
      </div>
      <div className="w-1/3  text-right">
        <p className="text-[10px] md:text-[14px] leading-[12px]">
          <a href="https://voltcreative.com" target="_blank" rel="noopener">Design + Development <strong>Volt Creative</strong></a>
        </p>
      </div>
    </div>
    </>)
}

export default App
