function clean(value) {
    if (value === null || value === undefined) return ''
    return String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

// This defines the exact column order in Excel.
// Change/add columns here any time.
export const TSV_HEADERS = [
    'timestamp',
    'event',
    'matchNumber',
    'team',
    'scout',

    'auto_mobility',
    'auto_scoredPieces',

    'teleop_cycles',
    'teleop_scoredPieces',

    'endgame_climbed',
    'endgame_parked',

    'fouls',
    'techFouls',

    'notes',
]

// Convert ONE match into ONE TSV row (no header).
export function matchToTSVRow(m) {
    const row = {
        timestamp: m.timestamp ?? '',
        event: m.event ?? '',
        matchNumber: m.matchNumber ?? '',
        team: m.team ?? '',
        scout: m.scout ?? '',

        auto_mobility: m.auto?.mobility ?? false,
        auto_scoredPieces: m.auto?.scoredPieces ?? 0,

        teleop_cycles: m.teleop?.cycles ?? 0,
        teleop_scoredPieces: m.teleop?.scoredPieces ?? 0,

        endgame_climbed: m.endgame?.climbed ?? false,
        endgame_parked: m.endgame?.parked ?? false,

        fouls: m.fouls?.fouls ?? 0,
        techFouls: m.fouls?.techFouls ?? 0,

        notes: m.notes ?? '',
    }

    return TSV_HEADERS.map(h => clean(row[h])).join('\t')
}

// Optional: header line (if you ever want to paste headers into Excel once)
export function tsvHeaderLine() {
    return TSV_HEADERS.join('\t')
}
