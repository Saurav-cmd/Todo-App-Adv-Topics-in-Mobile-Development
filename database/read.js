import app from "./firebaseconfig"
import { getFirestore, getDocs,collection } from "firebase/firestore";


// Get a reference to the Firestore database
const db = getFirestore(app);


export { db };

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

