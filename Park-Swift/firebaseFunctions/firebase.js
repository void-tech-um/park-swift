// firebaseFunctions.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue} from 'firebase/database';
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
            }).then(() => data);
        });
}

export function loginUser(email, password, fullName) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // alert(userCredential.user.uid)
            const uid = userCredential.user.uid;
            const usersRef = ref(database, 'users/' + uid);
            // alert(usersRef.key)
            onValue(usersRef, (snapshot) => {
                const userData = snapshot.val();
                if (!userData) {
                    alert("User does not exist anymore.");
                    return;
                }else{
                    
                    navigation.navigate('Tab', { user: userData });
                }
            }, {
                onlyOnce: true // This ensures the callback is triggered only once
            });
        });
}

export function createPost(userId) {
    const usersRef = ref(database, 'users/' + userId);
    const postRef = ref(database, 'posts/' + userId);
    const newPostRef = push(postRef);
    return set(newPostRef, postData).then(() => postData);
        
}