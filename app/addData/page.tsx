import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';

const Adddata: React.FC = () => {
  const [username, setUsername] = useState<string>('');


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Users" ), {
        name: username,
        userId:string
      });
      setUsername(""); 
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
          className='bg-blue-500 text-white p-2 rounded w-full'
            type="submit"
          >Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adddata;
