import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, FileType, BookOpen, ImageIcon, Music, Link2, X, CheckCircle2, Loader2, Plus } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PageHeader from '../components/ui/PageHeader';
import GradientButton from '../components/ui/GradientButton';
import { mockUploads } from '../data/mockData';

const fileTypeIcons: Record<string, { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: 'text-red-400' },
  DOCX: { icon: FileType, color: 'text-blue-400' },
  TXT: { icon: BookOpen, color: 'text-green-400' },
  Images: { icon: ImageIcon, color: 'text-yellow-400' },
  Audio: { icon: Music, color: 'text-purple-400' },
  Links: { icon: Link2, color: 'text-cyan-400' },
};

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState(mockUploads);
  const [linkUrl, setLinkUrl] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Mock: add new upload
    const newUpload = {
      id: Date.now(),
      name: 'New Upload.pdf',
      type: 'PDF',
      size: '1.2 MB',
      progress: 0,
      status: 'uploading' as const,
    };
    setUploads((prev) => [newUpload, ...prev]);
  }, []);

  const removeUpload = (id: number) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Upload Knowledge"
        subtitle="Feed your Second Brain with documents, files, and links"
        icon={Upload}
      />

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative rounded-2xl border-2 border-dashed p-12 text-center
          transition-all duration-500 cursor-pointer
          ${isDragOver
            ? 'border-blue-400/50 bg-blue-500/5 scale-[1.01]'
            : 'border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/3'
          }
        `}
      >
        {isDragOver && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-violet-500/5 pointer-events-none" />
        )}

        <div className="relative">
          <motion.div
            animate={isDragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            className="w-16 h-16 rounded-2xl gradient-bg mx-auto flex items-center justify-center mb-6 opacity-80"
          >
            <Upload className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-semibold text-white mb-2">
            {isDragOver ? 'Drop your files here' : 'Drag & drop your files'}
          </h3>
          <p className="text-white/40 text-sm mb-6">
            or click to browse from your computer
          </p>

          {/* File Types */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(fileTypeIcons).map(([type, { icon: Icon, color }]) => (
              <div
                key={type}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5"
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span className="text-xs text-white/50">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Link Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">Add from URL</span>
          </div>
          <div className="flex gap-3">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Paste a link to capture knowledge..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
            <GradientButton icon={<Plus className="w-4 h-4" />} onClick={() => setLinkUrl('')}>
              Add
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Uploads</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {uploads.map((upload, i) => {
                const typeConfig = fileTypeIcons[upload.type] || fileTypeIcons.PDF;
                const Icon = typeConfig.icon;
                return (
                  <motion.div
                    key={upload.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${typeConfig.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-white font-medium truncate">{upload.name}</p>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-white/30">{upload.size}</span>
                            {upload.status === 'complete' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            )}
                            <button
                              onClick={() => removeUpload(upload.id)}
                              className="text-white/20 hover:text-white/50 transition-colors cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${upload.progress}%` }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              upload.status === 'complete'
                                ? 'bg-emerald-400'
                                : 'bg-gradient-to-r from-blue-500 to-violet-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
