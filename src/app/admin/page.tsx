'use client';
import React from 'react';
import { useProtected } from '../../libs/api';
import { PageHeader }   from '../../components/PageHeader';
import FormCard         from '../../components/FormCard';

export default function ConfirmPage() {
  const token = localStorage.getItem('token');
  const { data: forms, loading, error, mutate } = useProtected<any[]>(
    '/api/forms?status=PENDING_CONFIRM',
    token
  );
  const [filter, setFilter] = React.useState('');

  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="text-red-600">Error: {error.message}</p>;

  const displayed = forms!.filter(f => f.company.includes(filter));

  return (
    <>
      <PageHeader
        title="Confirm form"
        statusColor="green"
        filterValue={filter}
        onFilterClear={() => setFilter('')}
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayed.map(f => (
          <FormCard key={f.formId} form={f} token={token!} mutate={mutate!} />
        ))}
      </div>
    </>
  );
}
