import { openDB } from 'idb';

function createDB() {
    openDB('my-league', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('clubs')) {
                db.createObjectStore('clubs', { keyPath: 'id' });
            }
        }
    });
}

async function getAllClubs() {
    const openDatabase = await openDB('my-league', 1);
    return openDatabase.getAll('clubs')
        .then(clubs => {
            return clubs;
        });
}

async function insertClub(club) {
    const openDatabase = await openDB('my-league', 1);
    openDatabase.add('clubs', club)
        .then(result => {
            M.toast({html: 'Club saved!'});
        })
        .catch(err => {
            M.toast({html: 'Unable to save duplicate club!'});
        });
}

async function deleteClub(key) {
    const openDatabase = await openDB('my-league', 1);
    openDatabase.delete('clubs', key)
        .then( () => {
            M.toast({html: 'Club removed!'});
        });
}

export { insertClub, deleteClub, createDB, getAllClubs };