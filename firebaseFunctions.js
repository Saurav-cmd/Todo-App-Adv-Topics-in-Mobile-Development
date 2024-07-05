// firebaseFunctions.js
import { db } from 'firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Fetch all tasks from Firestore
export const fetchTasks = async () => {
  try {
    const tasksCollection = await getDocs(collection(db, 'tasks'));
    return tasksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

// Add a new task to Firestore
export const addTaskToFirestore = async (title) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      title,
      isDone: false
    });
    return { id: docRef.id, title, isDone: false };
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

// Toggle task status in Firestore
export const toggleTaskStatusInFirestore = async (id, isDone) => {
  try {
    await updateDoc(doc(db, 'tasks', id), { isDone });
  } catch (error) {
    console.error("Error toggling task status: ", error);
    throw error;
  }
};

// Delete a task from Firestore
export const deleteTaskFromFirestore = async (id) => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};
