import { openDB } from 'idb';
import { getClubPromised } from '../data-source/league-api.js';
import SavedClubsPage from '../pages/saved-clubs.page.js';

export function createDB() {
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
        .then( () => {
            M.toast({html: 'Club saved!'});
        })
        .catch( () => {
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
                    let keyPath = parseInt(event.target.dataset.keypath);
                    deleteClub(keyPath).then(() => {
                        getSavedClubs();
                    });
                });
            }
        } 
    });
}