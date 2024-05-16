import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database } from '../services/configFirestore';

const db = database;
const auth = getAuth();


export function registerUser(email, password, fullName) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const userDocRef = doc(db, 'users', uid);
            return setDoc(userDocRef, data)
                .then(() => userCredential);
        });
}

export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            const userDocRef = doc(db, 'users', uid);
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
    if (!location || !rentalPeriod || !price || negotiable == null || !firstDate || !lastDate) {
        alert('All parameters must be provided');
    }
    const postsCollectionRef = collection(db, 'posts');
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
            const userPostsDocRef = doc(db, 'users', userID, 'posts', docRef.id);
            return setDoc(userPostsDocRef, { id: docRef.id });
        })
        .catch((error) => {
            alert('Error creating post:', error);
            throw error;
        });
}

export function getUserPosts(userID) {
    const userPostsCollectionRef = collection(db, 'users', userID, 'posts');
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
    const postsCollectionRef = collection(db, 'posts');
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
    const postsCollectionRef = collection(db, 'posts');
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
    const postsCollectionRef = collection(db, 'posts');
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
    const postsCollectionRef = collection(db, 'posts');
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
    const postsCollectionRef = collection(db, 'posts');
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
    const postsCollectionRef = collection(db, 'posts');
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
    const postDocRef = doc(db, 'posts', postID);
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
    const userDocRef = doc(db, 'users', userId);
    return getDoc(userDocRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                return docSnapshot.data();
            } else {
                throw new Error('User does not exist');
            }
        });
}
