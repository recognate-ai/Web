import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminAcademicProjectsPage() {
  const fields = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'description', label: 'Abstract', type: 'textarea' },
    { key: 'technologies', label: 'Technologies (Comma Separated)', type: 'array' },
    { key: 'price', label: 'Price (e.g. Inquire for Price)', type: 'text' },
    { key: 'hasReport', label: 'Has Report (true/false)', type: 'text' },
    { key: 'hasPresentation', label: 'Has Presentation (true/false)', type: 'text' },
    { key: 'hasCode', label: 'Has Source Code (true/false)', type: 'text' },
    { key: 'features', label: 'Features (Comma Separated)', type: 'array' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Student Projects</h1>
        <p className="text-gray-400">Manage the final year student projects catalog.</p>
      </div>
      
      <CrudDataGrid 
        title="Student Projects" 
        collectionName="academic_projects" 
        fields={fields} 
      />
    </div>
  );
}
