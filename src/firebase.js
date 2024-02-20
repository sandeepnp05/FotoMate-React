import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fotomate-f35ad.firebaseapp.com",
  projectId: "fotomate-f35ad",
  storageBucket: "fotomate-f35ad.appspot.com",
  messagingSenderId: "544853390037",
  appId: "1:544853390037:web:955e519bf695ca817fe85c"
};

const app = initializeApp(firebaseConfig);

export { app };
