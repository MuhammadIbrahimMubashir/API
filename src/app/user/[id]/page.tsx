"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// UserProfile component
export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    async function fetchUserData() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    }

    fetchUserData();
  }, [params.id]);

  // Display loading state until the data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md border w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
        <p className="text-gray-700">Username: {user?.username}</p>
        <p className="text-gray-500">Email: {user?.email}</p>
        <p className="text-gray-500">Phone: {user?.phone}</p>
        <p className="text-gray-500">Website: {user?.website}</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Users
        </Link>
      </div>
    </div>
  );
}
