import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBmnG022B1TQQHt_Br83jPqC_Joac_f9sk",
    authDomain: "yoga-classes-3d48a.firebaseapp.com",
    projectId: "yoga-classes-3d48a",
    storageBucket: "yoga-classes-3d48a.appspot.com",
    messagingSenderId: "804367767585",
    appId: "1:804367767585:web:7507f405e3216e4cb96b60",
    measurementId: "G-HZZ7BCSFSE"
})

var db = firebaseApp.firestore();
export { db };