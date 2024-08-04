import { db } from './config';
import { collection, getDocs, doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { Alert } from 'react-native';


// Function to fetch all cabs
export async function fetchCabs() {
  try {
    const cabsCollection = collection(db, 'cabs');
    const snapshot = await getDocs(cabsCollection);
    const cabsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cabsList;
  } catch (error) {
    console.error('Error fetching cabs:', error);
    throw error;
  }
}

// Function to fetch booked cab IDs from the user document
export async function fetchUserBookedCabs(userId) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    // Get the booked cab IDs from the user document
    const { bookedCabs } = userDoc.data();
    return bookedCabs;
  } catch (error) {
    console.error('Error fetching user booked cabs:', error);
    throw error;
  }
}

// Function to fetch details of all booked cabs
export async function fetchBookedCabsDetails(userId) {
  try {
    const bookedCabIds = await fetchUserBookedCabs(userId);

    // Fetch details of each booked cab
    const cabsData = await Promise.all(
      bookedCabIds.map(async (cabId) => {
        const cabDocRef = doc(db, 'cabs', cabId);
        const cabDoc = await getDoc(cabDocRef); 
        if (cabDoc.exists()) {
          return { id: cabId, ...cabDoc.data() };
        } else {
          return { id: cabId, companyName: 'Unknown', model: 'Unknown' }; 
        }
      })
    );

    return cabsData;
  } catch (error) {
    console.error('Error fetching booked cab details:', error);
    throw error;
  }
}


// Function to cancel booking
export const handleCancelBooking = async (userId, cabId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
  
      await updateDoc(userDocRef, {
        bookedCabs: arrayRemove(cabId),
      });
      fetchCabs();
      fetchUserBookedCabs(userId);
      Alert.alert('Success', 'Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Alert.alert('Error', 'Error cancelling booking. Please try again.');
    }
};
