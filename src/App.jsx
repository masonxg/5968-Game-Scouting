import { useEffect, useState } from 'react'
import MatchForm from './components/MatchForm.jsx'
import { getAllMatches, deleteMatch } from './db/db'
import { QRCodeSVG } from 'qrcode.react'

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
        <div className="app">
            <h1>FRC 2026 QR Scout</h1>

            <MatchForm onSave={loadMatches} />

            <div className="card">
                <h2>Saved Matches</h2>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {matches.map(m => {
                        const qrData = JSON.stringify(m)

                        return (
                            <li
                                key={m.id}
                                className="card"
                                style={{ marginBottom: 12 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                    <div>
                                        <strong>Team {m.team}</strong>
                                        <div>Match {m.matchNumber}</div>
                                    </div>

                                    <button className="delete-btn" onClick={() => handleDelete(m.id)}>
                                        DELETE
                                    </button>
                                </div>

                                <div style={{ marginTop: 12 }}>
                                    <QRCodeSVG value={qrData} size={180} level="M" />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default App
