import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SearchBar from '../components/ui/SearchBar';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { dashboardStats, recentActivity, quickActions } from '../data/mockData';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="gradient-text">Alex</span> 👋
        </h1>
        <p className="text-white/40 mt-2">Your Second Brain has been busy while you were away.</p>
      </motion.div>

      {/* Search */}
      <SearchBar className="mb-8 max-w-2xl" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat, i) => (
          <GlassCard key={stat.id} delay={i * 0.1} className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl -translate-y-4 translate-x-4`} />
            <div className="flex items-start justify-between relative">
              <div>
                <p className="text-white/40 text-sm">{stat.title}</p>
                <div className="text-3xl font-bold text-white mt-2">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium">{stat.change}</span>
                  <span className="text-white/30 text-xs">vs last month</span>
                </div>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center opacity-80`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Recent Activity
              </h2>
              <button className="text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/8 transition-colors">
                    <activity.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{activity.title}</p>
                    <p className="text-xs text-white/40 mt-0.5 truncate">{activity.description}</p>
                  </div>
                  <span className="text-xs text-white/30 flex-shrink-0">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div>
          <GlassCard hover={false}>
            <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-white/60 font-medium text-center group-hover:text-white/80 transition-colors">
                    {action.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </GlassCard>

          {/* AI Summary Card */}
          <GlassCard className="mt-4 relative overflow-hidden" hover={false} delay={0.5}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">AI Active</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                GAPPY discovered <span className="text-white font-medium">3 new connections</span> between
                your recent uploads and existing knowledge. Your productivity score is up{' '}
                <span className="text-emerald-400 font-medium">18%</span> this week.
              </p>
              <button
                onClick={() => navigate('/insights')}
                className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                View Insights <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
