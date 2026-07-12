"use client";

import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminCareersPage() {
  const fields = [
    { key: 'title', label: 'Job Title', type: 'text' },
    { key: 'department', label: 'Department', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'type', label: 'Job Type', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'requirements', label: 'Requirements (comma-separated)', type: 'textarea' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">Open Positions</h1>
        <p className="text-body">Manage job listings on the Careers page.</p>
      </div>
      <CrudDataGrid title="Jobs" collectionName="jobs" fields={fields} />
    </div>
  );
}
