import { useRef, useEffect, useState } from 'react'


let url = 'https://heart-vs-ear.onrender.com'

const Leaderboard = ({ toggleLeaderboard }) => {
    const [ width, setWidth ] = useState(window.innerWidth)
    const [ height, setHeight ] = useState(window.innerHeight)
    const [ leaders, setLeaders ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const leaderboard = useRef()

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
        leaderboard.current.style.width = width + 'px'
        leaderboard.current.style.height = height + 'px'
    }, [ width ])

    useEffect(() => {
        console.log('hey')
        fetch(`${url}/database/users/get-leaderboard`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLeaders(data.users)
                setLoading(false)
            })
    }, [])

    useEffect(() => {

    })
    const renderLeaders = () => {
        console.log(leaders)
        
        if (leaders) {
            return leaders.map((leader, index) => {
                return (<div key={ index } className="flex justify-between mb-2 p-4 bg-ip-gray-transparent rounded-2xl">
                    <div className="flex gap-x-2"><p className="text-sm md:text-base min-w-[25px]">{ index+1 }</p> <p className="text-sm md:text-base">{ leader.displayName }</p></div>
                    <div><p className="text-sm md:text-base">{ leader.score } points</p></div>
                </div>)
            })
        }
    }
    return (<div className={`bg-[rgba(0,0,0,.75)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-[999]`} ref={ leaderboard }>
        <div className={`w-full h-full px-2 md:w-full md:h-full bg-black flex items-center justify-start md:justify-center flex-col overflow-y-scroll md:overflow-y-auto`}>
            <div className="absolute top-4 right-4 py-1 px-1 hover:cursor-pointer text-white" onClick={ toggleLeaderboard }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6">
                    <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </div>
                {
                    loading &&
                    <div className="flex items-center justify-center flex-col">
                        <p>Loading Leaderboard</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="my-8 animate-spin h-8 w-8">
                            <path fill="#ffffff" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
                        </svg>
                    </div>
                }
                {
                    !loading &&
                        <div className="flex flex-col items-center overflow-y-scroll  scrollbar-hide">
                            <div className="flex items-center justify-center">
                                <p className="text-center mt-2 -mr-[10px]
                                    bg-gradient-to-t from-cyan-400 to-ip-blue inline-block text-transparent bg-clip-text
                                    text-[39px] md:text-[51px] font-ultra-condensed tracking-[4px] md:tracking-[14px] mb-2">
                                        LEADERBOARD
                                    </p>
                            </div>
                            <div className="w-[400px] md:w-[500px] relative top-0 px-8 pb-8 grid">
                                { renderLeaders() }
                            </div>
                        </div>
                }
        </div>
    </div>)
}

export default Leaderboard