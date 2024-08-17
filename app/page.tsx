"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useAuth } from "./components/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/addData");
    }
  }, [currentUser]);

  const handleAdd = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>Sign in</button>
    </div>
  );
}
