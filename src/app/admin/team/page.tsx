"use client";

import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminTeamPage() {
  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'expertise', label: 'Expertise', type: 'text' },
    { key: 'image_url', label: 'Photo', type: 'image' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="heading-2 mb-2">Team Management</h1>
        <p className="text-body">Add, edit, or remove leadership team members.</p>
      </div>
      <CrudDataGrid title="Team Members" collectionName="team_members" fields={fields} />
    </div>
  );
}
