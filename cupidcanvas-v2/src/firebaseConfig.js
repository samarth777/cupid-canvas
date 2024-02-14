// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl_3RXM5mbW8Q24Qsvcs8SOPbTUPMNKiU",
  authDomain: "cupid-canvas.firebaseapp.com",
  projectId: "cupid-canvas",
  storageBucket: "cupid-canvas.appspot.com",
  messagingSenderId: "251348646940",
  appId: "1:251348646940:web:7e522d760f8b2ef26d33d9",
  measurementId: "G-PYT4QEDEL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = firebase.storage();

export { storage };