import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fotomate-photography.firebaseapp.com",
  projectId: "fotomate-photography",
  storageBucket: "fotomate-photography.appspot.com",
  messagingSenderId: "846534752428",
  appId: "1:846534752428:web:0240340c6048a6534e8709"
};

const app = initializeApp(firebaseConfig);

export { app };
