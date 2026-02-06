export const gameConfig = {
    year: 2026,
    name: 'Rebuilt',

    auto: {
        mobility: { type: 'boolean', label: 'Mobility' },
        scoredPieces: { type: 'number', label: 'Auto Pieces Scored' },
        climbed: { type: 'boolean', label: 'Climb' },
    },

    teleop: {
        cycles: { type: 'number', label: 'Teleop Cycles' },
        scoredPieces: { type: 'number', label: 'Teleop Pieces Scored' },
    },

    endgame: {
        climbed: { type: 'boolean', label: 'Climb' },
        
    },

    fouls: {
        fouls: { type: 'number', label: 'Fouls' },
        techFouls: { type: 'number', label: 'Tech Fouls' },
    },
}

