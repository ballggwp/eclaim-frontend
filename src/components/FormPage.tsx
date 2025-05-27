'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Form = {
  formId: string;
  company: string;
  factory: string;
  address: string;
  insuranceGroup: string;
  insuranceType1: string;
  licenseNumber?: string;
  insuranceReason: string;
  insuranceAmount: number;
  quantity: number;
  placeCount: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  totalDays: number;
  coverageDetail: string;
  insuranceDocs: string;
  page: number;
  notes?: string;
  requestCompany: string;
  requestAddress: string;
  accountNumber: string;
  costCenter: string;
  ioNumber: number;
  accountCode: string;
  accountName: string;
  requester: string;
  supervisor: string;
  inspector: string;
};

interface FormPageProps {
  form: Form;
  token: string;
}

export default function FormPage({ form, token }: FormPageProps) {
  const router = useRouter();

  const handleDecision = async (decision: 'APPROVED' | 'REJECTED') => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/approvals`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ formId: form.formId, decision }),
    });
    router.push('/');
  };

  return (
    <div className="bg-white shadow rounded p-6 space-y-6">
      <h2 className="text-xl font-semibold">Form Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Company:</strong> {form.company}</p>
        <p><strong>Factory:</strong> {form.factory}</p>
        <p><strong>Address:</strong> {form.address}</p>
        <p><strong>Insurance Group:</strong> {form.insuranceGroup}</p>
        <p><strong>Insurance Type:</strong> {form.insuranceType1}</p>
        {form.licenseNumber && <p><strong>License #:</strong> {form.licenseNumber}</p>}
        <p><strong>Reason:</strong> {form.insuranceReason}</p>
        <p><strong>Amount:</strong> {form.insuranceAmount}</p>
        <p><strong>Quantity:</strong> {form.quantity}</p>
        <p><strong>Place Count:</strong> {form.placeCount}</p>
        <p><strong>Start:</strong> {form.startDate} {form.startTime}</p>
        <p><strong>End:</strong> {form.endDate} {form.endTime}</p>
        <p><strong>Total Days:</strong> {form.totalDays}</p>
        <p><strong>Coverage Detail:</strong> {form.coverageDetail}</p>
        <p><strong>Insurance Docs:</strong> {form.insuranceDocs}</p>
        <p><strong>Page:</strong> {form.page}</p>
        {form.notes && <p><strong>Notes:</strong> {form.notes}</p>}
        <p><strong>Request Company:</strong> {form.requestCompany}</p>
        <p><strong>Request Address:</strong> {form.requestAddress}</p>
        <p><strong>Account #:</strong> {form.accountNumber}</p>
        <p><strong>Cost Center:</strong> {form.costCenter}</p>
        <p><strong>IO Number:</strong> {form.ioNumber}</p>
        <p><strong>Account Code:</strong> {form.accountCode}</p>
        <p><strong>Account Name:</strong> {form.accountName}</p>
        <p><strong>Requester:</strong> {form.requester}</p>
        <p><strong>Supervisor:</strong> {form.supervisor}</p>
        <p><strong>Inspector:</strong> {form.inspector}</p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleDecision('APPROVED')}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Approve
        </button>
        <button
          onClick={() => handleDecision('REJECTED')}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reject
        </button>
      </div>
    </div>
);
}
