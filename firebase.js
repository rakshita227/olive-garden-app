// Get these from: Firebase Console → Project Settings → Your apps → Firebase SDK snippet
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLYx3CaqHMKgFghnhCsregwSyI1rW5uy0",
  authDomain: "rakshita-s-project.firebaseapp.com",
  projectId: "rakshita-s-project",
  storageBucket: "rakshita-s-project.firebasestorage.app",
  messagingSenderId: "838327727856",
  appId: "1:838327727856:web:75402f466add63b016f435",
  measurementId: "G-QL1V69WPLL"
};

const app = initializeApp(firebaseConfig);
export { app };
