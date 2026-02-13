function clean(value) {
    if (value === null || value === undefined) return ''
    return String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

export const TSV_HEADERS = [
    'timestamp',
    'matchNumber',
    'team',
    'scout',

    'auto_start',
    'auto_mobility',
    'auto_scoredPieces',
    'auto_climb',
    'auto_intake_depot',
    'auto_intake_outpost',
    'auto_intake_neutral',

    'teleop_intake_depot',
    'teleop_intake_outpost',
    'teleop_intake_neutral',
    'teleop_defended',
    'teleop_defense',
    'teleop_traversal',
    'teleop_intakeA',
    'teleop_shootingA',

    'endgame_died',
    'endgame_time',
    'endgame_climbed',


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
        auto_intake_depot: m.auto?.intake_depot ?? false,
        auto_intake_outpost: m.auto?.intake_outpost ?? false,
        auto_intake_neutral: m.auto?.intake_neutral ?? false,

        // TELEOP

        teleop_intake_depot: m.teleop?.intake_depot ?? false,
        teleop_intake_outpost: m.teleop?.intake_outpost ?? false,
        teleop_intake_neutral: m.teleop?.intake_neutral ?? false,
        teleop_defended: m.teleop?.defended ?? false,
        teleop_defense: m.teleop?.defense ?? '',
        teleop_traversal: m.teleop?.traversal ?? '', // multiple choice (string)
        teleop_intakeA: m.teleop?.intakeA?? '',
        teleop_shootingA: m.teleop?.shootingA ?? '',

        // ENDGAME
        endgame_died: m.endgame?.died ?? false,
        endgame_time: m.endgame?.time ?? 0,
        endgame_climbed: m.endgame?.climbed ?? '',


        notes: m.notes ?? '',
    }

    return TSV_HEADERS.map(h => clean(row[h])).join('\t')
}

export function tsvHeaderLine() {
    return TSV_HEADERS.join('\t')
}
