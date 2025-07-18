import { PERSONAL_INFO } from '../constants.ts';

// Get related projects for a search result
function getRelatedProjects(result) {
  if (result.type === 'programming_language' || result.type === 'skill') {
    // For programming language searches, find projects that use similar technologies
    const searchTerm = result.title.toLowerCase();
    
    // Enhanced matching for programming languages
    const relatedProjects = PERSONAL_INFO.projects.filter(project => 
      project.technologies.some(tech => {
        const techLower = tech.toLowerCase();
        
        // Direct match (e.g., "python" matches "Python")
        if (techLower.includes(searchTerm) || searchTerm.includes(techLower)) {
          return true;
        }
        
        // Match without extensions (e.g., "python" matches "Python", "javascript" matches "JavaScript")
        const baseTech = techLower.split('.')[0];
        const baseSearch = searchTerm.split('.')[0];
        if (baseTech.includes(baseSearch) || baseSearch.includes(baseTech)) {
          return true;
        }
        
        // Special cases for common programming languages
        const languageMap = {
          'python': ['python', 'django', 'flask'],
          'javascript': ['javascript', 'js', 'node.js', 'react.js', 'next.js', 'typescript'],
          'typescript': ['typescript', 'ts', 'react.js', 'next.js', 'node.js'],
          'react': ['react.js', 'next.js', 'javascript', 'typescript'],
          'node': ['node.js', 'javascript', 'typescript', 'express.js'],
          'js': ['javascript', 'node.js', 'react.js', 'next.js', 'typescript']
        };
        
        if (languageMap[baseSearch]) {
          return languageMap[baseSearch].some(lang => techLower.includes(lang));
        }
        
        return false;
      })
    );
    
    return relatedProjects;
  } else if (result.type === 'project') {
    // For project searches, show other projects in the same category
    const currentProject = PERSONAL_INFO.projects.find(p => p.title === result.title);
    if (currentProject) {
      return PERSONAL_INFO.projects.filter(p => 
        p.category === currentProject.category && p.title !== result.title
      ).slice(0, 2);
    }
  }
  return [];
}

// Toast notification function
export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-zinc-800 text-zinc-100 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full border border-zinc-700';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 100);
  
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Copy text to clipboard
export function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage);
  }).catch((err) => {
    console.error('Failed to copy text:', err);
    showToast('Failed to copy to clipboard');
  });
}

// Open email client
export function openEmail(email) {
  window.open(`mailto:${email}`, '_blank');
}

// Dispatch search event
export function openSearch() {
  window.dispatchEvent(new CustomEvent('openSearch'));
}

