import firebase from "firebase/app";
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCd_dOA5ACZ43R6XxLhMR07GJnm7cnwMh8",
    authDomain: "tables-7ac1f.firebaseapp.com",
    databaseURL: "https://tables-7ac1f.firebaseio.com",
    projectId: "tables-7ac1f",
    storageBucket: "tables-7ac1f.appspot.com",
    messagingSenderId: "637853578540",
    appId: "1:637853578540:web:d400bf8c314d108b1ba889",
    measurementId: "G-H0LTGRJG2Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

//   let db = firebase.firestore();
//   db.settings({timestampsInSnapshots : true})

export default firebase;