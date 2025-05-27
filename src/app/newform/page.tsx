'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type NewForm = {
  company: string; factory: string; insuranceReason: string;
  /* ...add all your fields here... */
};

export default function NewFormPage() {
  const { register, handleSubmit } = useForm<NewForm>();
  const router = useRouter();

  const onSubmit = async (data: NewForm) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forms`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    router.push('/history');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl">Create New Form</h1>
      <input {...register('company')}          placeholder="Company"          className="w-full p-2 border" />
      <input {...register('factory')}          placeholder="Factory"          className="w-full p-2 border" />
      <input {...register('insuranceReason')}  placeholder="Insurance Reason" className="w-full p-2 border" />
      {/* …other inputs… */}
      <button type="submit" className="bg-green-600 text-white p-2 rounded">Submit</button>
    </form>
  );
}
