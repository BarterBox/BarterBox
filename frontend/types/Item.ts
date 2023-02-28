import User from "./User";
import {getFirestore} from "firebase/firestore";
import {app, getFirestoreDocumentData} from "../Firebase";

const db = getFirestore(app);

export default class Item {
    date_uploaded: string;
    description: string;
    heading: string;
    image_url: string;
    owner: string;

    async getOwner(): Promise<User> {
        const user = await getFirestoreDocumentData("Users/" + this.owner);
        if(user) {
            return user as User;
        }
        throw new Error("User not found");
    }
}