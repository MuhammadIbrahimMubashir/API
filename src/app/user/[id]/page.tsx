import Link from 'next/link';

// Function to fetch users for dynamic routing
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const users = await getUsers();
  return users.map((user: { id: number }) => ({
    id: user.id.toString(),
  }));
}

// Fetch user data for the profile page at request time
async function getUserData(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
}

// UserProfile page component (Server Component)
export default async function UserProfile({ params }: { params: { id: string } }) {
  // Fetch user data using params.id
  const user = await getUserData(params.id);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md border w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-gray-700">Username: {user.username}</p>
        <p className="text-gray-500">Email: {user.email}</p>
        <p className="text-gray-500">Phone: {user.phone}</p>
        <p className="text-gray-500">Website: {user.website}</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Users
        </Link>
      </div>
    </div>
  );
}
