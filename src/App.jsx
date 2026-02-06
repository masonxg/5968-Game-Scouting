import { useEffect, useState } from 'react'
import MatchForm from './components/MatchForm.jsx'
import { getAllMatches, deleteMatch } from './db/db'
import { QRCodeSVG } from 'qrcode.react'
import { matchToTSVRow, tsvHeaderLine } from './utils/tsvRow.jsx'

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return
    }
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
}

function App() {
    const [matches, setMatches] = useState([])
    const [status, setStatus] = useState('')

    async function loadMatches() {
        const data = await getAllMatches()
        setMatches(data)
    }

    async function handleDelete(id) {
        await deleteMatch(id)
        loadMatches()
    }

    async function copyHeaders() {
        await copyText(tsvHeaderLine())
        setStatus('Copied Excel headers (paste once into row 1).')
        setTimeout(() => setStatus(''), 2500)
    }

    useEffect(() => {
        loadMatches()
    }, [])

    return (
        <div className="app">
            <h1>FRC 5968 QR Scout 2026</h1>

            <MatchForm onSave={loadMatches} />

            <div className="card">
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, flexGrow: 1 }}>Saved Matches</h2>
                    <button onClick={copyHeaders}>Copy Excel Headers</button>
                </div>

                {status && <p style={{ marginTop: 10 }}>{status}</p>}

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {matches.map(m => {
                        //  This is what goes inside the QR code:
                        // A single TSV row that Excel can paste into columns.
                        const tsvRow = matchToTSVRow(m)

                        return (
                            <li key={m.id} className="card" style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                    <div>
                                        <strong>Team {m.team}</strong>
                                        <div>Match {m.matchNumber}</div>
                                        <div style={{ fontSize: 12, opacity: 0.8 }}>{m.event}</div>
                                        <div style={{ marginTop: 12 }}>
                                            <QRCodeSVG value={tsvRow} size={180} level="M" />
                                            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
                                                QR contains one TSV row for Excel.
                                            </div>
                                        </div>
                                    </div>

                                    <button className="delete-btn" onClick={() => handleDelete(m.id)}>
                                        DELETE
                                    </button>
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
