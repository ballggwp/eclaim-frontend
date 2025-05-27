// app/layout.tsx
import './globals.css';
import React, { ReactNode } from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
<nav className="bg-white shadow p-4 flex items-center justify-between">
  <div className="flex space-x-6">      {/* space-x-6 adds gaps */}
    <Link href="/">Home</Link>
    <Link href="/newform">Create Form</Link>
    <Link href="/history">History</Link>
  </div>
  <Link href="/signin">
    <button className="px-4 py-1 bg-blue-600 text-white rounded">
      Sign In
    </button>
  </Link>
</nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
