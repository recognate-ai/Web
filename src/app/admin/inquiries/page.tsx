import React from 'react';
import CrudDataGrid from '@/components/admin/CrudDataGrid';

export default function AdminInquiriesPage() {
  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email Address', type: 'text' },
    { key: 'phone', label: 'Phone Number', type: 'text' },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'category', label: 'Inquiry Category', type: 'text' },
    { key: 'timeline', label: 'Estimated Timeline', type: 'text' },
    { key: 'description', label: 'Message / Description', type: 'textarea' },
    { key: 'created_at', label: 'Submitted At', type: 'text' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Contact Inquiries</h1>
        <p className="text-gray-400">View and manage user requests submitted through the contact form.</p>
      </div>
      
      <CrudDataGrid 
        title="Inquiries" 
        collectionName="contact_requests" 
        fields={fields} 
      />
    </div>
  );
}
