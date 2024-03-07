// firebaseFunctions.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue, push,get } from 'firebase/database';
import { database } from '../services/config';

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
            const usersRef = ref(database, 'users/' + uid);
            return set(usersRef, {
                fullName: data.fullName,
                email: data.email,
                id: data.id,
            }).then(() => userCredential);
        });
}

export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            const usersRef = ref(database, 'users/' + uid);
            return new Promise((resolve, reject) => {
                get(usersRef).then((snapshot) => {
                    const userData = snapshot.val();
                    if (!userData) {
                        reject("User does not exist anymore.");
                    } else {
                        resolve(userCredential);
                    }
                }).catch((error) => {
                    console.error(error);
                    reject(error);
                });
            });
        });
}    
export function createPost(userID, location, rentalPeriod, price, negotiable, selectedDates) {
    if (!location || !rentalPeriod || !price || negotiable == null || !selectedDates) {
        error('All parameters must be provided');
    }
    const postsRef = ref(database, 'posts/');
    // const userPostsRef = ref(database, 'users/' + uid + 'userPosts/');
    const newPostRef = push(postsRef);
    const postData = {
        userID: userID,
        location: location,
        rentalPeriod: rentalPeriod, 
        price: price,
        // description:description,
        negotiable: negotiable,
        selectedDates: selectedDates, 
        createdAt: new Date().toISOString(),
    };
    return set(newPostRef, postData)
        .then(() => {
            alert("did the set")
            // Get a reference to the user's userPosts array
            const userPostsRef = ref(database, 'users/' + userID + '/posts/' + newPostRef.key);
            return set(userPostsRef, newPostRef.key);
        })
        .catch((error) => {
            alert('Error creating post:', error);
            throw error;
        });
}