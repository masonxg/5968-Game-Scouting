function escapeCell(value) {
    if (value === null || value === undefined) return ''
    const str = String(value)
    // For TSV, we mainly need to avoid tabs/newlines breaking cells
    return str.replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

function flattenMatch(m) {
    // Add whatever fields you want here. This is a sane default.
    return {
        id: m.id ?? '',
        timestamp: m.timestamp ?? '',
        event: m.event ?? '',
        matchNumber: m.matchNumber ?? '',
        team: m.team ?? '',
        scout: m.scout ?? '',

        // AUTO
        auto_start: m.auto?.start ?? '',
        auto_mobility: m.auto?.mobility ?? false,
        auto_scoredPieces: m.auto?.scoredPieces ?? 0,
        auto_climbed: m.auto?.climbed ?? false,
        auto_intake: m.auto?.intake ?? '',

        // TELEOP
        teleop_cycles: m.teleop?.cycles ?? 0,
        teleop_scoredPieces: m.teleop?.scoredPieces ?? 0,
        teleop_intake: m.teleop?.intake ?? '',
        teleop_defense: m.teleop?.defense ?? '',
        teleop_traversal: m.teleop?.traversal ?? '',

        // ENDGAME
        endgame_climbed: m.endgame?.climbed ?? false,

        // FOULS
        fouls: m.fouls?.fouls ?? 0,
        techFouls: m.fouls?.techFouls ?? 0,

        notes: m.notes ?? '',
    }
}

export function matchesToTSV(matches) {
    const rows = matches.map(flattenMatch)

    // Collect headers in a consistent order
    const headers = Object.keys(rows[0] ?? flattenMatch({}))
    const lines = []

    lines.push(headers.join('\t'))

    for (const row of rows) {
        const line = headers.map(h => escapeCell(row[h])).join('\t')
        lines.push(line)
    }

    return lines.join('\n')
}

export async function copyTextToClipboard(text) {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return
    }

    // Fallback for non-secure contexts / older browsers
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    ta.style.top = '-9999px'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
}
