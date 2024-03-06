import { useState, useEffect } from 'react'

import SmartBracket from './SmartBracket'

function App() {
    return (<>
    <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white p-2">
        <SmartBracket />
    </div>
    </>)
}

export default App