var firebaseConfig = {
  apiKey: "AIzaSyA0n4ujEDzIuJz1_w5Wg-QAVZ6Ket54oy4",
  authDomain: "hackeps-2019.firebaseapp.com",
  databaseURL: "https://hackeps-2019.firebaseio.com",
  projectId: "hackeps-2019",
  storageBucket: "hackeps-2019.appspot.com",
  messagingSenderId: "335539218936",
  appId: "1:335539218936:web:c0220bb6a4069a846e8e0d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();