"use client";

import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminRdPage() {
  const fields = [
    { key: 'title', label: 'Prototype Title', type: 'text' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">R&D Prototypes</h1>
        <p className="text-body">Manage internal research and development prototypes.</p>
      </div>
      <CrudDataGrid title="R&D Prototypes" collectionName="rd_prototypes" fields={fields} />
    </div>
  );
}
