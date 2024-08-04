import { db } from './config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

// Function to book a cab by adding its ID to the user's bookedCabs field
export async function bookCab(userId, cabId) {
  try {
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      bookedCabs: arrayUnion(cabId),
    });

    console.log('Cab booked successfully!');
  } catch (error) {
    console.error('Error booking cab:', error);
    throw error;
  }
}
