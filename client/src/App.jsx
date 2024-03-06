import { useState, useEffect } from 'react'

import Bracket from './Bracket'

function App() {
    return (<>
    <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white p-2">
        <Bracket />
    </div>
    </>)
}

export default App