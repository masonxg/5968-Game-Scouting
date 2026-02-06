function clean(value) {
    if (value === null || value === undefined) return ''
    return String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

export const TSV_HEADERS = [
    'timestamp',
    'event',
    'matchNumber',
    'team',
    'scout',

    'auto_start',
    'auto_mobility',
    'auto_scoredPieces',
    'auto_climb',
    'auto_intake',

    'teleop_cycles',
    'teleop_scoredPieces',
    'teleop_intake',
    'teleop_defense',
    'teleop_traversal',

    'endgame_climbed',

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

        // AUTO
        auto_start: m.auto?.start ?? '',            // multiple choice (string)
        auto_mobility: m.auto?.mobility ?? false,
        auto_scoredPieces: m.auto?.scoredPieces ?? 0,
        auto_climb: m.auto?.climb ?? false,
        auto_intake: Array.isArray(m.auto?.intake)
            ? m.auto.intake.join(', ')
            : (m.auto?.intake ?? ''),

        // TELEOP
        teleop_cycles: m.teleop?.cycles ?? 0,
        teleop_scoredPieces: m.teleop?.scoredPieces ?? 0,
        teleop_intake: Array.isArray(m.teleop?.intake)
            ? m.teleop.intake.join(', ')
            : (m.teleop?.intake ?? ''),
        teleop_defense: m.teleop?.defense ?? '',
        teleop_traversal: m.teleop?.traversal ?? '', // multiple choice (string)

        // ENDGAME
        endgame_died: m.endgame?.died ?? false,
        endgame_climbed: m.endgame?.climbed ?? '',

        // FOULS
        fouls: m.fouls?.fouls ?? 0,
        techFouls: m.fouls?.techFouls ?? 0,

        notes: m.notes ?? '',
    }

    return TSV_HEADERS.map(h => clean(row[h])).join('\t')
}

export function tsvHeaderLine() {
    return TSV_HEADERS.join('\t')
}
