import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJZjdw1mjKL8kQbC2GHzn2iBq5lDXVF24",
  authDomain: "datathon-c7acb.firebaseapp.com",
  projectId: "datathon-c7acb",
  storageBucket: "datathon-c7acb.appspot.com",
  messagingSenderId: "535739777798",
  appId: "1:535739777798:web:ea53b14f67640521a75487",
  measurementId: "G-T3QRW3F6K4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
