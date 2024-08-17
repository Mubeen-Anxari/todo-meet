"use client";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Adddata: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const { currentUser } = useAuth();
  const [usersList, setusersList] = useState([])
  const [editUserId, seteditUserId] = useState("")
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (editUserId) {
      //update 
      alert("dddd")
    } else {

      try {
        await addDoc(collection(db, "Users"), {
          name: username,
          userId: currentUser?.uid,
        });
        setUsername("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  const getData = async () => {
    const q = query(
      collection(db, "Users"),
      where("userId", "==", currentUser?.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log("🚀 ~ getData ~ querySnapshot:", querySnapshot);
    let users: any = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setusersList(users)
    console.log("🚀 ~ getData ~ users:", users);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        {usersList?.map((user: any) => (
          <div key={user.id} onClick={() => {
            seteditUserId(user.id)
            setUsername(user.name)
          }}>
            <p>{user.name}</p>
          </div>
        ))}
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white p-2 rounded w-full"
            type="submit"
          >
            {editUserId ? "update" : "Add User"}
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded w-full"
            onClick={getData}
          >
            Get data
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded w-full"
            onClick={() => {
              signOut(auth);
              router.push("/");
            }}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adddata;
