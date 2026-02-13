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
        intake_depot: { type: 'boolean', label: 'Intakes at Depot?' },
        intake_outpost: { type: 'boolean', label: 'Intakes at Outpost?' },
        intake_neutral: { type: 'boolean', label: 'Intakes at Neutral Zone?' },
    },

    teleop: {
        intake_depot: { type: 'boolean', label: 'Intakes at Depot?' },
        intake_outpost: { type: 'boolean', label: 'Intakes at Outpost?' },
        intake_neutral: { type: 'boolean', label: 'Intakes at Neutral Zone?' },
        defended: { type: 'boolean', label: 'Defended?' },
        defense: {
            type: 'select',
            label: 'Defensive Ability',
            options: ['None', 'Ineffective', 'effective', 'GOAT Defender'],
        },
        intakeA: {
            type: 'select',
            label: 'Intaking Ability',
            options: ['None', 'Ineffective', 'effective', 'GOAT Intaker'],
        },
        shootingA: {
            type: 'select',
            label: 'Shooting Ability',
            options: ['None', 'Ineffective', 'effective', 'GOAT Shooter'],
        },
        traversal: {
            type: 'select',
            label: 'Traversal',
            options: ['None', 'Bump', 'Trench', 'Both'],

        },
    },

    endgame: {
        died: { type: 'boolean', label: 'Died?' },
        timeclimb: { type: 'number', label: 'Time to Climb' },
        climbed: {
            type: 'select',
            label: 'Climb',
            options: ['L0', 'L1', 'L2', 'L3'],
        },
        
    },

 }