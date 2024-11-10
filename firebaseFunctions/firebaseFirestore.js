import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, } from "firebase/firestore";
import { app } from '../services/configFirestore';

const auth = getAuth();
const database = getFirestore(app);

export { collection, getDocs, doc, query, where, addDoc, setDoc, getDoc, database };

export const updateUser = async (user) => {
    try {
        await setDoc(doc(database, 'users', user.id), user, { merge: true });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export function registerUser(email, password, fullName) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const userDocRef = doc(database, 'users', uid);
            return setDoc(userDocRef, data)
                .then(() => userCredential);
        });
}

export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            const userDocRef = doc(database, 'users', uid);
            return getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (!docSnapshot.exists()) {
                        throw new Error("User does not exist anymore.");
                    } else {
                        return userCredential;
                    }
                });
        });
}

export function createPost(userID, location, rentalPeriod, price, negotiable, firstDate, lastDate) {
    if (!location || !firstDate || !lastDate) {
        alert('All parameters must be provided');
        return Promise.reject(new Error('Missing required parameters'));
    }
    const postsCollectionRef = collection(database, 'posts');
    const postData = {
        userID: userID,
        location: location,
        rentalPeriod: rentalPeriod, 
        price: price,
        negotiable: negotiable,
        firstDate : firstDate,
        lastDate : lastDate,
        createdAt: new Date().toISOString(),
    };
    return addDoc(postsCollectionRef, postData)
        .then((docRef) => {
            const userPostsDocRef = doc(database, 'users', userID, 'posts', docRef.id);
            return setDoc(userPostsDocRef, { id: docRef.id }).then(() => docRef);
        })
        .catch((error) => {
            alert('Error creating post:', error);
            throw error;
        });
}

export function getUserPosts(userID) {
    const userPostsCollectionRef = collection(database, 'users', userID, 'posts');
    return getDocs(userPostsCollectionRef)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data().id);
            });
            return posts;
        });
}

export function filterByFirstDate(firstDate) {
    const postsCollectionRef = collection(database, 'posts');
    const q = query(postsCollectionRef, where('firstDate', '==', firstDate));
    return getDocs(q)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        });
}

export function filterByLastDate(lastDate) {
    const postsCollectionRef = collection(database, 'posts');
    const q = query(postsCollectionRef, where('lastDate', '==', lastDate));
    return getDocs(q)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        });
}

export function filterByDates(firstDate, lastDate) {
    const postsCollectionRef = collection(database, 'posts');
    const q = query(postsCollectionRef, where('firstDate', '==', firstDate), where('lastDate', '==', lastDate));
    return getDocs(q)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        });
}

export function filterByLocation(location) {
    const postsCollectionRef = collection(database, 'posts');
    const q = query(postsCollectionRef, where('location', '==', location));
    return getDocs(q)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        });
}

export function filterByPrice(minPrice, maxPrice) {
    const postsCollectionRef = collection(database, 'posts');
    const q = query(postsCollectionRef, where('price', '>=', minPrice), where('price', '<=', maxPrice));
    return getDocs(q)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        });
}

export function getAllPosts() {
    const postsCollectionRef = collection(database, 'posts');
    return getDocs(postsCollectionRef)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        });
}

export function getPost(postID) {
    const postDocRef = doc(database, 'posts', postID);
    return getDoc(postDocRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                return docSnapshot.data();
            } else {
                throw new Error('Post does not exist');
            }
        });
}

export function getUser(userId) {
    const userDocRef = doc(database, 'users', userId);
    return getDoc(userDocRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                return docSnapshot.data();
            } else {
                throw new Error('User does not exist');
            }
        });
}
