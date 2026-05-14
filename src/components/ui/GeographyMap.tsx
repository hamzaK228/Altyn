import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// Precision Organic Paths
const regions = [
  { id: 'batken', name: 'Баткен', path: 'M20,280 C40,270 80,260 120,255 C160,250 180,270 200,300 C220,330 250,340 280,360 L240,410 C200,420 100,430 40,410 C20,380 15,320 20,280 Z' },
  { id: 'jalal-abad', name: 'Джалал-Абад', path: 'M120,255 C160,230 220,210 280,190 C340,170 380,175 420,200 C450,220 460,260 450,285 C420,305 380,315 320,325 C260,335 220,320 200,300 C180,270 160,250 120,255 Z' },
  { id: 'osh', name: 'Ош', path: 'M280,360 C320,350 380,340 450,335 C520,330 550,360 560,400 C550,450 500,480 400,490 C300,480 260,450 240,410 L280,360 Z' },
  { id: 'talas', name: 'Талас', path: 'M140,180 C180,165 240,155 300,150 C360,145 380,160 380,180 C360,195 320,205 280,190 C220,210 160,230 140,180 Z' },
  { id: 'chuy', name: 'Чуй', path: 'M300,150 C360,110 420,80 500,70 C580,60 620,100 650,150 C620,180 580,210 520,240 C460,270 420,210 380,180 C380,160 360,145 300,150 Z' },
  { id: 'naryn', name: 'Нарын', path: 'M450,335 C520,330 580,310 650,285 C720,260 780,280 820,350 C800,400 700,430 580,440 C460,450 420,400 450,335 Z' },
  { id: 'issyk-kul', name: 'Иссык-Куль', path: 'M650,150 C750,130 850,140 920,200 C930,280 880,340 820,350 C780,280 720,260 650,285 C620,180 620,150 650,150 Z' },
];

const deposits = [
  { id: 'kumtor', x: '82%', y: '45%', name: 'Кумтор', res: '560т' },
  { id: 'jerooy', x: '32%', y: '32%', name: 'Джеруй', res: '105т' },
  { id: 'taldybulak', x: '55%', y: '28%', name: 'Талдыбулак', res: '78т' },
  { id: 'makmal', x: '52%', y: '58%', name: 'Макмал', res: '42т' },
  { id: 'ishtamberdy', x: '22%', y: '68%', name: 'Иштамберды', res: '35т' },
  { id: 'solton-sary', x: '68%', y: '48%', name: 'Солтон-Сары', res: '22т' },
  { id: 'chaarat', x: '25%', y: '52%', name: 'Чаарат', res: '125т' },
  { id: 'unkurtash', x: '28%', y: '62%', name: 'Ункурташ', res: '38т' },
  { id: 'jamgyr', x: '18%', y: '45%', name: 'Джамгыр', res: '12т' },
  { id: 'tere-kan', x: '30%', y: '65%', name: 'Тере-Кан', res: '18т' },
];

export const GeographyMap = () => {
  const [hoveredItem, setHoveredItem] = useState<{ type: 'region' | 'deposit', id: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#020204] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Header - Minimalist */}
      <div className="w-full flex justify-between items-center mb-8 px-4">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] opacity-40">Geography of Reserves</h3>
        <div className="flex gap-4">
           <div className="w-2 h-2 rounded-full bg-altyn" />
           <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Live Monitoring</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredItem(null)}
        className="relative w-full aspect-[2/1] cursor-crosshair"
      >
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* The Map */}
        <svg viewBox="0 0 950 500" className="absolute inset-0 w-full h-full">
          {regions.map((region) => (
            <g key={region.id}>
              {/* Live Border Glow Animation */}
              <motion.path
                d={region.path}
                fill="transparent"
                stroke={hoveredItem?.id === region.id ? '#f0c850' : 'rgba(255,255,255,0.05)'}
                strokeWidth="1"
                strokeDasharray="5,10"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d={region.path}
                fill={hoveredItem?.id === region.id ? 'rgba(240,200,80,0.08)' : 'transparent'}
                stroke={hoveredItem?.id === region.id ? '#f0c850' : 'rgba(255,255,255,0.1)'}
                strokeWidth={hoveredItem?.id === region.id ? "2" : "0.5"}
                onMouseEnter={() => setHoveredItem({ type: 'region', id: region.id })}
                className="transition-all duration-300"
              />
            </g>
          ))}

          {/* Lake Issyk-Kul */}
          <path d="M680,210 C700,195 750,195 785,215 C810,230 760,265 720,255 C690,245 660,225 680,210 Z" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
          
          {/* Deposit Markers - Much Bigger and Bolder */}
          {deposits.map(dep => (
             <motion.circle 
               key={dep.id} 
               cx={dep.x} cy={dep.y} r={hoveredItem?.id === dep.id ? "16" : "8"} 
               fill="#f0c850" 
               onMouseEnter={() => setHoveredItem({ type: 'deposit', id: dep.id })}
               className="cursor-pointer transition-all duration-300"
               style={{ filter: 'drop-shadow(0 0 15px rgba(240,200,80,0.6))' }}
               animate={hoveredItem?.id === dep.id ? { scale: 1.2 } : { scale: [1, 1.15, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
          ))}
        </svg>

        {/* Floating Minimal Tooltip */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              style={{ x: mouseX, y: mouseY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute pointer-events-none z-50 translate-x-8 -translate-y-8"
            >
              <div className="bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl px-8 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[240px]">
                <p className="text-[11px] font-black text-altyn uppercase tracking-[0.3em] mb-2">
                  {hoveredItem.type === 'region' ? 'Monitoring Sector' : 'National Asset'}
                </p>
                <h4 className="text-2xl font-black text-white tracking-tighter mb-6">
                  {hoveredItem.type === 'region' 
                    ? regions.find(r => r.id === hoveredItem.id)?.name 
                    : deposits.find(d => d.id === hoveredItem.id)?.name}
                </h4>
                
                <div className="space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                        {hoveredItem.type === 'region' ? 'Total Yield' : 'Verified Volume'}
                      </span>
                      <span className="text-sm text-white font-black">
                        {hoveredItem.type === 'region' 
                          ? 'Optimal' 
                          : deposits.find(d => d.id === hoveredItem.id)?.res}
                      </span>
                   </div>
                   <div className="w-full h-[1px] bg-white/10" />
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Audit Status</span>
                      <span className="text-[11px] text-green-500 font-black uppercase tracking-widest px-2 py-0.5 bg-green-500/10 rounded">Passed</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend - Minimalist */}
      <div className="w-full mt-10 flex justify-center gap-16 opacity-40">
        <div className="flex items-center gap-3">
           <div className="w-2.5 h-2.5 rounded-full bg-altyn shadow-[0_0_10px_rgba(240,200,80,0.5)]" />
           <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Gold Reserves</span>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-2.5 h-2.5 border border-white/20 rounded-full" />
           <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Territorial Border</span>
        </div>
      </div>
    </div>
  );
};
