import React, { useState, useEffect, useRef } from 'react';
import { 
  Rotate3d, 
  Sparkles, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Layers, 
  BookOpen,
  ArrowRight,
  Move3d,
  RefreshCw
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  institution: string;
  course: string;
  badge: string;
  achievement: string;
  image: string;
}

const STUDENTS: StudentData[] = [
  {
    id: 'male',
    name: 'Mauro dos Santos',
    institution: 'Universidade Agostinho Neto (UAN)',
    course: 'Engenharia de Petróleos',
    badge: '18 Valores em Análise Matemática II',
    achievement: 'Aprovado após 8 aulas no KAMBAEXPLICA',
    image: '/src/assets/images/angolan_black_student_male_1791083498913.jpg'
  },
  {
    id: 'female',
    name: 'Nádia Panzo',
    institution: 'ISPTEC (Tecnologias e Ciências)',
    course: 'Engenharia Química',
    badge: '4º Lugar Geral nos Exames de Acesso',
    achievement: 'Preparação intensiva de Física & Química',
    image: '/src/assets/images/angolan_black_student_female_1791083511512.jpg'
  }
];

export const Student3DShowcase: React.FC = () => {
  const [activeStudentIdx, setActiveStudentIdx] = useState(0);
  const [scrollRotation, setScrollRotation] = useState({ rotateY: -15, rotateX: 6, translateZ: 20 });
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(false);
  const [manualAngle, setManualAngle] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentStudent = STUDENTS[activeStudentIdx];

  // Scroll listener for 3D rotation as page scrolls
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000);
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          
          // Continuous 3D rotation as page scrolls: -20deg up to +65deg
          const newRotateY = -20 + progress * 85;
          const newRotateX = 10 - progress * 20;
          const newTranslateZ = Math.sin(progress * Math.PI) * 55;

          setScrollRotation({
            rotateY: newRotateY,
            rotateX: newRotateX,
            translateZ: newTranslateZ
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optional auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setManualAngle(prev => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Mouse move 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Combine scroll, mouse offset, and manual rotation
  const finalRotateY = scrollRotation.rotateY + (isHovered ? mouseOffset.x : 0) + manualAngle;
  const finalRotateX = scrollRotation.rotateX + (isHovered ? mouseOffset.y : 0);
  const finalTranslateZ = scrollRotation.translateZ;

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      
      {/* 3D Perspective Stage Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-[440px] sm:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
      >
        {/* Glow ambient background spotlights */}
        <div className="absolute inset-0 bg-radial-gradient from-[#E02636]/20 via-[#FFC72C]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-6 w-64 h-16 bg-[#FFC72C]/20 rounded-full blur-2xl pointer-events-none" />

        {/* 3D Floor Shadow Circle */}
        <div 
          className="absolute bottom-6 w-52 h-14 rounded-full bg-black/80 blur-md pointer-events-none"
          style={{
            transform: `rotateX(75deg) rotateY(${finalRotateY * 0.5}deg) scale(${1 + finalTranslateZ * 0.005})`,
            transition: 'transform 0.15s ease-out'
          }}
        />

        {/* The 3D Rotating Assembly */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg) translateZ(${finalTranslateZ}px)`,
            transition: isHovered ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          
          {/* Circular Orbit Ring in 3D */}
          <div 
            className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#FFC72C]/30 pointer-events-none"
            style={{
              transform: 'rotateX(80deg) translateZ(-40px)',
              animation: 'spin 25s linear infinite'
            }}
          />

          {/* Student Isolated Cutout Graphic (Blended without background) */}
          <div 
            className="relative z-10 w-full h-full flex items-center justify-center"
            style={{
              transform: 'translateZ(30px)'
            }}
          >
            <div className="relative w-64 sm:w-72 h-[380px] sm:h-[430px] overflow-hidden">
              <img
                src={currentStudent.image}
                alt={currentStudent.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top scale-105"
                style={{
                  // High precision cutout blend against dark theme:
                  // Drops the solid black studio background seamlessly into the page canvas
                  mixBlendMode: 'lighten',
                  filter: 'contrast(1.1) brightness(1.05) drop-shadow(0 15px 30px rgba(0,0,0,0.8))',
                  maskImage: 'radial-gradient(ellipse at 50% 45%, black 65%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 65%, transparent 95%)'
                }}
              />
            </div>
          </div>

          {/* 3D Floating Badge 1: Academic Achievement (Floats in front at translateZ 90px) */}
          <div
            className="absolute top-10 -left-2 sm:-left-6 z-20 p-3 rounded-xl bg-[#161B22]/95 border border-[#FFC72C]/40 backdrop-blur-md shadow-2xl max-w-[210px]"
            style={{
              transform: 'translateZ(90px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-[#FFC72C] font-bold uppercase tracking-wider mb-0.5">
              <Award className="w-3.5 h-3.5 text-[#FFC72C]" />
              <span>Destaque Académico</span>
            </div>
            <p className="text-xs font-bold text-white leading-tight">
              {currentStudent.badge}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              {currentStudent.institution}
            </p>
          </div>

          {/* 3D Floating Badge 2: Real Result (Floats in front-right at translateZ 75px) */}
          <div
            className="absolute bottom-14 -right-2 sm:-right-6 z-20 p-3 rounded-xl bg-[#161B22]/95 border border-emerald-500/40 backdrop-blur-md shadow-2xl max-w-[200px]"
            style={{
              transform: 'translateZ(75px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mb-0.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Aprovado com Sucesso</span>
            </div>
            <p className="text-xs font-semibold text-white leading-tight">
              {currentStudent.course}
            </p>
            <p className="text-[10px] text-slate-300 mt-1">
              {currentStudent.achievement}
            </p>
          </div>

          {/* 3D Floating Badge 3: Cultural Pride Tag (Floats at translateZ 50px) */}
          <div
            className="absolute top-1/2 -right-4 sm:-right-8 z-20 px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 text-[10px] text-slate-300 flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
            style={{
              transform: 'translateZ(50px)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E02636] animate-ping" />
            <span>Futuro de Angola 🇦🇴</span>
          </div>

        </div>
      </div>

      {/* 3D Interactive Controls Deck */}
      <div className="mt-2 p-3 rounded-2xl bg-[#161B22]/90 border border-white/10 backdrop-blur-md space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Move3d className="w-4 h-4 text-[#FFC72C] animate-pulse" />
            <span className="text-slate-300 font-medium">
              Efeito 3D Interativo: <strong className="text-white">Rode a página</strong> ou arraste
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400 font-mono tabular-nums">
              {Math.round(finalRotateY)}°
            </span>
          </div>
        </div>

        {/* Student Switcher & 3D Auto-Spin Toggle */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            {STUDENTS.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStudentIdx(idx)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  activeStudentIdx === idx
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
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                autoRotate 
                  ? 'bg-[#E02636] text-white font-semibold' 
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
              title="Ativar/Desativar rotação automática 360°"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoRotate ? 'A rodar' : 'Girar 360°'}</span>
            </button>

            <button
              onClick={() => {
                setManualAngle(prev => (prev + 45) % 360);
              }}
              className="px-2.5 py-1 text-xs bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors font-mono"
              title="Girar +45 graus"
            >
              +45°
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
