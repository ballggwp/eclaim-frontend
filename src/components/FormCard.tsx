import React from 'react';
import { useRouter } from 'next/router';

type Form = { formId: string; company: string; factory: string; insuranceReason: string; };
interface Props { form: Form; token: string; mutate: () => void; }
export default function FormCard({ form, token, mutate }: Props) {
  const router = useRouter();
  const handle = async (decision: 'APPROVED' | 'REJECTED') => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/approvals`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ formId: form.formId, decision })
    });
    mutate();
  };
  return (
    <div className="bg-white shadow rounded p-4">
      <p>Company: {form.company}</p>
      <p>Factory: {form.factory}</p>
      <p>Reason: {form.insuranceReason}</p>
      <div className="mt-4 space-x-2">
        <button onClick={() => router.push(`/approve?formId=${form.formId}`)} className="px-3 py-1 bg-blue-600 text-white rounded">View</button>
        <button onClick={() => handle('APPROVED')} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
        <button onClick={() => handle('REJECTED')} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
      </div>
    </div>
  );
}