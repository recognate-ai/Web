"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, X, Save, Search, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CrudDataGrid({ title, collectionName, fields }: { title: string, collectionName: string, fields: { key: string, label: string, type: string }[] }) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, unknown>>({});
  
  const [isAdding, setIsAdding] = useState(false);
  const [addFormData, setAddFormData] = useState<Record<string, unknown>>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string, isAddForm: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      // eslint-disable-next-line react-hooks/purity
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (isAddForm) {
        setAddFormData((prev: Record<string, unknown>) => ({...prev, [fieldKey]: publicUrl}));
      } else {
        setEditFormData((prev: Record<string, unknown>) => ({...prev, [fieldKey]: publicUrl}));
      }

    } catch (err: unknown) {
      alert("Error uploading image: " + (err as Error).message);
    } finally {
      setUploadingImage(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: items, error: fetchError } = await supabase
        .from(collectionName)
        .select('*')
        .order('created_at', { ascending: false });
        
      if (fetchError) throw fetchError;
      setData(items || []);
    } catch (err: unknown) {
      const errMsg = (err as { message?: string })?.message || "";
      console.warn("Supabase fetch error:", errMsg || JSON.stringify(err));
      setData([]); 
      if (errMsg.includes("permission denied") || errMsg.includes("RLS")) {
        setError("Permission denied by Row Level Security (RLS). Please check your policies.");
      } else {
        setError("Supabase not configured or failed to connect.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...addFormData };
      fields.forEach(f => {
        if (f.type === 'array' && typeof payload[f.key] === 'string') {
          payload[f.key] = (payload[f.key] as string).split(',').map((s: string) => s.trim()).filter(Boolean);
        }
      });
      const { error: insertError } = await supabase
        .from(collectionName)
        .insert([payload]);
      if (insertError) throw insertError;
      setIsAdding(false);
      setAddFormData({});
      fetchData();
    } catch (err: unknown) {
      alert("Failed to add: " + ((err as { message?: string })?.message || JSON.stringify(err)));
    }
  };

  const handleUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      const payload = { ...editFormData };
      fields.forEach(f => {
        if (f.type === 'array' && typeof payload[f.key] === 'string') {
          payload[f.key] = (payload[f.key] as string).split(',').map((s: string) => s.trim()).filter(Boolean);
        }
      });
      const { error: updateError } = await supabase
        .from(collectionName)
        .update(payload)
        .eq('id', id);
      if (updateError) throw updateError;
      setIsEditing(null);
      fetchData();
    } catch (err: unknown) {
      alert("Failed to update: " + ((err as { message?: string })?.message || JSON.stringify(err)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error: deleteError } = await supabase
        .from(collectionName)
        .delete()
        .eq('id', id);
      if (deleteError) throw deleteError;
      fetchData();
    } catch (err: unknown) {
      alert("Failed to delete: " + ((err as { message?: string })?.message || JSON.stringify(err)));
    }
  };

  const filteredData = data.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    // Search across all string fields
    return fields.some(f => {
      const val = item[f.key];
      return typeof val === 'string' && val.toLowerCase().includes(query);
    });
  });

  const isModalOpen = isAdding || isEditing !== null;

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-12 text-cyan-400">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p>Loading {title}...</p>
    </div>
  );

  return (
    <>
      <div className="glass-card p-6 border-white/10 rounded-xl relative">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-xl font-bold font-space text-white">{title}</h2>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-body" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050810] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg text-sm flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0"></span> {error}</div>}

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#050810]">
        <table className="w-full text-left text-sm text-body">
          <thead className="bg-white/10 text-white font-space font-bold uppercase text-xs tracking-wider">
            <tr>
              {fields.map(f => <th key={f.key} className="px-4 py-3">{f.label}</th>)}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={fields.length + 1} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-body">
                    <SearchX size={48} className="mb-4 opacity-50" />
                    <p className="text-lg">No records found</p>
                    {searchQuery && <p className="text-sm mt-1">Try adjusting your search criteria</p>}
                  </div>
                </td>
              </tr>
            ) : filteredData.map((item) => (
              <tr key={item.id as string} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                {fields.map(f => (
                  <td key={f.key} className="px-4 py-3 text-white max-w-[250px] truncate" title={item[f.key] as string}>
                    {item[f.key] as React.ReactNode}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setIsEditing(item.id as string); setEditFormData(item); }} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id as string)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>

      {/* Add / Edit Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-2xl max-h-[90vh] flex flex-col border-white/10 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="shrink-0 z-10 flex justify-between items-center p-6 border-b border-white/10 bg-[#0a0f1d]/90 backdrop-blur-md">
                <h3 className="text-xl font-bold font-space text-white">{isAdding ? 'Add New Record' : 'Edit Record'}</h3>
                <button 
                  onClick={() => { setIsAdding(false); setIsEditing(null); }} 
                  className="p-2 text-body hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => isAdding ? handleAdd(e) : handleUpdate(e, isEditing!)} className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-6 mb-8">
                  {fields.map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-bold tracking-wider text-body uppercase mb-2 ml-1">{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea
                          required
                          rows={4}
                          value={isAdding ? ((addFormData[f.key] as string) || '') : ((editFormData[f.key] as string) || '')}
                          onChange={(e) => isAdding 
                            ? setAddFormData({...addFormData, [f.key]: e.target.value})
                            : setEditFormData({...editFormData, [f.key]: e.target.value})
                          }
                          className="w-full bg-[#050810] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      ) : f.type === 'image' ? (
                        <div className="relative">
                          {((isAdding ? addFormData[f.key] : editFormData[f.key]) as string) && (
                            <div className="relative w-32 h-32 mb-4">
                              <Image src={(isAdding ? addFormData[f.key] : editFormData[f.key]) as string} alt="Preview" fill className="object-cover rounded-xl border border-white/10" />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, f.key, isAdding)}
                            className="w-full bg-[#050810] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                          />
                          {uploadingImage && <p className="text-cyan-400 text-sm mt-2 animate-pulse">Uploading...</p>}
                        </div>
                      ) : f.type === 'array' ? (
                        <input
                          type="text"
                          required
                          placeholder="Comma separated values"
                          value={
                            Array.isArray(isAdding ? addFormData[f.key] : editFormData[f.key])
                              ? ((isAdding ? addFormData[f.key] : editFormData[f.key]) as string[]).join(', ')
                              : (isAdding ? ((addFormData[f.key] as string) || '') : ((editFormData[f.key] as string) || ''))
                          }
                          onChange={(e) => isAdding 
                            ? setAddFormData({...addFormData, [f.key]: e.target.value})
                            : setEditFormData({...editFormData, [f.key]: e.target.value})
                          }
                          className="w-full bg-[#050810] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      ) : (
                        <input
                          type={f.type}
                          required
                          value={isAdding ? ((addFormData[f.key] as string) || '') : ((editFormData[f.key] as string) || '')}
                          onChange={(e) => isAdding 
                            ? setAddFormData({...addFormData, [f.key]: e.target.value})
                            : setEditFormData({...editFormData, [f.key]: e.target.value})
                          }
                          className="w-full bg-[#050810] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button type="submit" disabled={uploadingImage} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    <Save size={18} /> {isAdding ? 'Create Record' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setIsAdding(false); setIsEditing(null); }} 
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
