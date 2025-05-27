// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useProtected } from '../lib/api';
import FormCard from '../components/FormCard';
import Navbar from '@/components/Navbar';
type Form = {
  formId: string;
  company: string;
  factory: string;
  insuranceReason: string;
};

export default function OnProgressPage() {
  // state to hold token
  const [token, setToken] = useState<string | null>(null);

  // only run in browser
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const { data: forms, loading, error, mutate } = useProtected<Form[]>(
    '/api/forms?status=PENDING_APPROVE_1',
    token
  );

  if (!token)         return <p>Loading auth…</p>;
  if (loading)        return <p>Loading forms…</p>;
  if (error)          return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <main>
        <Navbar/>
        <div className="grid grid-cols-2 gap-4">
      {forms?.map(f => (
        <FormCard key={f.formId} form={f} token={token} mutate={mutate!} />
      ))}
    </div>
    </main>
    
  );
}
