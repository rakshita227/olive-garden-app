// Get these from: Firebase Console → Project Settings → Your apps → Firebase SDK snippet
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDYUdKxv1qHgbo7yFuBumTVZf4wM3X8VI",
  authDomain: "olive-garden-7ee59.firebaseapp.com",
  projectId: "olive-garden-7ee59",
  storageBucket: "olive-garden-7ee59.firebasestorage.app",
  messagingSenderId: "1052541464541",
  appId: "1:1052541464541:web:bc6faf9144f6b276019034"
};

const app = initializeApp(firebaseConfig);
export { app };
