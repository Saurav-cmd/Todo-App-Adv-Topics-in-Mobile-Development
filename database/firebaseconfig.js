import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDUdWmCJ7H7GMIb55uk8x1zd8SllN8Pjhw",
    authDomain: "adv-topic-in-mobile-dev.firebaseapp.com",
    projectId: "adv-topic-in-mobile-dev",
    storageBucket: "adv-topic-in-mobile-dev.appspot.com",
    messagingSenderId: "864790036661",
    appId: "1:864790036661:web:35e313e23409bb9d79befc"
};

const app = initializeApp(firebaseConfig);

export { app };