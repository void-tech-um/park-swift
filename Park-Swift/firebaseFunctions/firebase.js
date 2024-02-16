// firebaseFunctions.js

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database';
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