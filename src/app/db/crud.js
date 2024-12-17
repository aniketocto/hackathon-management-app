import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, firestoreDB } from "./firebase";
import { getformatDate } from "@utils/helper";


export async function addUserToFirestore(user) {
    const { uid, name, email } = user;
    try {
        await setDoc(doc(firestoreDB, 'users', uid), {
            name: name,
            email: email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchUserFromFirestore(uid) {
    try {
        const userDocRef = doc(firestoreDB, 'users', uid)
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data();
        }
        else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addHackathon(hackathonData) {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert("Please Sign In First");
        }
        const uid = currentUser.uid;
        const docRef = await addDoc(collection(firestoreDB, "hackathons"), {
            ...hackathonData,
            createdBy: uid,
            createdAt: serverTimestamp(),
        });

        return docRef.id;

    } catch (error) {

    }
}

export async function fetchHackathonById(hackathonId) {
    try {
        const docRef = doc(firestoreDB, "hackathons", hackathonId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.error("No such hackathon exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching hackathon:", error);
        throw error;
    }
}

export async function fetchUpcomingHackathon() {
    try {
        const currentDate = new Date();
        const date = getformatDate(currentDate)

        const q = query(
            collection(firestoreDB, 'hackathons'),
            where("startDate", ">", date)
        );
        const querySnap = await getDocs(q);

        const upcomingHackathons = querySnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return upcomingHackathons;


    } catch (error) {
        console.error("Error fetching hackathon:", error);
        throw error;
    }
}

export async function oldHackathon() {
    try {
        const currentDate = new Date();
        const date = getformatDate(currentDate)
        const q = query(
            collection(firestoreDB, 'hackathons'),
            where("startDate", "<=", date)
        );
        const querySnap = await getDocs(q);
        const oldHackathons = querySnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return oldHackathons;
    } catch (error) {
        console.error("Error fetching hackathon:", error);
        throw error;
    }
}

export async function registerHackathon(hackathonId) {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert("Please Sign In First");
        }

        const userId = currentUser.uid;
        const docref = doc(firestoreDB, "hackathons", hackathonId)
        const hackathonsnapShot = await getDoc(docref)

        const hackathonData = hackathonsnapShot.data()
        if (hackathonData.participants.includes(userId)) {
            alert("You are already registered for this hackathon!");
            return;
        }

        await updateDoc(docref, {
            participants: arrayUnion(userId)
        })
    } catch (error) {
        console.log("Error registering for hackathons", error);
        alert("Something went wrong. Please try again")

    }
}

export async function fetchUserRegisteredHackathons() {
    try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert("Please Sign In First");
            return [];
        }
        const userId = currentUser.uid;
        const docref = collection(firestoreDB, "hackathons");
        const q = query(docref, where('participants', "array-contains", userId));

        const querySnapShot = await getDocs(q)

        const registeredHackathons = querySnapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return registeredHackathons;
    } catch (error) {
        console.error("Error fetching registered users", error);
        return [];
    }
}