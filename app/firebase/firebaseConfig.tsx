import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD4kRJabrRO1Hd73N7TR-ENMkOUmRuDiqs",
  authDomain: "meet-todo.firebaseapp.com",
  projectId: "meet-todo",
  storageBucket: "meet-todo.appspot.com",
  messagingSenderId: "1017558239696",
  appId: "1:1017558239696:web:98fc529a788122379e91d5"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db =getFirestore(app)
export default app;