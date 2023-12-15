import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//TODO: ex-deskoration 현재
const firebaseConfig = {
    apiKey: 'AIzaSyDh_Z5xYjdRUqNmrm9I2N0TxuM5Ez4Jthw',
    authDomain: 'ex-deskoration.firebaseapp.com',
    projectId: 'ex-deskoration',
    storageBucket: 'ex-deskoration.appspot.com',
    messagingSenderId: '85678692161',
    appId: '1:85678692161:web:7a000cc14f9057999033c0',
    measurementId: 'G-JJ3YKJKWZF',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
