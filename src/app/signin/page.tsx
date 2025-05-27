'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type LoginForm = { email: string; password: string };

export default function SignInPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl">Sign In</h1>
      <input {...register('email')}    placeholder="Email"    className="w-full p-2 border" />
      <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
    </form>
  );
}
