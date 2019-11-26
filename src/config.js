import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyBStR3jxhpL-rInNABRKHz_uAnesAMnzYY",
  authDomain: "foodfinder-rn.firebaseapp.com",
  databaseURL: "https://foodfinder-rn.firebaseio.com",
  projectId: "foodfinder-rn",
  storageBucket: "",
  messagingSenderId: "393117823458",
  appId: "1:393117823458:web:136de74cb4cb33b7a649bb"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
