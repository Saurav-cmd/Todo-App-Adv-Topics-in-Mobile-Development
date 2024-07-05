import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc }
from 'firebase/firestore';
import { db } from './read';

export async function saveDB(description, done) {
    console.log('add huna aayo')
    const dbCollection = collection(db,
        'tasks');
    return addDoc(dbCollection, {
        description: description,
        done: done,
    })
        .then((docRef) => {
            console.log('Success:'
                , docRef);
        })
        .catch((error) => {
            console.error('Error:'
                , error);
        });
}

export async function deleteDataDB(id) {
    const dbDoc = doc(db,
        'tasks'
        , id);
    return deleteDoc(dbDoc)
        .then(() => {
            console.log('Successfully deleted!');
        })
        .catch((error) => {
            console.error('Error:'
                , error);
        });
}

export async function updateDB(id, status) {
    const docRef = doc(db, 'tasks', id);
    return updateDoc(docRef, {
        done: status
    })
        .then(() => {
            console.log('Successfully updated!');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}