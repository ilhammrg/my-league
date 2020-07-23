import idb from './idb.js';

const dbPromised = idb.open('my-league', 1, upgradeDb => {
    upgradeDb.createObjectStore('clubs', {keyPath: 'id'});
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
            M.toast({html: 'Unable to save duplicate club!'});
        });
}

const getAllClubs = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction('clubs', 'readonly');
                const store = tx.objectStore('clubs');
                return store.getAll();
            })
            .then(clubs => {
                resolve(clubs);
            });
    });
}

const deleteClub = (key) => {
    dbPromised
        .then(db => {
            const tx = db.transaction(['clubs'], 'readwrite');
            const store = tx.objectStore('clubs');
            store.delete(key);
            return tx.complete;
        })
        .then(() => {
            M.toast({html: 'Club removed!'});
        });
}

export { saveClub, getAllClubs, deleteClub };