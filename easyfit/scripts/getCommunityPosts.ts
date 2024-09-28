import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getObjectData } from "./store";

export async function getPosts() {
    const fitnessRef = collection(db, "posts");
    const u_data = await getObjectData("u_data")
    const q = query(fitnessRef, where("u_name", "!=", u_data.u_name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        console.log(querySnapshot.docs)
        return querySnapshot.docs
    } else {
        console.log("No community plans found");
        return null;
    }
}
