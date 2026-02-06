import { useState } from 'react'
import { gameConfig } from '../config/gameConfig'
import { createEmptyMatch } from '../models/match'
import { addMatch } from '../db/db'

function MatchForm({ onSave }) {
    const [match, setMatch] = useState(createEmptyMatch())

    function updateField(section, key, value) {
        setMatch(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }))
    }

    function updateRoot(key, value) {
        setMatch(prev => ({ ...prev, [key]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await addMatch(match)
        onSave()
        setMatch(createEmptyMatch())
    }

    function renderSection(sectionName, sectionConfig) {
        return (
            <fieldset style={{ marginBottom: 20 }}>
                <legend>{sectionName.toUpperCase()}</legend>

                {Object.entries(sectionConfig).map(([key, cfg]) => (
                    <div key={key}>
                        <label>
                            {cfg.label}:{' '}
                            {cfg.type === 'boolean' ? (
                                <input
                                    type="checkbox"
                                    checked={match[sectionName][key] || false}
                                    onChange={e =>
                                        updateField(sectionName, key, e.target.checked)
                                    }
                                />
                            ) : (
                                <input
                                    type="number"
                                    value={match[sectionName][key] || ''}
                                    onChange={e =>
                                        updateField(sectionName, key, Number(e.target.value))
                                    }
                                />
                            )}
                        </label>
                    </div>
                ))}
            </fieldset>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Match</h2>

            <div>
                <label>
                    Event:{' '}
                    <input
                        value={match.event}
                        onChange={e => updateRoot('event', e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Match #:{' '}
                    <input
                        value={match.matchNumber}
                        onChange={e => updateRoot('matchNumber', e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Team:{' '}
                    <input
                        value={match.team}
                        onChange={e => updateRoot('team', e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Scout:{' '}
                    <input
                        value={match.scout}
                        onChange={e => updateRoot('scout', e.target.value)}
                    />
                </label>
            </div>

            {renderSection('auto', gameConfig.auto)}
            {renderSection('teleop', gameConfig.teleop)}
            {renderSection('endgame', gameConfig.endgame)}
            {renderSection('fouls', gameConfig.fouls)}

            <div>
                <label>
                    Notes:{' '}
                    <textarea
                        value={match.notes}
                        onChange={e => updateRoot('notes', e.target.value)}
                    />
                </label>
            </div>

            <button type="submit">Save Match</button>
        </form>
    )
}

export default MatchForm

