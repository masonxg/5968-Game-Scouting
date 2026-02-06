export const gameConfig = {
    year: 2026,
    name: 'Rebuilt',

    auto: {
        start: {
            type: 'select',
            label: 'Start Location',
            options: ['Depot side', 'Middle', 'Outpost Side'],
        },
        mobility: { type: 'boolean', label: 'Mobility' },
        scoredPieces: { type: 'number', label: 'Auto Pieces Scored' },
        climbed: { type: 'boolean', label: 'Climb' },
        intake: {
            type: 'multiselect',
            label: 'Intake Location',
            options: ['Depot', 'Neutral Zone', 'Outpost'],
        },
    },

    teleop: {
        cycles: { type: 'number', label: 'Teleop Cycles' },
        scoredPieces: { type: 'number', label: 'Teleop Pieces Scored' },
        intake: {
            type: 'multiselect',
            label: 'Inake Location',
            options: ['Depot', 'Neutral Zone', 'Outpost'],
        },
        defense: {
            type: 'select',
            label: 'Defense',
            options: ['None', 'Ineffective', 'effective', 'GOAT Defender'],
        },
        traversal: {
            type: 'select',
            label: 'Traversal',
            options: ['None', 'Bump', 'Trench', 'Both'],
           
        },
    },

    endgame: {
        died: { type: 'boolean', label: 'Died?' },
        climbed: {
            type: 'select',
            label: 'Climb',
            options: ['None', 'L1', 'L2', 'L3'],
        },
        
    },

    fouls: {
        fouls: { type: 'number', label: 'Fouls' },
        techFouls: { type: 'number', label: 'Tech Fouls' },
    },
 }