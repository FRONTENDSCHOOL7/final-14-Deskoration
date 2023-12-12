import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB8TEGf3xLZzA20X7Vt6xrZhD7z5lpHMco',
    authDomain: 'deskoration-cf319.firebaseapp.com',
    projectId: 'deskoration-cf319',
    storageBucket: 'deskoration-cf319.appspot.com',
    messagingSenderId: '946151043132',
    appId: '1:946151043132:web:fdd09ca570c42593149339',
    measurementId: 'G-MEXR3RN510',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
