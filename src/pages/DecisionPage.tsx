import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Send, CheckCircle2, XCircle, FileText, ArrowRight, BarChart } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PageHeader from '../components/ui/PageHeader';
import GradientButton from '../components/ui/GradientButton';
import Badge from '../components/ui/Badge';
import { decisionExample } from '../data/mockData';

export default function DecisionPage() {
  const [question, setQuestion] = useState('');
  const [showResult, setShowResult] = useState(true);
  const data = decisionExample;

  const handleAsk = () => {
    if (!question.trim()) return;
    setShowResult(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Decision Assistant"
        subtitle="Get AI-powered recommendations using your stored knowledge"
        icon={Zap}
      />

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <GlassCard hover={false} glow>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-white">What decision do you need help with?</span>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={data.question}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
            <GradientButton icon={<Send className="w-4 h-4" />} onClick={handleAsk}>
              Analyze
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* Results */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Recommendation */}
          <GlassCard hover={false} className="mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="success">AI Recommendation</Badge>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{data.recommendation}</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{data.reasoning}</p>

              {/* Confidence Score */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/50">Confidence Score</span>
                </div>
                <div className="flex-1 max-w-xs">
                  <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.confidence}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                    />
                  </div>
                </div>
                <span className="text-lg font-bold gradient-text">{data.confidence}%</span>
              </div>
            </div>
          </GlassCard>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {data.options.map((option, i) => (
              <GlassCard
                key={option.name}
                hover={false}
                delay={0.3 + i * 0.1}
                className={`relative ${i === 0 ? 'border-blue-500/20' : ''}`}
              >
                {i === 0 && (
                  <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                )}

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{option.name}</h3>
                    {i === 0 && (
                      <span className="text-xs text-blue-400 font-medium">✦ Recommended</span>
                    )}
                  </div>
                  <div className={`
                    text-2xl font-bold
                    ${option.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}
                  `}>
                    {option.score}
                  </div>
                </div>

                {/* Pros */}
                <div className="mb-4">
                  <p className="text-xs text-white/30 font-medium mb-2.5 uppercase tracking-wider">Pros</p>
                  <div className="space-y-2">
                    {option.pros.map((pro, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-white/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons */}
                <div>
                  <p className="text-xs text-white/30 font-medium mb-2.5 uppercase tracking-wider">Cons</p>
                  <div className="space-y-2">
                    {option.cons.map((con, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-white/60">
                        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Supporting Sources */}
          <GlassCard hover={false} delay={0.5}>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-blue-400" />
              Supporting Sources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.sources.map((source) => (
                <div
                  key={source.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{source.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/25">{source.relevance}%</span>
                    <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
