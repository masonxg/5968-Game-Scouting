import { openDB } from 'idb'

export const dbPromise = openDB('frc-2026-scouting', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('matches')) {
            const store = db.createObjectStore('matches', {
                keyPath: 'id',
                autoIncrement: true,
            })

            store.createIndex('team', 'team')
            store.createIndex('match', 'match')
        }
    },
})
export async function addMatch(match) {
    const db = await dbPromise
    await db.add('matches', match)
}

export async function getAllMatches() {
    const db = await dbPromise
    return db.getAll('matches')
}

export async function deleteMatch(id) {
    const db = await dbPromise
    await db.delete('matches', id)
}
