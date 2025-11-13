// Import dei moduli Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// La tua configurazione (inserisci i tuoi dati)
const firebaseConfig = {
	apiKey: 'AIzaSyAt_aIoXSfsDGcwvPmxIpJpQqvFTxkARKo',
	authDomain: 'guida-interattiva.firebaseapp.com',
	projectId: 'guida-interattiva',
	storageBucket: 'guida-interattiva.firebasestorage.app',
	messagingSenderId: '1058903152048',
	appId: '1:1058903152048:web:a4da11c9e3681dd788b275',
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAt_aIoXSfsDGcwvPmxIpJpQqvFTxkARKo",
//   authDomain: "guida-interattiva.firebaseapp.com",
//   projectId: "guida-interattiva",
//   storageBucket: "guida-interattiva.firebasestorage.app",
//   messagingSenderId: "1058903152048",
//   appId: "1:1058903152048:web:a4da11c9e3681dd788b275"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
