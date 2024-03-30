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
export function createPost(userID, location, rentalPeriod, price, negotiable, firstDate, lastDate) {
    if (!location || !rentalPeriod || !price || negotiable == null || !firstDate || !lastDate) {
        alert('All parameters must be provided');
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
        firstDate : firstDate,
        lastDate : lastDate,
        // selectedDates: selectedDates, 
        createdAt: new Date().toISOString(),
    };
    return set(newPostRef, postData)
        .then(() => {
            // alert("Did the set")
            // Get a reference to the user's userPosts array
            const userPostsRef = ref(database, 'users/' + userID + '/posts/' + newPostRef.key);
            return set(userPostsRef, newPostRef.key);
        })
        .catch((error) => {
            alert('Error creating post:', error);
            throw error;
        });
}
// Get user's posts  
export function getUserPosts(userID) {
    const userPostsRef = ref(database, 'users/' + userID + '/posts/');
    return new Promise((resolve, reject) => {
        onValue(userPostsRef, (snapshot) => {
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                const post = childSnapshot.val();
                posts.push(post);
            });
            resolve(posts);
        }).catch((error) => {
            reject(error);
        });
    });
}

// Get one post based on postID
export function getPost(postID) {
    const postRef = ref(database, 'posts/' + postID);
    return get(postRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error('Post does not exist');
            }
        });
}


// Get user info based on userID 
export function getUser(userId) {
    const userRef = ref(database, 'users/' + userId);
    return get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error('User does not exist');
            }
        });
}