// Load search result from sessionStorage and display it
export function loadSearchResult() {
  const resultData = sessionStorage.getItem('searchResult');
  const container = document.getElementById('search-results-container');
  const noResultDiv = document.getElementById('no-result');
  
  if (resultData && container && noResultDiv) {
    try {
      const result = JSON.parse(resultData);
      
      // Hide the no-result message
      noResultDiv.style.display = 'none';
      
      // Create a compact result display with dashboard-like styling
      container.innerHTML = `
        <div class="min-h-full">
          <!-- Compact Result Header -->
          <div class="mb-4 pb-4 border-b border-white/10">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl border border-white/10 shadow-lg">
                ${result.icon}
              </div>
              <div class="flex-1 min-w-0">
                <h1 class="text-2xl font-light text-white/95 mb-1 tracking-tight truncate">${result.title}</h1>
                ${result.subtitle ? `<p class="text-white/60 text-sm font-normal truncate">${result.subtitle}</p>` : ''}
              </div>
            </div>
            <div class="inline-flex items-center bg-white/8 backdrop-blur-md text-white/70 px-3 py-1 rounded-full text-xs font-medium border border-white/15 shadow-sm">
              <div class="w-1.5 h-1.5 bg-white/40 rounded-full mr-2"></div>
              ${result.type.charAt(0).toUpperCase() + result.type.slice(1)} Result
            </div>
          </div>

          <!-- Compact Result Content -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content Card -->
            <div class="lg:col-span-1">
              <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
                <div class="text-center">
                  <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
                    ${result.icon}
                  </div>
                  <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${result.title}</h2>
                  ${result.subtitle ? `<p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${result.subtitle}</p>` : ''}
                  ${result.content ? `<p class="text-white/50 mb-6 text-sm font-normal">${result.content}</p>` : `<p class="text-white/50 mb-6 text-sm font-normal">Information about ${result.title}</p>`}
                  
                  ${result.type === 'programming_language' && result.title.toLowerCase() === 'python' ? `
                    <div class="space-y-4">
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Python Libraries & Frameworks</div>
                        <div class="flex flex-wrap gap-2 mb-4">
                          <span class="text-xs px-2 py-1 bg-green-500/20 rounded-md text-green-300 border border-green-500/30">Django</span>
                          <span class="text-xs px-2 py-1 bg-blue-500/20 rounded-md text-blue-300 border border-blue-500/30">Flask</span>
                          <span class="text-xs px-2 py-1 bg-purple-500/20 rounded-md text-purple-300 border border-purple-500/30">FastAPI</span>
                          <span class="text-xs px-2 py-1 bg-orange-500/20 rounded-md text-orange-300 border border-orange-500/30">NumPy</span>
                          <span class="text-xs px-2 py-1 bg-red-500/20 rounded-md text-red-300 border border-red-500/30">Pandas</span>
                          <span class="text-xs px-2 py-1 bg-yellow-500/20 rounded-md text-yellow-300 border border-yellow-500/30">Matplotlib</span>
                        </div>
                      </div>
                      
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Expertise Areas</div>
                        <div class="space-y-2">
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                            <span>Web Development (Django, Flask)</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span>Data Analysis & Visualization</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                            <span>API Development & Integration</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
                            <span>Automation & Scripting</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Development Tools</div>
                        <div class="grid grid-cols-2 gap-2">
                          <div class="flex items-center gap-2 text-xs text-white/70">
                            <span class="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                            <span>PyCharm</span>
                          </div>
                          <div class="flex items-center gap-2 text-xs text-white/70">
                            <span class="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                            <span>VS Code</span>
                          </div>
                          <div class="flex items-center gap-2 text-xs text-white/70">
                            <span class="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                            <span>Jupyter Notebook</span>
                          </div>
                          <div class="flex items-center gap-2 text-xs text-white/70">
                            <span class="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                            <span>Git & GitHub</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ` : result.type === 'programming_language' && (result.title.toLowerCase() === 'javascript' || result.title.toLowerCase() === 'typescript') ? `
                    <div class="space-y-4">
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">${result.title} Libraries & Frameworks</div>
                        <div class="flex flex-wrap gap-2 mb-4">
                          <span class="text-xs px-2 py-1 bg-cyan-500/20 rounded-md text-cyan-300 border border-cyan-500/30">React.js</span>
                          <span class="text-xs px-2 py-1 bg-gray-500/20 rounded-md text-gray-300 border border-gray-500/30">Next.js</span>
                          <span class="text-xs px-2 py-1 bg-green-500/20 rounded-md text-green-300 border border-green-500/30">Node.js</span>
                          <span class="text-xs px-2 py-1 bg-red-500/20 rounded-md text-red-300 border border-red-500/30">Express.js</span>
                          <span class="text-xs px-2 py-1 bg-blue-500/20 rounded-md text-blue-300 border border-blue-500/30">TypeScript</span>
                          <span class="text-xs px-2 py-1 bg-purple-500/20 rounded-md text-purple-300 border border-purple-500/30">Tailwind CSS</span>
                        </div>
                      </div>
                      
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Expertise Areas</div>
                        <div class="space-y-2">
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-cyan-400 rounded-full"></span>
                            <span>Frontend Development (React, Next.js)</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                            <span>Backend Development (Node.js)</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span>Full-Stack Applications</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                            <span>Modern Web Development</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ` : result.type === 'programming_language' && result.title.toLowerCase() === 'react' ? `
                    <div class="space-y-4">
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">React Ecosystem</div>
                        <div class="flex flex-wrap gap-2 mb-4">
                          <span class="text-xs px-2 py-1 bg-cyan-500/20 rounded-md text-cyan-300 border border-cyan-500/30">React Hooks</span>
                          <span class="text-xs px-2 py-1 bg-gray-500/20 rounded-md text-gray-300 border border-gray-500/30">Next.js</span>
                          <span class="text-xs px-2 py-1 bg-red-500/20 rounded-md text-red-300 border border-red-500/30">Redux</span>
                          <span class="text-xs px-2 py-1 bg-orange-500/20 rounded-md text-orange-300 border border-orange-500/30">React Router</span>
                          <span class="text-xs px-2 py-1 bg-green-500/20 rounded-md text-green-300 border border-green-500/30">Framer Motion</span>
                          <span class="text-xs px-2 py-1 bg-purple-500/20 rounded-md text-purple-300 border border-purple-500/30">Styled Components</span>
                        </div>
                      </div>
                      
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Specializations</div>
                        <div class="space-y-2">
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-cyan-400 rounded-full"></span>
                            <span>Component Architecture</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span>State Management</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                            <span>Performance Optimization</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-white/80">
                            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                            <span>Modern UI/UX</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ` : result.type === 'contact' && result.subtitle?.includes('@') ? `
                    <div class="space-y-4">
                      <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
                        <div class="text-xs text-white/50 mb-1 uppercase tracking-wide font-medium">Email Address</div>
                        <div class="text-white/90 font-mono text-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">${result.subtitle}</div>
                      </div>
                      <div class="grid grid-cols-1 gap-2">
                        <button onclick="window.open('mailto:${result.subtitle}', '_blank')"
                                class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-4 py-3 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">✉️</span>
                            <span class="font-medium text-sm">Send Email</span>
                          </div>
                        </button>
                        <button onclick="navigator.clipboard.writeText('${result.subtitle}'); showToast('Email copied!')"
                                class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-4 py-3 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">📋</span>
                            <span class="font-medium text-sm">Copy Email</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  ` : (() => {
                    const relatedProjects = getRelatedProjects(result);
                    return relatedProjects.length > 0 ? `
                      <div class="grid grid-cols-1 gap-2">
                        <a href="/about" class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-4 py-2 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">📖</span>
                            <span class="font-medium text-sm">About</span>
                          </div>
                        </a>
                        <a href="/projects" class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-4 py-2 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">🚀</span>
                            <span class="font-medium text-sm">Projects</span>
                          </div>
                        </a>
                        <a href="/contact" class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-4 py-2 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">💬</span>
                            <span class="font-medium text-sm">Contact</span>
                          </div>
                        </a>
                      </div>
                    ` : `
                      <div class="grid grid-cols-1 gap-2">
                        <a href="/about" class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-4 py-2 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">📖</span>
                            <span class="font-medium text-sm">Learn More</span>
                          </div>
                        </a>
                        <a href="/contact" class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-4 py-2 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                          <div class="flex items-center justify-center gap-2">
                            <span class="text-sm">💬</span>
                            <span class="font-medium text-sm">Get In Touch</span>
                          </div>
                        </a>
                      </div>
                    `;
                  })()}
                </div>
              </div>
            </div>

            <!-- Related Projects Section -->
            ${(() => {
              const relatedProjects = getRelatedProjects(result);
              
              if (relatedProjects.length > 0) {
                const sectionTitle = result.type === 'programming_language' 
                  ? `Projects Using ${result.title}` 
                  : 'Related Projects';
                
                return `
                  <div class="lg:col-span-2">
                    <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
                      <h3 class="text-lg font-light text-white/90 mb-4 tracking-tight">${sectionTitle}</h3>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${relatedProjects.slice(0, 4).map(project => `
                          <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg hover:bg-white/10 transition-all duration-200 hover:scale-105">
                            <div class="flex items-start justify-between mb-3">
                              <h4 class="text-base font-medium text-white/95 leading-tight">${project.title}</h4>
                              <span class="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70 border border-white/10 whitespace-nowrap">${project.status}</span>
                            </div>
                            <p class="text-white/70 text-xs mb-3 leading-relaxed">${project.description}</p>
                            <div class="space-y-2">
                              <div class="text-xs text-white/50 uppercase tracking-wide font-medium">Technologies</div>
                              <div class="flex flex-wrap gap-1">
                                ${project.technologies.slice(0, 4).map(tech => `
                                  <span class="text-xs px-2 py-1 bg-white/5 rounded-md text-white/80 border border-white/10">${tech}</span>
                                `).join('')}
                                ${project.technologies.length > 4 ? `<span class="text-xs px-2 py-1 bg-white/5 rounded-md text-white/60 border border-white/10">+${project.technologies.length - 4}</span>` : ''}
                              </div>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                      ${relatedProjects.length > 4 ? `
                        <div class="mt-4 text-center">
                          <a href="/projects" class="text-white/60 hover:text-white/80 text-sm font-medium transition-colors">
                            View ${relatedProjects.length - 4} more projects →
                          </a>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }
              return '';
            })()}
          </div>

          <!-- Compact Back to Search -->
          <div class="mt-6 pt-4 border-t border-white/10">
            <button onclick="window.dispatchEvent(new CustomEvent('openSearch'))"
                    class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-4 py-2 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105">
              <div class="flex items-center gap-2">
                <span class="text-sm">🔍</span>
                <span class="font-medium text-sm">Search Again</span>
              </div>
            </button>
          </div>
        </div>
      `;
      
      // Clear the sessionStorage after use
      sessionStorage.removeItem('searchResult');
    } catch (error) {
      console.error('Error parsing search result:', error);
      showToast('Error loading search result');
    }
  }
}