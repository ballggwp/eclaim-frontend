// components/HeroBanner.tsx
'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent text-white"
      style={{ height: '300px' }}
    >
      {/* Optional background image overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-30"
        style={{ backgroundImage: 'url(/images/banner-bg.jpg)' }}
      />

      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-6 lg:px-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to E-Claim
        </h1>
        <p className="mt-4 max-w-xl text-lg sm:text-xl opacity-90 drop-shadow">
          Streamline your insurance requisitions with speed, ease, and transparency.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link href="/newform" className="inline-block">
            <button className="px-6 py-3 bg-white text-primary font-medium rounded-lg shadow hover:scale-105 transition-transform">
              Create New Form
            </button>
          </Link>
          <Link href="/history" className="inline-block">
            <button className="px-6 py-3 border border-white font-medium rounded-lg hover:bg-white/20 transition-colors">
              View History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
