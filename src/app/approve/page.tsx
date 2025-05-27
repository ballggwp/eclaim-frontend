'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProtected } from '../../lib/api';
import FormPage from '../../components/FormPage';

export default function ApprovePage() {
  const params = useSearchParams();
  const formId = params.get('formId')!;
  const token = localStorage.getItem('token');
  const { data: form, loading, error } = useProtected<any>(
    `/api/forms/${formId}`, token
  );

  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="text-red-600">Error: {error.message}</p>;
  return <FormPage form={form!} token={token!} />;
}
