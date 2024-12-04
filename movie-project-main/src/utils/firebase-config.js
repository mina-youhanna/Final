
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyA4YW3ym54S3w9hVuTgb6C4TWfHxFPO4DE",
authDomain: "react-netflix-clone-ce9fc.firebaseapp.com",
projectId: "react-netflix-clone-ce9fc",
storageBucket: "react-netflix-clone-ce9fc.appspot.com",
messagingSenderId: "575286908713",
appId: "1:575286908713:web:70adce090043bcb5520938",
measurementId: "G-GQ4YWQS2TL"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
