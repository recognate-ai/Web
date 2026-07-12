"use client";

import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminProductsPage() {
  const fields = [
    { key: 'name', label: 'Product Name', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">Internal Products</h1>
        <p className="text-body">Manage proprietary products like Foresight.Ai.</p>
      </div>
      <CrudDataGrid title="Products" collectionName="products" fields={fields} />
    </div>
  );
}
