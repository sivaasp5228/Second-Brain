import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { graphNodes, graphEdges, nodeColors } from '../data/mockData';

export default function KnowledgeGraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();

    const getNodePos = (node: typeof graphNodes[0]) => {
      const rect = container.getBoundingClientRect();
      return {
        x: (node.x / 100) * rect.width,
        y: (node.y / 100) * rect.height,
      };
    };

    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      timeRef.current += 0.01;
      const t = timeRef.current;

      // Draw edges
      graphEdges.forEach((edge) => {
        const fromNode = graphNodes.find((n) => n.id === edge.from);
        const toNode = graphNodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        const from = getNodePos(fromNode);
        const to = getNodePos(toNode);

        const isHighlighted =
          hoveredNode === edge.from || hoveredNode === edge.to ||
          selectedNode === edge.from || selectedNode === edge.to;

        // Animated glow on edges
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        const alpha = isHighlighted ? 0.5 : 0.08 + Math.sin(t * 2 + from.x * 0.01) * 0.04;
        gradient.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 1.2})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();

        // Animated pulse traveling along edge
        if (isHighlighted) {
          const pulse = (t * 0.5) % 1;
          const px = from.x + (to.x - from.x) * pulse;
          const py = from.y + (to.y - from.y) * pulse;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
          ctx.fill();
        }
      });

      // Draw nodes
      graphNodes.forEach((node) => {
        const pos = getNodePos(node);
        const color = nodeColors[node.type] || '#6366f1';
        const isHovered = hoveredNode === node.id || selectedNode === node.id;
        const size = node.size * (isHovered ? 1.3 : 1);

        // Glow
        if (isHovered) {
          const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 3);
          glow.addColorStop(0, color + '40');
          glow.addColorStop(1, color + '00');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Pulsing outer ring
        const pulseSize = size + Math.sin(t * 3 + node.x) * 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseSize + 4, 0, Math.PI * 2);
        ctx.strokeStyle = color + (isHovered ? '40' : '15');
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node circle
        const grad = ctx.createRadialGradient(pos.x - size * 0.3, pos.y - size * 0.3, 0, pos.x, pos.y, size);
        grad.addColorStop(0, color + 'dd');
        grad.addColorStop(1, color + '88');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Label
        ctx.font = `${isHovered ? 'bold ' : ''}${isHovered ? 12 : 10}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255,255,255,0.6)';
        ctx.fillText(node.label, pos.x, pos.y + size + 16);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener('resize', handleResize);

    // Mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: string | null = null;
      for (const node of graphNodes) {
        const pos = getNodePos(node);
        const dx = mx - pos.x;
        const dy = my - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.size + 10) {
          found = node.id;
          break;
        }
      }
      setHoveredNode(found);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const node of graphNodes) {
        const pos = getNodePos(node);
        const dx = mx - pos.x;
        const dy = my - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.size + 10) {
          setSelectedNode((prev) => (prev === node.id ? null : node.id));
          return;
        }
      }
      setSelectedNode(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [hoveredNode, selectedNode]);

  const selectedData = graphNodes.find((n) => n.id === selectedNode);
  const connectedCount = selectedNode
    ? graphEdges.filter((e) => e.from === selectedNode || e.to === selectedNode).length
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Knowledge Graph"
        subtitle="Visualize connections between your knowledge"
        icon={GitBranch}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Graph */}
        <div className="lg:col-span-3">
          <GlassCard hover={false} className="p-0 overflow-hidden">
            <div
              ref={containerRef}
              className="relative"
              style={{ height: '600px' }}
            >
              <canvas ref={canvasRef} className="absolute inset-0" />

              {/* Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {[ZoomIn, ZoomOut, Maximize2].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Legend */}
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold text-white mb-4">Node Types</h3>
            <div className="space-y-2.5">
              {Object.entries(nodeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-white/50 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Selected Node Info */}
          {selectedData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard hover={false} glow>
                <h3 className="text-sm font-semibold text-white mb-3">
                  {selectedData.label}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Type</span>
                    <Badge variant="purple">{selectedData.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Connections</span>
                    <span className="text-sm text-white font-medium">{connectedCount}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Stats */}
          <GlassCard hover={false}>
            <h3 className="text-sm font-semibold text-white mb-3">Graph Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Total Nodes</span>
                <span className="text-sm text-white">{graphNodes.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Total Edges</span>
                <span className="text-sm text-white">{graphEdges.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Clusters</span>
                <span className="text-sm text-white">4</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
