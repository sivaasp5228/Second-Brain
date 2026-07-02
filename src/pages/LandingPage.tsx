import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Play, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';

// Neural Network Particle Background
function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();
    window.addEventListener('resize', () => { resize(); createParticles(); });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Memory',
    description: 'Never forget an idea. GAPPY connects your notes, files, and thoughts into one intelligent network.',
  },
  {
    icon: Sparkles,
    title: 'Smart Insights',
    description: 'Automatically discover patterns, generate tasks, and surface connections you never knew existed.',
  },
  {
    icon: Zap,
    title: 'Instant Decisions',
    description: 'Ask GAPPY to compare options using your stored knowledge. Get data-driven recommendations in seconds.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your knowledge stays yours. End-to-end encryption, SOC 2 compliant, and zero-knowledge architecture.',
  },
  {
    icon: Globe,
    title: 'Universal Capture',
    description: 'PDFs, docs, voice notes, images, links — GAPPY processes everything into structured, searchable knowledge.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0B1220] relative overflow-hidden">
      <NeuralBackground />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-xl">GAPPY <span className="text-white/40 font-normal text-base">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/50 hover:text-white transition-colors text-sm">Features</a>
          <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Pricing</a>
          <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Docs</a>
          <GradientButton size="sm" onClick={() => navigate('/dashboard')}>
            Get Started
          </GradientButton>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 sm:pt-24 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-full px-5 py-2 mb-8 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm text-white/70">Powered by Advanced AI · Now in Beta</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-5xl leading-tight"
        >
          Your Knowledge Shouldn't
          <br />
          Just Be Stored.{' '}
          <span className="gradient-text">It Should Think.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed"
        >
          Transform notes, files, links and ideas into actionable intelligence using AI.
          Your Second Brain that remembers, connects, and thinks for you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <GradientButton size="lg" icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/dashboard')}>
            Start Building
          </GradientButton>
          <GradientButton size="lg" variant="secondary" icon={<Play className="w-5 h-5" />}>
            Watch Demo
          </GradientButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16"
        >
          {[
            { label: 'Knowledge Items', value: '2M+' },
            { label: 'Active Users', value: '50K+' },
            { label: 'AI Insights Generated', value: '10M+' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 sm:px-12 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything Your Brain Needs,{' '}
            <span className="gradient-text">Supercharged</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            GAPPY AI doesn't just store your knowledge — it understands, connects, and activates it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`
                glass rounded-2xl p-8 transition-all duration-500 cursor-pointer
                ${hoveredFeature === i ? 'bg-white/8 border-white/15 glow-gradient scale-[1.02]' : ''}
                ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-5
                ${hoveredFeature === i ? 'gradient-bg' : 'bg-white/5'}
                transition-all duration-500
              `}>
                <feature.icon className={`w-6 h-6 ${hoveredFeature === i ? 'text-white' : 'text-blue-400'}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 sm:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white relative">
            Ready to Build Your <span className="gradient-text">Second Brain</span>?
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto relative">
            Join thousands of knowledge workers who think smarter with GAPPY AI.
          </p>
          <div className="mt-8 relative">
            <GradientButton size="lg" icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/dashboard')}>
              Get Started for Free
            </GradientButton>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 sm:px-12 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-white/40 text-sm">© 2024 GAPPY AI. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
