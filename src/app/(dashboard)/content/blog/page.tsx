'use client';

import React, { useState, useEffect } from 'react';
import { Plus, FileText, Calendar, User, Edit2, Trash2, Loader2 } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching from content service
    setTimeout(() => {
      setPosts(blogPosts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Blog Posts</h1>
          <p className="text-sm text-slate-500 font-medium">Manage travel guides and articles</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className="text-xs font-black uppercase tracking-widest">Loading Articles...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Article Title</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Author</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {posts.map(post => (
                    <tr key={post.slug} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <span className="text-sm font-black text-slate-900">{post.title}</span>
                          </div>
                      </td>
                      <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <User size={14} className="text-blue-500" /> {post.author}
                          </div>
                      </td>
                      <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <Calendar size={14} className="text-blue-500" /> {post.date}
                          </div>
                      </td>
                      <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                            {post.category}
                          </span>
                      </td>
                      <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                          </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
