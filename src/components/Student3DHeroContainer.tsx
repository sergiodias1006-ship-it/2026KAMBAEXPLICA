import React, { useState, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  Rotate3d, 
  Sparkles, 
  GraduationCap, 
  Move3d, 
  RefreshCw,
  Zap,
  BookOpen
} from 'lucide-react';

interface StudentProfile {
  id: string;
  name: string;
  institution: string;
  course: string;
  highlight: string;
  grade: string;
  image: string;
  avatar: string;
}

const ANGOLAN_STUDENTS: StudentProfile[] = [
  {
    id: 'male',
    name: 'Mauro dos Santos',
    institution: 'Universidade Agostinho Neto (UAN)',
    course: 'Faculdade de Engenharia',
    highlight: 'Cálculo Diferencial e Integral',
    grade: '18 Valores',
    image: '/src/assets/images/angolan_black_student_male_1791083498913.jpg',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'female',
    name: 'Nádia Panzo',
    institution: 'ISPTEC (Tecnologias e Ciências)',
    course: 'Engenharia Química',
    highlight: 'Física Geral e Orgânica',
    grade: '4º Lugar Geral',
    image: '/src/assets/images/angolan_black_student_female_1791083511512.jpg',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  }
];

export const Student3DHeroContainer: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [manualStep, setManualStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeStudent = ANGOLAN_STUDENTS[activeIdx];

  // 1. Framer Motion Scroll Listener
  const { scrollY } = useScroll();

  // 2. Scroll-driven Transform Calculations
  // Rotates around Y axis as user scrolls through the page
  const targetRotateY = useTransform(scrollY, [0, 600, 1200], [-18, 15, 45]);
  const targetRotateX = useTransform(scrollY, [0, 600, 1200], [10, -5, -15]);
  const targetTranslateZ = useTransform(scrollY, [0, 400, 1000], [0, 45, -10]);
  const targetScale = useTransform(scrollY, [0, 800], [1, 1.04]);

  // Floating parallax for 3D badges
  const badgeParallax1 = useTransform(scrollY, [0, 800], [0, -50]);
  const badgeParallax2 = useTransform(scrollY, [0, 800], [0, 40]);

  // 3. Mouse Tilt Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 24);
    mouseY.set(-y * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 4. Smooth Springs for buttery 60fps physics
  const springConfig = { stiffness: 90, damping: 22, mass: 0.8 };
  const smoothRotateY = useSpring(targetRotateY, springConfig);
  const smoothRotateX = useSpring(targetRotateX, springConfig);
  const smoothTranslateZ = useSpring(targetTranslateZ, springConfig);
  const smoothScale = useSpring(targetScale, springConfig);
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Auto-spin interval
  React.useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setManualStep(prev => (prev + 1.2) % 360);
    }, 30);
    return () => clearInterval(id);
  }, [autoRotate]);

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      
      {/* 3D Perspective Stage */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[450px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: 1200 }}
      >
        {/* Ambient glow mesh in background */}
        <div className="absolute inset-0 bg-radial-gradient from-[#E02636]/25 via-[#FFC72C]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-14 bg-[#FFC72C]/15 rounded-full blur-2xl pointer-events-none" />

        {/* 3D Floor Shadow */}
        <motion.div 
          className="absolute bottom-8 w-56 h-12 rounded-full bg-black/85 blur-lg pointer-events-none"
          style={{
            rotateX: 75,
            scale: smoothScale
          }}
        />

        {/* Main 3D Container using Framer Motion */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: useTransform([smoothRotateY, smoothMouseX], ([y, mx]) => (Number(y) || 0) + (Number(mx) || 0) + manualStep),
            rotateX: useTransform([smoothRotateX, smoothMouseY], ([x, my]) => (Number(x) || 0) + (Number(my) || 0)),
            z: smoothTranslateZ,
            scale: smoothScale
          }}
        >
          
          {/* Layer 1: 3D Orbit Ring (Z: -30px) */}
          <motion.div 
            className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#FFC72C]/30 pointer-events-none"
            style={{
              z: -30,
              rotateX: 82,
              animation: 'spin 22s linear infinite'
            }}
          />

          {/* Layer 2: Student Cutout Image (Z: 20px) */}
          <motion.div 
            className="relative z-10 w-full h-full flex items-center justify-center"
            style={{ z: 20 }}
          >
            <div className="relative w-64 sm:w-72 h-[380px] sm:h-[430px] overflow-hidden flex items-end justify-center">
              <img
                src={activeStudent.image}
                alt={activeStudent.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top scale-105"
                style={{
                  // High precision cutout rendering on dark background:
                  mixBlendMode: 'lighten',
                  filter: 'contrast(1.12) brightness(1.04) drop-shadow(0 20px 35px rgba(0,0,0,0.85))',
                  maskImage: 'radial-gradient(ellipse at 50% 45%, black 65%, transparent 96%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 65%, transparent 96%)'
                }}
              />
            </div>
          </motion.div>

          {/* Layer 3: 3D Parallax Badge 1 - Top Left (Z: 85px) */}
          <motion.div
            className="absolute top-10 -left-2 sm:-left-6 z-20 p-3 rounded-xl bg-[#161B22]/95 border border-[#FFC72C]/40 backdrop-blur-md shadow-2xl max-w-[210px]"
            style={{
              z: 85,
              y: badgeParallax1
            }}
          >
            <div className="flex items-center gap-1 text-[10px] text-[#FFC72C] font-bold uppercase tracking-wider mb-0.5">
              <Award className="w-3.5 h-3.5 text-[#FFC72C]" />
              <span>Destaque Académico</span>
            </div>
            <p className="text-xs font-bold text-white leading-tight">
              {activeStudent.grade} em {activeStudent.highlight}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              {activeStudent.institution}
            </p>
          </motion.div>

          {/* Layer 4: 3D Parallax Badge 2 - Bottom Right (Z: 75px) */}
          <motion.div
            className="absolute bottom-16 -right-2 sm:-right-6 z-20 p-3 rounded-xl bg-[#161B22]/95 border border-emerald-500/40 backdrop-blur-md shadow-2xl max-w-[200px]"
            style={{
              z: 75,
              y: badgeParallax2
            }}
          >
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aprovado com Sucesso</span>
            </div>
            <p className="text-xs font-semibold text-white leading-tight">
              {activeStudent.course}
            </p>
            <p className="text-[10px] text-slate-300 mt-1">
              Aulas agendadas no KAMBAEXPLICA
            </p>
          </motion.div>

          {/* Layer 5: Cultural Pride Badge (Z: 50px) */}
          <motion.div
            className="absolute top-1/2 -right-4 sm:-right-8 z-20 px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 text-[10px] text-slate-200 flex items-center gap-1.5 shadow-xl backdrop-blur-sm"
            style={{ z: 50 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E02636] animate-ping" />
            <span>Futuro de Angola 🇦🇴</span>
          </motion.div>

        </motion.div>
      </div>

      {/* 3D Interactive Telemetry & Controls Deck */}
      <div className="mt-2 p-3.5 rounded-2xl bg-[#161B22]/90 border border-white/10 backdrop-blur-md space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Move3d className="w-4 h-4 text-[#FFC72C]" />
            <span className="text-slate-300 font-medium">
              3D Parallax: <strong className="text-white">Faça scroll</strong> na página para girar
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Framer Motion Ativo</span>
          </div>
        </div>

        {/* Student Switcher & Manual Spin Control */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            {ANGOLAN_STUDENTS.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  activeIdx === idx
                    ? 'bg-[#FFC72C] text-black font-bold shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {st.name.split(' ')[0]} ({st.id === 'male' ? 'UAN' : 'ISPTEC'})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors ${
                autoRotate 
                  ? 'bg-[#E02636] text-white font-semibold' 
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
              title="Ativar/Desativar rotação contínua"
            >
              <RefreshCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoRotate ? 'A girar' : 'Girar 360°'}</span>
            </button>

            <button
              onClick={() => setManualStep(prev => (prev + 45) % 360)}
              className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors font-mono"
              title="Girar +45 graus manualmente"
            >
              +45°
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
