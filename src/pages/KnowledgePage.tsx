import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, FileText, GitBranch, Calendar, Loader2, AlertCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import { useRecords } from 'lemma-sdk/react';
import { lemmaClient } from '../lib/lemma';
import { knowledgeItems as mockKnowledgeItems } from '../data/mockData';

const categories = ['All', 'Strategy', 'Technical', 'Research', 'Meeting', 'Ideas'];

const categoryVariant: Record<string, 'info' | 'purple' | 'success' | 'warning' | 'danger'> = {
  Strategy: 'info',
  Technical: 'purple',
  Research: 'success',
  Meeting: 'warning',
  Ideas: 'danger',
};

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const isDemo = (window as any).isLemmaDemoMode === true;

  // 1. Load real records from the "Knowledge" table inside the connected pod
  const { records, isLoading, error } = useRecords<any>({
    client: lemmaClient!,
    tableName: 'Knowledge',
    enabled: !isDemo && !!lemmaClient,
  });

  // 2. Safe mapping function for robust field extraction
  const mapRecord = (rec: any) => {
    const getField = (keys: string[], fallback: any = '') => {
      for (const key of keys) {
        if (rec[key] !== undefined) return rec[key];
        if (rec[key.toLowerCase()] !== undefined) return rec[key.toLowerCase()];
        if (rec[key.toUpperCase()] !== undefined) return rec[key.toUpperCase()];
      }
      return fallback;
    };

    const title = getField(['title', 'name', 'Name', 'title_text'], 'Untitled Document');
    const category = getField(['category', 'Category', 'type'], 'General');
    const summary = getField(['summary', 'aiSummary', 'description', 'ai_summary'], 'No AI summary available.');
    const type = getField(['type', 'fileType', 'file_type'], 'Document');
    const connections = Number(getField(['connections', 'links'], 0));
    const rawTags = getField(['tags', 'Tags'], []);
    const tags = Array.isArray(rawTags) 
      ? rawTags 
      : (typeof rawTags === 'string' 
          ? rawTags.split(',').map(s => s.trim()).filter(Boolean) 
          : []);
    const createdAt = getField(['created_at', 'createdAt', 'created'], new Date().toLocaleDateString());

    return {
      id: rec.id,
      title,
      category,
      summary,
      type,
      connections,
      tags,
      createdAt
    };
  };

  // Convert real records or fallback to mock data if empty (to keep premium design functional)
  const items = records && records.length > 0
    ? records.map(mapRecord)
    : mockKnowledgeItems;

  const filtered = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Knowledge Library"
        subtitle={isLoading ? 'Loading items...' : `${items.length} items in your knowledge base`}
        icon={BookOpen}
      />

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge..."
            className="w-full bg-white/3 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-white/30 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer
                ${activeCategory === cat
                  ? 'gradient-bg text-white'
                  : 'bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/8'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Loading state */}
      {isLoading && !isDemo ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <span className="text-xs text-white/30 tracking-widest uppercase">Fetching Knowledge Base...</span>
        </div>
      ) : error && !isDemo ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
          <p className="text-sm text-white/70">Failed to load Knowledge table</p>
          <span className="text-xs text-white/30 mt-1">{error.message}</span>
        </div>
      ) : (
        /* Knowledge Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <GlassCard key={item.id} delay={Math.min(i * 0.05, 0.4)} className="group">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={categoryVariant[item.category] || 'info'}>
                  {item.category}
                </Badge>
                <span className="text-xs text-white/20">{item.type}</span>
              </div>

              <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-3">
                {item.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-white/30 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-white/25 text-xs">
                  <Calendar className="w-3 h-3" />
                  {item.createdAt}
                </div>
                <div className="flex items-center gap-1.5 text-white/25 text-xs">
                  <GitBranch className="w-3 h-3" />
                  {item.connections} links
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/30">No knowledge items found</p>
        </div>
      )}
    </div>
  );
}
