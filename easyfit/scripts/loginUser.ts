import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function checkCredentials(user_name: string, password: string) {
    const usersRef = collection(db, "user_data");
    const q = query(usersRef, where("u_name", "==", user_name), where("password", "==", password));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();      

        console.log("User found with matching credentials:", userData);
        return userData;
    } else {
        console.log("No user found with matching credentials.");
        return null;
    }
}
