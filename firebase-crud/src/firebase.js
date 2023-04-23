 import firebase from 'firebase/compat/app';
 import 'firebase/compat/database';
 
 const firebaseConfig = {
    apiKey: "AIzaSyCZu3O2nq-kFEkTSJI8LMOYSuFJoShLOxo",
    authDomain: "crud-details.firebaseapp.com",
    projectId: "crud-details",
    storageBucket: "crud-details.appspot.com",
    messagingSenderId: "96594532264",
    appId: "1:96594532264:web:930ca73eaa2fc47afaef9d"
  };

  const Fb=firebase.initializeApp(firebaseConfig);
  export default Fb.database().ref();