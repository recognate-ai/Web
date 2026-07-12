"use client";

import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminApplicationsPage() {
  const fields = [
    { key: 'name', label: 'Applicant Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'job_title', label: 'Position', type: 'text' },
    { key: 'resume_url', label: 'Resume Link', type: 'url' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'message', label: 'Message', type: 'textarea' },
    { key: 'created_at', label: 'Applied On', type: 'text' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">Job Applications</h1>
        <p className="text-body">Review and manage candidate applications.</p>
      </div>
      <CrudDataGrid title="Applications" collectionName="job_applications" fields={fields} />
    </div>
  );
}
