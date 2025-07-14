import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { searchGenerator } from "../lib/searchArchitecture.js";
import TechIcon from "./TechIcon.tsx";

interface SearchResult {
  type: string;
  title: string;
  subtitle?: string;
  content: string;
  icon: string;
  technologies?: string[];
  category?: string;
}

interface SearchProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Search({ isOpen: propIsOpen, onClose: propOnClose }: SearchProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Use internal state if no props provided (for InfoLayout)
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const onClose = propOnClose || (() => setInternalIsOpen(false));

  // Listen for custom open search event (for InfoLayout)
  useEffect(() => {
    const handleOpenSearch = () => {
      if (propIsOpen === undefined) {
        setInternalIsOpen(true);
      }
    };

    window.addEventListener('openSearch', handleOpenSearch);
    return () => window.removeEventListener('openSearch', handleOpenSearch);
  }, [propIsOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Search function using the new architecture
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    // Use the new search architecture
    const architectureResults = searchGenerator.search(query);
    
    // Convert to the component's expected format
    const searchResults: SearchResult[] = architectureResults
      .sort((a, b) => a.priority - b.priority) // Sort by priority
      .map(result => {
        const data = result.data as any; // Use any to handle flexible data structure
        
        // Handle different result types
        switch (result.type) {
          case 'programming_language':
            return {
              type: result.type,
              title: data.name,
              subtitle: data.description,
              content: `${data.projectsCount || 0} projects • ${data.yearsOfExperience || 0} years experience`,
              icon: data.icon,
              technologies: data.libraries?.map((lib: any) => lib.name) || [],
              category: data.category
            };
          case 'skill':
            return {
              type: result.type,
              title: data.name,
              subtitle: data.category || 'Skill',
              content: data.description,
              icon: data.icon,
              technologies: [],
              category: data.category
            };
          case 'project':
            return {
              type: result.type,
              title: data.title,
              subtitle: `${data.category} • ${data.status}`,
              content: data.technologies?.join(', ') || '',
              icon: '🚀',
              technologies: data.technologies || [],
              category: data.category
            };
          case 'experience':
            return {
              type: result.type,
              title: data.title,
              subtitle: data.company,
              content: data.duration,
              icon: '💼',
              technologies: [],
              category: 'Experience'
            };
          case 'contact':
            return {
              type: result.type,
              title: data.name || 'Contact',
              subtitle: data.email || data.description,
              content: data.location || 'Get in touch',
              icon: data.icon || '📧',
              technologies: [],
              category: 'Contact'
            };
          default:
            return {
              type: result.type,
              title: data.name || data.title || 'Unknown',
              subtitle: data.description || data.subtitle || '',
              content: data.category || data.content || '',
              icon: data.icon || '📄',
              technologies: data.technologies || [],
              category: data.category || 'Other'
            };
        }
      });

    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    // Store the result in sessionStorage for the results page
    sessionStorage.setItem('searchResult', JSON.stringify(result));
    
    // Navigate to results page
    window.location.href = '/search-result';
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search my expertise, projects, or background..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto" ref={resultsRef}>
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${result.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      index === selectedIndex
                        ? "bg-white/20 backdrop-blur-sm border border-white/30"
                        : "hover:bg-white/10 backdrop-blur-sm"
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                      {result.type === 'programming_language' ? (
                        <TechIcon technology={result.title} className="w-6 h-6" />
                      ) : (
                        <span className="text-lg">{result.icon}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{result.title}</div>
                      {result.subtitle && (
                        <div className="text-sm text-white/70 truncate">{result.subtitle}</div>
                      )}
                      <div className="text-xs text-white/50 truncate">{result.content}</div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="p-8 text-center text-white/60">
                <svg className="mx-auto h-12 w-12 text-white/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.44-.966-5.958-2.525C4.978 11.61 4 9.872 4 8c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.872-.978 3.61-2.042 4.475A7.962 7.962 0 0112 15z" />
                </svg>
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm mt-1">Try searching for projects, skills, or experience</p>
              </div>
            ) : (
              <div className="p-8 text-center text-white/60">
                <svg className="mx-auto h-12 w-12 text-white/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg font-medium">Start typing to search</p>
                <p className="text-sm mt-1">Search my expertise, projects, or background</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm rounded-b-2xl">
            <div className="flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80">Enter</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80">Esc</kbd>
                  Close
                </span>
              </div>
              <div>
                {results.length > 0 && (
                  <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
