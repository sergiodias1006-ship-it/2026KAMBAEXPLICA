import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Smartphone, 
  RotateCw, 
  Move3d, 
  Wifi, 
  BatteryMedium, 
  Sparkles,
  Maximize2,
  RefreshCcw,
  Sliders
} from 'lucide-react';

interface Smartphone3DModalProps {
  children: React.ReactNode;
}

export const Smartphone3DModal: React.FC<Smartphone3DModalProps> = ({ children }) => {
  const { isSmartphoneMode, setIsSmartphoneMode } = useApp();

  const [autoSpin, setAutoSpin] = useState(false);
  const [manualRotY, setManualRotY] = useState(-10);
  const [manualRotX, setManualRotX] = useState(8);

  // Mouse tilt interaction for the 3D phone
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const smoothDragX = useSpring(dragX, springConfig);
  const smoothDragY = useSpring(dragY, springConfig);

  const finalRotateY = useTransform(smoothDragX, v => v + manualRotY);
  const finalRotateX = useTransform(smoothDragY, v => -v + manualRotX);

  // Auto spin
  React.useEffect(() => {
    if (!autoSpin) return;
    const interval = setInterval(() => {
      setManualRotY(prev => (prev + 1.2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoSpin]);

  if (!isSmartphoneMode) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on phone bezels/background, not inside the screen content
    if ((e.target as HTMLElement).closest('.phone-screen-content')) return;
    const startX = e.clientX;
    const startY = e.clientY;

    const handlePointerMove = (moveEv: PointerEvent) => {
      const deltaX = (moveEv.clientX - startX) * 0.3;
      const deltaY = (moveEv.clientY - startY) * 0.3;
      dragX.set(deltaX);
      dragY.set(deltaY);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      setManualRotY(prev => prev + dragX.get());
      setManualRotX(prev => prev - dragY.get());
      dragX.set(0);
      dragY.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07080a]/90 backdrop-blur-xl flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden select-none">
      
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between px-4 py-2 bg-[#161B22]/90 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E02636] to-[#FFC72C] flex items-center justify-center text-black font-bold shadow-md">
            <Smartphone className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              Modo Smartphone 3D
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFC72C]/10 text-[#FFC72C] border border-[#FFC72C]/30 font-semibold">
                KAMBAEXPLICA Mobile
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Simulador tridimensional com navegação completa, toque e rotação 3D
            </p>
          </div>
        </div>

        {/* 3D Action Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoSpin(!autoSpin)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              autoSpin ? 'bg-[#E02636] text-white' : 'bg-white/5 text-slate-300 hover:text-white'
            }`}
            title="Girar telefone continuamente em 3D"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoSpin ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{autoSpin ? 'A Rodar' : 'Girar 360°'}</span>
          </button>

          <button
            onClick={() => {
              setManualRotY(prev => prev + 35);
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 text-slate-300 hover:text-white transition-colors"
            title="Inclinar +35°"
          >
            +35°
          </button>

          <button
            onClick={() => {
              setManualRotY(0);
              setManualRotX(0);
              dragX.set(0);
              dragY.set(0);
            }}
            className="p-1.5 rounded-lg text-xs bg-white/5 text-slate-400 hover:text-white transition-colors"
            title="Repor ângulo frontal"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsSmartphoneMode(false)}
            className="px-3.5 py-1.5 text-xs font-bold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-xl transition-all shadow-md flex items-center gap-1.5"
            title="Sair do modo smartphone"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Ecrã Completo</span>
          </button>
        </div>
      </div>

      {/* 3D Smartphone Viewport Stage */}
      <div 
        onPointerDown={handlePointerDown}
        className="relative flex-1 w-full flex items-center justify-center cursor-grab active:cursor-grabbing my-2"
        style={{ perspective: 1400 }}
      >
        {/* Ambient Back Glow with Angolan flag colors */}
        <div className="absolute w-[420px] h-[720px] bg-gradient-to-tr from-[#E02636]/20 via-transparent to-[#FFC72C]/20 blur-3xl rounded-full pointer-events-none" />

        {/* 3D Floor Shadow */}
        <motion.div
          className="absolute bottom-2 w-72 h-16 rounded-full bg-black/90 blur-xl pointer-events-none"
          style={{
            rotateX: 75,
            scale: 1.1
          }}
        />

        {/* 3D Smartphone Device Chassis */}
        <motion.div
          className="relative w-[340px] sm:w-[375px] h-[640px] sm:h-[680px] rounded-[48px] p-3 shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: finalRotateY,
            rotateX: finalRotateX,
            background: 'linear-gradient(145deg, #2D333B 0%, #161B22 50%, #0D1117 100%)',
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 18px 36px -18px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.8)',
            border: '3px solid #3E4651'
          }}
        >
          {/* Side Buttons (Hardware 3D features) */}
          <div 
            className="absolute -left-[5px] top-28 w-1 h-12 bg-[#485260] rounded-l-sm"
            style={{ transform: 'translateZ(-2px)' }}
          />
          <div 
            className="absolute -left-[5px] top-44 w-1 h-12 bg-[#485260] rounded-l-sm"
            style={{ transform: 'translateZ(-2px)' }}
          />
          <div 
            className="absolute -right-[5px] top-36 w-1 h-16 bg-[#485260] rounded-r-sm"
            style={{ transform: 'translateZ(-2px)' }}
          />

          {/* Internal Bezel Screen Frame */}
          <div 
            className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0D0F12] border border-black/80 flex flex-col justify-between"
            style={{
              transform: 'translateZ(10px)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top Smartphone Status Bar */}
            <div className="h-10 bg-[#0D0F12] text-white px-5 flex items-center justify-between text-[11px] font-medium z-40 shrink-0 border-b border-white/5">
              <span className="font-semibold tabular-nums">18:42</span>
              
              {/* Dynamic Island / Front Camera Notch */}
              <div className="w-24 h-5 rounded-full bg-black flex items-center justify-center gap-2 border border-white/10 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#161B22] border border-white/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-950" />
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-[9px] font-bold text-[#FFC72C]">UNITEL 5G</span>
                <Wifi className="w-3 h-3 text-slate-300" />
                <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Scrollable Screen Content (Hosts the real application) */}
            <div className="phone-screen-content flex-1 overflow-y-auto overflow-x-hidden text-slate-100 cursor-auto select-text scrollbar-thin">
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="h-5 bg-[#0D0F12] flex items-center justify-center z-40 shrink-0 border-t border-white/5">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>

            {/* Subtle Screen Reflection Glare */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(115deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 100%)',
                zIndex: 45
              }}
            />
          </div>

        </motion.div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center text-[11px] text-slate-400 py-1 flex items-center gap-2">
        <Move3d className="w-3.5 h-3.5 text-[#FFC72C]" />
        <span>Arraste fora da tela para rodar o smartphone em 3D · O app é totalmente funcional dentro do ecrã</span>
      </div>

    </div>
  );
};
