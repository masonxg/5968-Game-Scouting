import { useEffect, useState } from 'react'
import MatchForm from './components/MatchForm.jsx'
import { getAllMatches, deleteMatch } from './db/db'

function App() {
    const [matches, setMatches] = useState([])

    async function loadMatches() {
        const data = await getAllMatches()
        setMatches(data)
    }

    async function handleDelete(id) {
        await deleteMatch(id)
        loadMatches()
    }


    useEffect(() => {
        loadMatches()
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <h1>FRC 2026 QR Scout</h1>

            <MatchForm onSave={loadMatches} />

            <h2>Saved Matches</h2>
            <ul>
                {matches.map(m => (
                    <li key={m.id}>
                        Team {m.team} – Match {m.matchNumber}
                        <button onClick={() => handleDelete(m.id)}>DELETE</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
