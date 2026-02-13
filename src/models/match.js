export function createEmptyMatch() {
    return {
        matchNumber: '',
        team: '',
        scout: '',
        auto: {},
        teleop: {},
        endgame: {},
        notes: '',
        timestamp: new Date().toISOString(),
    }
}
