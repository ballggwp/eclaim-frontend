import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link href="/"><a>Home</a></Link>
        <Link href="/newform"><a>Create Form</a></Link>
        <Link href="/history"><a>History</a></Link>
      </div>
      <Link href="/signin">
        <a className="px-4 py-1 bg-blue-600 text-white rounded">Sign In</a>
      </Link>
    </nav>
  );
}