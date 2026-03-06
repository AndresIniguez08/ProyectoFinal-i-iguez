import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4--K-_Wfu2IORNU1EZ0NFK8QQD0JiDyE",
  authDomain: "proyectofinalcoder-7f3f4.firebaseapp.com",
  projectId: "proyectofinalcoder-7f3f4",
  storageBucket: "proyectofinalcoder-7f3f4.firebasestorage.app",
  messagingSenderId: "503252258374",
  appId: "1:503252258374:web:34789aa6fe0288c8c08447",
  measurementId: "G-4WG8VP42P1"
};
// acá inicializo Firebase usando las variables de entorno para no dejar los datos tirados en el código
const app = initializeApp(firebaseConfig);

// desde acá exporto la base para poder usar Firestore en el resto de la app
export const db = getFirestore(app);