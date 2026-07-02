import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, HelpCircle, Sparkles, Clock } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import GlassCard from '../components/ui/GlassCard';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import {
  knowledgeGrowthData, topicsData, faqData,
  aiDiscoveries, knowledgeTimeline
} from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 border border-white/10">
        <p className="text-xs text-white/50">{label}</p>
        <p className="text-sm text-white font-medium">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Insights"
        subtitle="AI-generated analysis of your knowledge base"
        icon={BarChart3}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Knowledge Growth */}
        <GlassCard hover={false} delay={0.1}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Knowledge Growth
            </h3>
            <Badge variant="success">+44% this month</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={knowledgeGrowthData}>
              <defs>
                <linearGradient id="knowledgeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="items"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#knowledgeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Most Discussed Topics */}
        <GlassCard hover={false} delay={0.2}>
          <h3 className="text-white font-semibold flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            Most Discussed Topics
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topicsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                dataKey="topic"
                type="category"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={130}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
                {topicsData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* FAQ + Discoveries Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* FAQ */}
        <GlassCard hover={false} delay={0.3}>
          <h3 className="text-white font-semibold flex items-center gap-2 mb-5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Frequently Asked
          </h3>
          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-xs text-white/60 flex-1 mr-3">{faq.question}</span>
                <span className="text-xs text-white/30 flex-shrink-0 font-mono">{faq.frequency}×</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* AI Discoveries */}
        <div className="lg:col-span-2">
          <GlassCard hover={false} delay={0.4}>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Recent AI Discoveries
            </h3>
            <div className="space-y-4">
              {aiDiscoveries.map((discovery, i) => (
                <motion.div
                  key={discovery.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/3 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/8 transition-colors">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-white">{discovery.title}</h4>
                      <Badge variant={discovery.confidence > 90 ? 'success' : 'warning'} size="sm">
                        {`${discovery.confidence}%`}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/40 mt-1 leading-relaxed">{discovery.description}</p>
                    <span className="text-xs text-white/20 mt-2 block">{discovery.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Knowledge Timeline */}
      <GlassCard hover={false} delay={0.5}>
        <h3 className="text-white font-semibold flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-cyan-400" />
          Knowledge Timeline
        </h3>
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent" />
          <div className="space-y-6">
            {knowledgeTimeline.map((event, i) => (
              <motion.div
                key={event.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-4 pl-2"
              >
                <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 z-10 ring-4 ring-[#0B1220]" />
                <div className="flex items-center justify-between flex-1 p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors">
                  <span className="text-sm text-white/70">{event.event}</span>
                  <span className="text-xs text-white/25 flex-shrink-0 ml-4">{event.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
