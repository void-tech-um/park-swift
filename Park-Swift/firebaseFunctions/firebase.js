// firebaseFunctions.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue, push } from 'firebase/database';
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
                id: data.id
            }).then(() => userCredential);
        });
}

export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            const usersRef = ref(database, 'users/' + uid);
            return new Promise((resolve, reject) => {
                onValue(usersRef, (snapshot) => {
                    const userData = snapshot.val();
                    if (!userData) {
                        alert("User does not exist anymore.");
                    } else {
                        resolve(userCredential);
                    }
                }, {
                    onlyOnce: true // This ensures the callback is triggered only once
                });
            });
        });
}      
export function createPost(userID, location, rentalPeriod, price, negotiable, selectedDates) {
    if (!location || !rentalPeriod || !price || negotiable == null || !selectedDates) {
        alert('All parameters must be provided');
    }
    const postsRef = ref(database, 'posts/');
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
        .then(() => postData)
        .catch((error) => {
            alert('Error creating post:', error);
            throw error;
        });
}