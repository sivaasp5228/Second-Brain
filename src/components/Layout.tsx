import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Don't show layout on landing page
  if (location.pathname === '/') return <Outlet />;

  return (
    <div className="min-h-screen bg-[#0B1220]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="min-h-screen transition-[margin] hidden lg:block"
      >
        {/* Mobile Top Bar */}
        <div className="sticky top-0 z-20 glass border-b border-white/5 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white/70 hover:text-white cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-white">GAPPY <span className="text-white/40 font-normal">AI</span></span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.main>

      {/* Mobile Main Content */}
      <div className="lg:hidden min-h-screen">
        <div className="sticky top-0 z-20 glass border-b border-white/5 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white/70 hover:text-white cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-white">GAPPY <span className="text-white/40 font-normal">AI</span></span>
        </div>
        <div className="p-4 sm:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
