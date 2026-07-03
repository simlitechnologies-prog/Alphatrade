"use client";

import { useState } from "react";
import { Plus, Edit2 } from "lucide-react";
import { PageHeader, AdminCard, Th, Td, StatusBadge } from "@/components/dashboard/admin-widgets";
import { Badge } from "@/components/ui/card";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft" | "archived";
  author: string;
  publishedAt: string;
  views: number;
}

const initialNews: NewsItem[] = [
  { id: "n1", title: "Fed holds rates steady — dollar softens", category: "Forex", status: "published", author: "Research Desk", publishedAt: "2026-06-30", views: 4821 },
  { id: "n2", title: "NVIDIA earnings beat estimates by 12%", category: "Stocks", status: "published", author: "Research Desk", publishedAt: "2026-06-29", views: 3204 },
  { id: "n3", title: "Gold near record highs ahead of NFP", category: "Commodities", status: "published", author: "Research Desk", publishedAt: "2026-06-29", views: 2891 },
  { id: "n4", title: "Q3 outlook: emerging market currencies", category: "Forex", status: "draft", author: "Admin", publishedAt: "—", views: 0 },
  { id: "n5", title: "Crypto regulation update — June 2026", category: "Crypto", status: "draft", author: "Admin", publishedAt: "—", views: 0 },
];

const statusMap = {
  published: { label: "Published", class: "bg-green-50 text-brand-success" },
  draft: { label: "Draft", class: "bg-slate-100 text-slate-500" },
  archived: { label: "Archived", class: "bg-amber-50 text-brand-accent" },
};

export default function AdminNewsPage() {
  const [articles, setArticles] = useState(initialNews);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Forex");

  function publish(id: string) {
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: "published" as const, publishedAt: new Date().toISOString().slice(0, 10) } : a));
  }

  function archive(id: string) {
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: "archived" as const } : a));
  }

  function addDraft() {
    if (!newTitle.trim()) return;
    setArticles((prev) => [...prev, {
      id: `n${Date.now()}`,
      title: newTitle,
      category: newCategory,
      status: "draft",
      author: "Admin",
      publishedAt: "—",
      views: 0,
    }]);
    setNewTitle("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="News Management"
        sub={`${articles.filter((a) => a.status === "published").length} published · ${articles.filter((a) => a.status === "draft").length} drafts`}
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} /> New article
          </button>
        }
      />

      {showForm && (
        <AdminCard title="New article">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Title</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Article title…"
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Category</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                {["Forex", "Stocks", "Crypto", "Commodities", "Indices", "Markets"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={addDraft} className="h-10 rounded-lg bg-brand-secondary px-4 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Save draft
            </button>
          </div>
        </AdminCard>
      )}

      <AdminCard title="All articles">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>Title</Th><Th>Category</Th><Th>Status</Th>
                <Th>Author</Th><Th>Published</Th><Th>Views</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td className="font-medium max-w-[220px] truncate dark:text-white">{a.title}</Td>
                  <Td>
                    <Badge tone="neutral">{a.category}</Badge>
                  </Td>
                  <Td><StatusBadge status={a.status} map={statusMap} /></Td>
                  <Td className="text-foreground/50">{a.author}</Td>
                  <Td className="text-foreground/50">{a.publishedAt}</Td>
                  <Td className="tabular">{a.views > 0 ? a.views.toLocaleString() : "—"}</Td>
                  <Td>
                    <div className="flex gap-1.5">
                      <button className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 text-foreground/50 hover:bg-slate-200 transition-colors dark:bg-slate-800">
                        <Edit2 size={12} />
                      </button>
                      {a.status === "draft" && (
                        <button onClick={() => publish(a.id)} className="rounded px-2 py-1 text-xs font-medium bg-green-50 text-brand-success hover:bg-brand-success hover:text-white transition-colors">
                          Publish
                        </button>
                      )}
                      {a.status === "published" && (
                        <button onClick={() => archive(a.id)} className="rounded px-2 py-1 text-xs font-medium bg-amber-50 text-brand-accent hover:bg-brand-accent hover:text-white transition-colors">
                          Archive
                        </button>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
