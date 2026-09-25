'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Plus, Trash, Pencil, SignOut } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

interface FeedbackRow {
  id: number;
  name_hash: string;
  display_name: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export function AdminDashboard() {
  const [items, setItems] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editBody, setEditBody] = useState('');
  const [newName, setNewName] = useState('');
  const [newBody, setNewBody] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const router = useRouter();

  const fetchFeedback = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/feedback');
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const json: { data: FeedbackRow[] } = await res.json();
      setItems(json.data);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  async function handleSaveEdit(id: number) {
    setError('');
    const fields: Record<string, string> = {};
    if (editName.trim()) fields.display_name = editName.trim();
    if (editBody.trim()) fields.body = editBody.trim();
    if (Object.keys(fields).length === 0) return;

    const res = await fetch(`/api/admin/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    if (!res.ok) {
      const json = await res.json();
      setError(json.error?.message ?? 'Update failed');
      return;
    }
    setEditingId(null);
    setEditName('');
    setEditBody('');
    fetchFeedback();
  }

  async function handleDelete(id: number) {
    setError('');
    const res = await fetch(`/api/admin/feedback/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const json = await res.json();
      setError(json.error?.message ?? 'Delete failed');
      return;
    }
    setConfirmDelete(null);
    fetchFeedback();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setCreating(true);
    const res = await fetch('/api/admin/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, body: newBody }),
    });
    const json = await res.json();
    setCreating(false);
    if (!res.ok) {
      setError(json.error?.message ?? 'Create failed');
      return;
    }
    setNewName('');
    setNewBody('');
    fetchFeedback();
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="heading-section !mb-0">Feedback Admin</h1>
          <p className="text-body-sm mt-1">{items.length} entries</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary text-sm">
          <SignOut size={16} />
          Log out
        </button>
      </div>

      {/* Create */}
      <form
        onSubmit={handleCreate}
        className="structured-container p-6 mb-8 flex flex-col gap-4"
      >
        <h2 className="heading-card text-lg">Add Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name (will be masked)"
            className="px-4 py-2.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-lg text-sm text-white light:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            required
            maxLength={50}
          />
          <input
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Feedback body"
            className="px-4 py-2.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-lg text-sm text-white light:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            required
            maxLength={2000}
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="btn-primary self-start disabled:opacity-50"
        >
          <Plus size={16} />
          {creating ? 'Adding…' : 'Add Entry'}
        </button>
      </form>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      {/* List */}
      <div className="flex flex-col gap-4">
        {loading && <p className="text-body-sm text-slate-500">Loading…</p>}
        {!loading && items.length === 0 && (
          <p className="text-body-sm text-slate-500">No entries yet.</p>
        )}
        {!loading &&
          items.map((item) => (
            <motion.div
              key={item.id}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="structured-container p-5"
            >
              {editingId === item.id ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-meta text-slate-500 w-8">
                      #{item.id}
                    </span>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder={item.display_name}
                      className="flex-1 px-3 py-1.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-md text-sm text-white light:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                    />
                  </div>
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={2}
                    placeholder={item.body}
                    className="w-full px-3 py-1.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-md text-sm text-white light:text-zinc-900 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="btn-primary text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditName('');
                        setEditBody('');
                      }}
                      className="btn-secondary text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-meta text-slate-500">#{item.id}</span>
                    <span className="text-sm font-medium text-white light:text-zinc-900">
                      {item.display_name}
                    </span>
                    <span className="ml-auto text-meta text-slate-500">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-body-sm mb-3">{item.body}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditName(item.display_name);
                        setEditBody(item.body);
                      }}
                      className="btn-secondary text-xs px-3 py-1.5"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    {confirmDelete === item.id ? (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors"
                      >
                        Confirm delete
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(item.id)}
                        className="btn-secondary text-xs px-3 py-1.5"
                      >
                        <Trash size={14} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
