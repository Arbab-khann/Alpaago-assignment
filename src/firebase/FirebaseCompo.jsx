// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue, remove, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBslOmaR3quDw9kraYzIXymaS7DLlRVp6I",
  authDomain: "alpaago-assignment-e433d.firebaseapp.com",
  projectId: "alpaago-assignment-e433d",
  storageBucket: "alpaago-assignment-e433d.appspot.com",
  messagingSenderId: "753684772409",
  appId: "1:753684772409:web:8ceb490e6eeb9092cc7fe8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, ref, set, get, onValue, remove };
