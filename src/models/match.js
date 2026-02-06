export function createEmptyMatch() {
    return {
        event: '',
        matchNumber: '',
        team: '',
        scout: '',
        auto: {},
        teleop: {},
        endgame: {},
        fouls: {},
        notes: '',
        timestamp: new Date().toISOString(),
    }
}
