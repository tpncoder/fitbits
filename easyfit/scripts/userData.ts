import { db } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storeObject } from './store';

// Function to fetch user data
export const getUserData = async (u_name: string) => {
  try {
    const userDoc = doc(db, 'user_data', u_name);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such user data!');
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Function to update user data
export const updateUserData = async ({ u_name, goal, height, password, weight, age, gender }) => {
  try {
    const userDoc = doc(db, 'user_data', u_name);
    await updateDoc(userDoc, {
      goal: goal,
      height: height,
      password: password,
      weight: weight,
      age: age,
      gender: gender
    });
    await storeObject({
        goal: goal,
        height: height,
        password: password,
        weight: weight,
        age: age,
        gender: gender
      }, "u_data")
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};
