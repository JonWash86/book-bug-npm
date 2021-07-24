// firebase config file per tutorial on https://javascript.plainenglish.io/lets-create-react-app-with-firebase-auth-express-backend-and-mongodb-database-805c83e4dadd

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBfshauRN_LQa6zm0dutU5NnHDk5c_SeaM",
  authDomain: "bookbug-6289b.firebaseapp.com",
  databaseURL: "https://bookbug-6289b.firebaseio.com",
  projectId: "bookbug-6289b",
  storageBucket: "bookbug-6289b.appspot.com",
  messagingSenderId: "345189969519",
  appId: "1:345189969519:web:baeec53440cd32a48ee79a"
}

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;
export default fire;
