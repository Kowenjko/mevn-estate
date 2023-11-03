// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'my-mevn-estate.firebaseapp.com',
	projectId: 'my-mevn-estate',
	storageBucket: 'my-mevn-estate.appspot.com',
	messagingSenderId: '257761026412',
	appId: '1:257761026412:web:4cd33817a52588a01f5349',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
