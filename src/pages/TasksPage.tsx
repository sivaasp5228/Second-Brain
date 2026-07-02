import { motion } from 'framer-motion';
import { CheckSquare, AlertCircle, Circle, CheckCircle2, Sparkles, Calendar, FileText } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import { tasksData } from '../data/mockData';

const priorityConfig = {
  high: { color: 'danger' as const, label: 'High' },
  medium: { color: 'warning' as const, label: 'Medium' },
  low: { color: 'info' as const, label: 'Low' },
};

interface TaskCardProps {
  task: any;
  type: 'todo' | 'inProgress' | 'done';
  index: number;
}

function TaskCard({ task, type, index }: TaskCardProps) {
  const priority = priorityConfig[task.priority as keyof typeof priorityConfig];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="glass rounded-xl p-4 glass-hover cursor-pointer group transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {type === 'done' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : type === 'inProgress' ? (
            <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
          ) : (
            <Circle className="w-4 h-4 text-white/20" />
          )}
          <h4 className={`text-sm font-medium ${type === 'done' ? 'text-white/40 line-through' : 'text-white'}`}>
            {task.title}
          </h4>
        </div>
      </div>

      {/* Progress (in-progress only) */}
      {type === 'inProgress' && task.progress && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white/30">Progress</span>
            <span className="text-xs text-white/50">{task.progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            />
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {task.tags.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-white/30 text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <Badge variant={priority.color} size="sm">{priority.label}</Badge>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-white/25 text-xs">
            <Calendar className="w-3 h-3" />
            {type === 'done' ? task.completedAt : task.deadline}
          </div>
        </div>
      </div>

      {/* Source */}
      <div className="flex items-center gap-1.5 mt-2 text-white/15 text-xs">
        <Sparkles className="w-3 h-3" />
        <span>from</span>
        <FileText className="w-3 h-3" />
        <span className="truncate">{task.source}</span>
      </div>
    </motion.div>
  );
}

const columns = [
  {
    key: 'todo' as const,
    title: 'To Do',
    icon: Circle,
    color: 'text-white/50',
    data: tasksData.todo,
  },
  {
    key: 'inProgress' as const,
    title: 'In Progress',
    icon: AlertCircle,
    color: 'text-blue-400',
    data: tasksData.inProgress,
  },
  {
    key: 'done' as const,
    title: 'Done',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    data: tasksData.done,
  },
];

export default function TasksPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Tasks"
        subtitle="AI-generated tasks from your knowledge base"
        icon={CheckSquare}
        action={
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            {tasksData.todo.length + tasksData.inProgress.length + tasksData.done.length} tasks total
          </div>
        }
      />

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, colIndex) => (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.1 }}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <col.icon className={`w-4 h-4 ${col.color}`} />
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/30">
                  {col.data.length}
                </span>
              </div>
            </div>

            {/* Column Content */}
            <div className="space-y-3">
              {col.data.map((task, i) => (
                <TaskCard key={task.id} task={task} type={col.key} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
