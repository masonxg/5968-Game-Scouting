import { useEffect, useState } from 'react'
import { addMatch, getAllMatches, deleteMatch } from './db/db'

function App() {
    const [matches, setMatches] = useState([])

    async function loadMatches() {
        const data = await getAllMatches()
        setMatches(data)
    }

    async function addTestMatch() {
        await addMatch({
            team: '5968',
            match: 'Q1',
            notes: 'Test entry',
            timestamp: new Date().toISOString(),
        })
        loadMatches()
    }

    async function removeMatch(id) {
        await deleteMatch(id)
        loadMatches()
    }

    useEffect(() => {
        loadMatches()
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <h1>FRC 2026 QR Scout</h1>

            <button onClick={addTestMatch}>
                Add Test Match
            </button>

            <ul>
                {matches.map(m => (
                    <li key={m.id}>
                        Team {m.team} – Match {m.match}
                        <button onClick={() => removeMatch(m.id)}>
                            Remove Test Match
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
