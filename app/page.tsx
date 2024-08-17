"use client"
import { GoogleAuthProvider, ProviderId, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { auth } from "./firebase/firebaseConfig";
import Adddata from "./addData/page";

export default function Home() {
  const handleAdd=async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider);
      const user = result.user;
      console.log('User signed in:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      
    }
    

  }

  return (
    <div>
      <button onClick={handleAdd}>Sign in</button>
      <Adddata/>
    </div>
  );
}
