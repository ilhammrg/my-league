import idb from './idb.js';

let dbPromised = idb.open('my-league', 1, upgradeDb => {
    let clubsObjectStore = upgradeDb.createObjectStore('clubs', {
        keyPath: 'id'
    });
    clubsObjectStore.createIndex('name', 'name', { unique: true });
});

const saveClub = (club) => {
    dbPromised
        .then(db => {
            const tx = db.transaction('clubs', 'readwrite');
            const store = tx.objectStore('clubs');
            store.add(club);
            return tx.complete;
        })
        .then(() => {
            M.toast({html: 'Added to Saved Clubs!'});
        })
        .catch(error => {
            M.toast({html: 'Already saved.'});
        });
}

export default saveClub;