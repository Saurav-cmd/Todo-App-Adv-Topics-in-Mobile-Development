import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from './read';

export async function saveDB(description, done) {
    const dbCollection = collection(db, 'tasks');
    try {
        const docRef = await addDoc(dbCollection, {
            description: description,
            done: done,
        });
        console.log('Success:', docRef);
        return docRef.id;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function deleteDataDB(id) {
    const dbDoc = doc(db, 'tasks', id);
    try {
        await deleteDoc(dbDoc);
        console.log('Successfully deleted!');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function updateDB(id, status) {
    const docRef = doc(db, 'tasks', id);
    try {
        await updateDoc(docRef, {
            done: status
        });
        console.log('Successfully updated!');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function loadDB() {
    const dbCollection = collection(db, 'tasks');
    try {
        const querySnapshot = await getDocs(dbCollection);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
            fetchedData.push({
                id: doc.id,
                description: doc.data().description,
                done: doc.data().done
            });
            console.log("This is data: ", doc.data());
        });
        return fetchedData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
