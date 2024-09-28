import { db } from "@/firebaseConfig";
import { setDoc, collection, doc as firestoreDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export const addUser = async ({ goal, height, password, u_name, weight, age, gender }) => {
    try {
        await setDoc(firestoreDoc(collection(db, 'user_data'), u_name), {
            goal: goal,
            height: height,
            password: password,
            u_name: u_name,
            weight: weight,
            created_on: serverTimestamp(),
            age: age,
            gender: gender
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
