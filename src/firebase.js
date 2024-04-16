import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC9zJBTi-lkqAztAyhV4fDLWpHBMCWXTOg",
  authDomain: "pedroshop-2563f.firebaseapp.com",
  projectId: "pedroshop-2563f",
  storageBucket: "pedroshop-2563f.appspot.com",
  messagingSenderId: "831132694304",
  appId: "1:831132694304:web:be0202bb3e1a42ebcfc945",
  measurementId: "G-J15RG373EX"
};


const firebaseapp = initializeApp(firebaseConfig)

export default firebaseapp