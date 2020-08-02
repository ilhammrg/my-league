import { openDB } from 'idb';
import { getClubPromised } from '../data-source/league-api.js';
import SavedClubsPage from '../pages/saved-clubs.page.js';

export function createDB() {
    openDB('my-league', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('clubs')) {
                const createDb = db.createObjectStore('clubs', { keyPath: 'id' });
                createDb.createIndex('id', 'id');
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
    openDatabase.getFromIndex('clubs', 'id', club.id)
        .then(item => {
            if (item === undefined) {
                openDatabase.put('clubs', club)
                    .then(() => {
                        M.toast({html: `${club.shortName} saved!`});
                    });
            } else {
                M.toast({html: `${item.shortName} already in saved club!`});
            }
        });
}

async function deleteClub(key, shortName) {
    const openDatabase = await openDB('my-league', 1);
    openDatabase.delete('clubs', key)
        .then( () => {
            M.toast({html: `${shortName} removed!`});
        });
}

export function handleSaveClub(clubUrl, token) {
    const clubItem = getClubPromised(clubUrl, token);
    const saveButton = document.querySelector('.save-button');
    
    saveButton.addEventListener('click', () => {
        clubItem.then(club => {
            insertClub(club);
        });
    });
}

export function getSavedClubs() {
    getAllClubs().then(clubs => {
        if (clubs.length == 0) {
            const savedClubsElement = new SavedClubsPage();
            savedClubsElement.renderEmpty();
        } else {
            const savedClubsElement = new SavedClubsPage();
            savedClubsElement.render(clubs);
            let removeButton = document.querySelectorAll('.remove-button');
            for (let button of removeButton) {
                button.addEventListener('click', function(event) {
                    const keyPath = parseInt(event.target.dataset.keypath);
                    const shortName = event.target.dataset.shortname;
                    deleteClub(keyPath, shortName).then(() => {
                        getSavedClubs();
                    });
                });
            }
        } 
    });
}