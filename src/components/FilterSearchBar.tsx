import React from 'react';
import { Search, LayoutGrid, List, X, Video, FileText, Music, Image as ImageIcon, Layers } from 'lucide-react';
import { ResourceType } from '../types';

interface FilterSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: ResourceType | 'all';
  onTypeChange: (type: ResourceType | 'all') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalCount: number;
  countsByType: Record<ResourceType | 'all', number>;
}

export const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  viewMode,
  onViewModeChange,
  totalCount,
  countsByType,
}) => {
  const filterTabs: { id: ResourceType | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Media', icon: <Layers className="w-4 h-4" /> },
    { id: 'video', label: 'Explainer Video', icon: <Video className="w-4 h-4 text-indigo-500" /> },
    { id: 'pdf', label: 'PDF Slide Deck', icon: <FileText className="w-4 h-4 text-rose-500" /> },
    { id: 'audio', label: 'Audio Track', icon: <Music className="w-4 h-4 text-emerald-500" /> },
    { id: 'infographic', label: 'Infographic', icon: <ImageIcon className="w-4 h-4 text-sky-500" /> },
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-16 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const count = countsByType[tab.id] || 0;
            const isSelected = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTypeChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input & View Mode Toggles */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search assets, tags, topics..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
