'use client';
import React from 'react';
import { useProtected } from '../../libs/api';
import { PageHeader }   from '../../components/PageHeader';
import { Button } from '../../components/ui/button';

export default function DoneFormPage() {
  const token = localStorage.getItem('token');
  const { data: forms, loading, error } = useProtected<any[]>(
    '/api/forms?status=CONFIRMED',
    token
  );
  const [filter, setFilter] = React.useState('');

  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="text-red-600">Error: {error.message}</p>;

  const displayed = forms!.filter(f => f.company.includes(filter));

  return (
    <>
      <PageHeader
        title="Done Form"
        statusColor="green"
        filterValue={filter}
        onFilterClear={() => setFilter('')}
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayed.map(f => (
          <div key={f.formId} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold">{f.company}</p>
            <p className="text-sm text-gray-500">{f.factory}</p>
            <p className="mt-2 text-gray-700">{f.insuranceReason}</p>
            <div className="mt-4 flex space-x-2">
              <Button size="sm" variant="outline">Print Form</Button>
              <Button size="sm" variant="default" onClick={() => {/* renew logic */}}>
                ดำเนินการต่อ
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
