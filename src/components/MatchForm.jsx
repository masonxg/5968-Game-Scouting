import { useState } from 'react'
import { gameConfig } from '../config/gameConfig'
import { createEmptyMatch } from '../models/match'
import { addMatch } from '../db/db'


function MatchForm({ onSave }) {
    const [match, setMatch] = useState(createEmptyMatch())
    function toggleMulti(section, key, option) {
        setMatch(prev => {
            const current = prev[section]?.[key] ?? []
            const next = current.includes(option)
                ? current.filter(x => x !== option)
                : [...current, option]

            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [key]: next,
                },
            }
        })
    }

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
            <fieldset className="card">

                <legend>{sectionName.toUpperCase()}</legend>

                {Object.entries(sectionConfig).map(([key, cfg]) => (
                    <div key={key}>
                        <label>
                            {cfg.label}:{' '}
                            {cfg.type === 'boolean' ? (
                                <input
                                    type="checkbox"
                                    checked={match[sectionName][key] || false}
                                    onChange={e => updateField(sectionName, key, e.target.checked)}
                                />
                            ) : cfg.type === 'select' ? (
                                <select
                                    value={match[sectionName][key] ?? ''}
                                    onChange={e => updateField(sectionName, key, e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {cfg.options.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                    </select>
                                ) : cfg.type === 'multiselect' ? (
                                    <div className="multi-select">
                                        {(cfg.options ?? []).map(opt => {
                                            const selected = (match[sectionName][key] ?? []).includes(opt)

                                            return (
                                                <label key={opt} className="multi-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected}
                                                        onChange={() => toggleMulti(sectionName, key, opt)}
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            )
                                        })}
                                    </div>

                            ) : (
                                <input
                                    type="number"
                                    value={match[sectionName][key] ?? ''}
                                    onChange={e => updateField(sectionName, key, e.target.value === '' ? '' : Number(e.target.value))}
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
            <div className="card">
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
            </div>

        </form>
    )
}

export default MatchForm

