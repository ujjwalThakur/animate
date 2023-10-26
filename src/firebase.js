// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpFShp5hFytgIZ3LruZAe9jHf2eZrY6sg",
  authDomain: "animate-dc8e4.firebaseapp.com",
  projectId: "animate-dc8e4",
  storageBucket: "animate-dc8e4.appspot.com",
  messagingSenderId: "311433882369",
  appId: "1:311433882369:web:b48a222681d4120a42c900",
  measurementId: "G-ZZHY5NT2G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const sendMessage = (message)=>{
  console.log(message)
  const ref = addDoc(collection(db, 'messages'),  {...message, createdAt: Timestamp.now()})
  ref.then((ref)=>console.log('SENT SUCCESSFULLY', `documentId: ${ref.id}`)).catch((error)=>console.log(error))
}

export default sendMessage;
