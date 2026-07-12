"use client";

import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminProjectsPage() {
  const fields = [
    { key: 'title', label: 'Project Title', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'client', label: 'Client / Owner', type: 'text' },
    { key: 'url', label: 'Live URL', type: 'url' },
    { key: 'technologies', label: 'Technologies (comma separated)', type: 'array' },
    { key: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">Projects Portfolio</h1>
        <p className="text-body">Manage completed and ongoing client projects.</p>
      </div>
      <CrudDataGrid title="Projects" collectionName="projects" fields={fields} />
    </div>
  );
}
