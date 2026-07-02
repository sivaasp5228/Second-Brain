import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Globe, Moon, Sun, Monitor } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PageHeader from '../components/ui/PageHeader';
import GradientButton from '../components/ui/GradientButton';

const settingsSections = [
  {
    title: 'Profile',
    icon: User,
    settings: [
      { label: 'Full Name', type: 'text', value: 'Alex Johnson' },
      { label: 'Email', type: 'text', value: 'alex@gappy.ai' },
      { label: 'Role', type: 'text', value: 'Knowledge Worker' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'AI Insights', type: 'toggle', value: true },
      { label: 'New Connections', type: 'toggle', value: true },
      { label: 'Task Reminders', type: 'toggle', value: false },
      { label: 'Weekly Summary', type: 'toggle', value: true },
    ],
  },
  {
    title: 'AI Preferences',
    icon: Shield,
    settings: [
      { label: 'Auto-generate Tasks', type: 'toggle', value: true },
      { label: 'Knowledge Suggestions', type: 'toggle', value: true },
      { label: 'Smart Categorization', type: 'toggle', value: true },
      { label: 'Decision Confidence Threshold', type: 'range', value: 75 },
    ],
  },
];

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'AI Insights': true,
    'New Connections': true,
    'Task Reminders': false,
    'Weekly Summary': true,
    'Auto-generate Tasks': true,
    'Knowledge Suggestions': true,
    'Smart Categorization': true,
  });

  const handleToggle = (label: string) => {
    setToggles((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Customize your Second Brain experience"
        icon={Settings}
      />

      {/* Theme Selector */}
      <GlassCard hover={false} delay={0.1} className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Appearance</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'dark' as const, icon: Moon, label: 'Dark' },
            { key: 'light' as const, icon: Sun, label: 'Light' },
            { key: 'system' as const, icon: Monitor, label: 'System' },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setTheme(opt.key)}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-xl transition-all cursor-pointer
                ${theme === opt.key
                  ? 'gradient-bg text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 text-white/50 hover:bg-white/8 hover:text-white/70'
                }
              `}
            >
              <opt.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <GlassCard key={section.title} hover={false} delay={0.15 + sectionIndex * 0.1} className="mb-6">
          <div className="flex items-center gap-2 mb-5">
            <section.icon className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">{section.title}</h3>
          </div>
          <div className="space-y-4">
            {section.settings.map((setting) => (
              <div key={setting.label} className="flex items-center justify-between">
                <span className="text-sm text-white/60">{setting.label}</span>
                {setting.type === 'text' && (
                  <input
                    type="text"
                    defaultValue={setting.value as string}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-white/20 transition-colors w-48"
                  />
                )}
                {setting.type === 'toggle' && (
                  <button
                    onClick={() => handleToggle(setting.label)}
                    className={`
                      w-11 h-6 rounded-full transition-all duration-300 cursor-pointer relative
                      ${toggles[setting.label] ? 'bg-gradient-to-r from-blue-500 to-violet-500' : 'bg-white/10'}
                    `}
                  >
                    <motion.div
                      animate={{ x: toggles[setting.label] ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm"
                    />
                  </button>
                )}
                {setting.type === 'range' && (
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue={setting.value as number}
                      className="w-32 accent-indigo-500"
                    />
                    <span className="text-xs text-white/40 w-8 text-right">{setting.value}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      ))}

      {/* Language */}
      <GlassCard hover={false} delay={0.5} className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Language & Region</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Language</span>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/20 cursor-pointer">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </GlassCard>

      {/* Save */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <GradientButton>Save Changes</GradientButton>
      </motion.div>
    </div>
  );
}
