import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "../constants";

interface SearchResult {
  type: string;
  title: string;
  subtitle?: string;
  content: string;
  icon: string;
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

  // Search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in personal info
    if (PERSONAL_INFO.name.toLowerCase().includes(lowerQuery)) {
      searchResults.push({
        type: "contact",
        title: PERSONAL_INFO.name,
        subtitle: PERSONAL_INFO.title,
        content: PERSONAL_INFO.location,
        icon: "👨‍💻"
      });
    }

    if (PERSONAL_INFO.title.toLowerCase().includes(lowerQuery)) {
      searchResults.push({
        type: "role",
        title: "Role",
        subtitle: PERSONAL_INFO.title,
        content: "Current profession",
        icon: "💼"
      });
    }

    if (PERSONAL_INFO.location.toLowerCase().includes(lowerQuery)) {
      searchResults.push({
        type: "location",
        title: "Location",
        subtitle: PERSONAL_INFO.location,
        content: "Current residence",
        icon: "📍"
      });
    }

    // Search in experience
    PERSONAL_INFO.experience.forEach((exp, index) => {
      if (
        exp.title.toLowerCase().includes(lowerQuery) ||
        exp.company.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "experience",
          title: exp.title,
          subtitle: exp.company,
          content: exp.duration,
          icon: "🏢"
        });
      }
    });

    // Search in skills
    Object.entries(PERSONAL_INFO.skills).forEach(([category, skillList]) => {
      skillList.forEach((skill) => {
        if (skill.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            type: "skill",
            title: skill,
            subtitle: `${category} skill`,
            content: `Technology expertise`,
            icon: "🛠️"
          });
        }
      });
    });

    // Search in education
    if (
      PERSONAL_INFO.education.degree.toLowerCase().includes(lowerQuery) ||
      PERSONAL_INFO.education.institution.toLowerCase().includes(lowerQuery)
    ) {
      searchResults.push({
        type: "education",
        title: PERSONAL_INFO.education.degree,
        subtitle: PERSONAL_INFO.education.institution,
        content: "Educational background",
        icon: "🎓"
      });
    }

    // Search in certifications
    PERSONAL_INFO.certifications.forEach((cert) => {
      if (cert.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "certification",
          title: cert,
          subtitle: "Certification",
          content: "Professional achievement",
          icon: "🏆"
        });
      }
    });

    // Search in fun facts
    PERSONAL_INFO.funFacts.forEach((fact) => {
      if (fact.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "fact",
          title: "Fun Fact",
          subtitle: fact,
          content: "Personal interest",
          icon: "🎯"
        });
      }
    });

    // Search in contact
    if (PERSONAL_INFO.contact.email.toLowerCase().includes(lowerQuery)) {
      searchResults.push({
        type: "contact",
        title: "Email",
        subtitle: PERSONAL_INFO.contact.email,
        content: "Contact information",
        icon: "📧"
      });
    }

    setResults(searchResults.slice(0, 8)); // Limit to 8 results
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
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Search Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl bg-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-zinc-700/50">
            <svg
              className="w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search my profile, skills, experience..."
              className="flex-1 bg-transparent text-white placeholder-zinc-400 outline-none text-lg"
            />
            <div className="text-xs text-zinc-400 bg-zinc-700/50 px-2 py-1 rounded">
              ESC
            </div>
          </div>

          {/* Search Results */}
          <div ref={resultsRef} className="max-h-96 overflow-y-auto">
            {query.trim() === "" ? (
              <div className="p-8 text-center text-zinc-400">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-lg mb-2">Search my profile</div>
                <div className="text-sm">Try searching for skills, experience, projects, or contact info</div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
                  <span className="bg-zinc-700/50 px-2 py-1 rounded">React</span>
                  <span className="bg-zinc-700/50 px-2 py-1 rounded">Developer</span>
                  <span className="bg-zinc-700/50 px-2 py-1 rounded">Nepal</span>
                  <span className="bg-zinc-700/50 px-2 py-1 rounded">JavaScript</span>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-zinc-400">
                <div className="text-4xl mb-2">�</div>
                <div>No results found for "{query}"</div>
                <div className="text-sm mt-2">Try searching for skills, experience, or contact info</div>
              </div>
            ) : (
              <div className="p-2">
                <div className="text-xs text-zinc-500 px-3 py-2 border-b border-zinc-700/30 mb-2">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </div>
                {results.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      index === selectedIndex
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "hover:bg-zinc-700/50 text-zinc-300"
                    }`}
                  >
                    <div className="text-2xl flex-shrink-0">{result.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{result.title}</div>
                      {result.subtitle && (
                        <div className="text-sm text-zinc-400 truncate">
                          {result.subtitle}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 flex-shrink-0 bg-zinc-800/50 px-2 py-1 rounded">
                      {result.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="p-3 border-t border-zinc-700/50 text-xs text-zinc-400 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="bg-zinc-600 px-1.5 py-0.5 rounded text-xs">↑</div>
                  <div className="bg-zinc-600 px-1.5 py-0.5 rounded text-xs">↓</div>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-zinc-600 px-1.5 py-0.5 rounded text-xs">↵</div>
                  <span>Select</span>
                </div>
              </div>
              <div>{results.length} results</div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
