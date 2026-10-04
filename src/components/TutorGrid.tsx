import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TutorCard } from './TutorCard';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  MapPin, 
  SlidersHorizontal,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { ANGOLAN_PROVINCES } from '../data/mockData';

interface TutorGridProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export const TutorGrid: React.FC<TutorGridProps> = ({ 
  limit, 
  title = "Explicadores Qualificados em Angola", 
  subtitle = "Encontre professores verificados com comprovada experiência pedagógica", 
  showFilters = true 
}) => {
  const { tutors, filters, setFilters, resetFilters, setActiveView } = useApp();

  const filteredTutors = useMemo(() => {
    return tutors.filter(tutor => {
      // Text search in name, bio, subjects, or institution
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          tutor.name.toLowerCase().includes(query) ||
          tutor.subjects.some(s => s.toLowerCase().includes(query)) ||
          tutor.institution.toLowerCase().includes(query) ||
          tutor.bio.toLowerCase().includes(query) ||
          tutor.municipality.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Subject filter
      if (filters.subject) {
        const querySub = filters.subject.toLowerCase();
        const matchesSubject = tutor.subjects.some(s => s.toLowerCase().includes(querySub));
        if (!matchesSubject) return false;
      }

      // Province filter
      if (filters.province) {
        if (tutor.province !== filters.province) return false;
      }

      // Modality filter
      if (filters.modality !== 'todos') {
        if (tutor.modalities !== 'ambos' && tutor.modalities !== filters.modality) {
          return false;
        }
      }

      // Max price filter
      if (tutor.pricePerHour > filters.maxPrice) {
        return false;
      }

      // Min rating
      if (filters.minRating > 0 && tutor.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'success_rate') {
        return b.successRate - a.successRate;
      }
      if (filters.sortBy === 'price_asc') {
        return a.pricePerHour - b.pricePerHour;
      }
      if (filters.sortBy === 'price_desc') {
        return b.pricePerHour - a.pricePerHour;
      }
      // default: recommended (hiredCount & rating)
      return (b.rating * b.hiredCount) - (a.rating * a.hiredCount);
    });
  }, [tutors, filters]);

  const displayList = limit ? filteredTutors.slice(0, limit) : filteredTutors;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FFC72C] mb-1.5 uppercase tracking-wider">
            <span>Rede Nacional de Explicadores</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        </div>

        {limit && (
          <button
            onClick={() => setActiveView('tutors')}
            className="text-xs font-medium text-[#FFC72C] hover:text-amber-300 transition-colors"
          >
            Ver todos ({tutors.length})
          </button>
        )}
      </div>

      {/* Advanced Interactive Filter Bar */}
      {showFilters && (
        <div className="mb-8 p-4 rounded-xl bg-[#161B22] border border-white/10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Pesquisar por explicador ou matéria..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-3 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC72C]"
              />
            </div>

            {/* Province Select */}
            <div>
              <select
                value={filters.province}
                onChange={(e) => setFilters(prev => ({ ...prev, province: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="">Todas as Províncias</option>
                {ANGOLAN_PROVINCES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Modality Filter */}
            <div>
              <select
                value={filters.modality}
                onChange={(e) => setFilters(prev => ({ ...prev, modality: e.target.value as any }))}
                className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="todos">Qualquer Modalidade</option>
                <option value="online">Apenas Online</option>
                <option value="presencial">Apenas Presencial</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="recommended">Mais Recomendados</option>
                <option value="rating">Mais Bem Avaliados (★)</option>
                <option value="success_rate">Melhor Taxa de Aprovação (%)</option>
                <option value="price_asc">Preço: Menor para Maior</option>
                <option value="price_desc">Preço: Maior para Menor</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider & Filter Reset */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4 flex-1 min-w-[260px] max-w-md">
              <span className="text-slate-400 whitespace-nowrap">Preço Máximo:</span>
              <input
                type="range"
                min="2000"
                max="15000"
                step="500"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-[#FFC72C] cursor-pointer"
              />
              <span className="font-semibold text-white whitespace-nowrap tabular-nums">
                Até {filters.maxPrice.toLocaleString('pt-AO')} Kz/h
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 tabular-nums">
                {filteredTutors.length} {filteredTutors.length === 1 ? 'explicador encontrado' : 'explicadores encontrados'}
              </span>

              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Filtros</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Tutors */}
      {displayList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-[#161B22] border border-white/10">
          <GraduationCap className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">Nenhum explicador encontrado</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
            Tente ajustar os filtros de pesquisa, alargar a província ou aumentar o teto de preço.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-black bg-[#FFC72C] hover:bg-[#e6b325] rounded-lg transition-colors"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </section>
  );
};
