import React, { useEffect, useState } from "react";
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
// Helper: Map icon name string to icon component
function getIconComponent(iconName, iconProps = {}) {
  if (!iconName) return null;
  if (iconName.startsWith('Fa') && FaIcons[iconName]) return React.createElement(FaIcons[iconName], iconProps);
  if (iconName.startsWith('Si') && SiIcons[iconName]) return React.createElement(SiIcons[iconName], iconProps);
  if (iconName.startsWith('Md') && MdIcons[iconName]) return React.createElement(MdIcons[iconName], iconProps);
  if (iconName.startsWith('Gi') && GiIcons[iconName]) return React.createElement(GiIcons[iconName], iconProps);
  if (iconName.startsWith('Ai') && AiIcons[iconName]) return React.createElement(AiIcons[iconName], iconProps);
  return null;
}

// Helper: Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className =
    "fixed top-4 right-4 bg-zinc-800 text-zinc-100 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full border border-zinc-700";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-x-full");
  }, 100);
  setTimeout(() => {
    toast.classList.add("translate-x-full");
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Helper: Copy to clipboard
function copyToClipboard(text, successMessage = "Copied to clipboard!") {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage);
  }).catch(() => {
    showToast("Failed to copy to clipboard");
  });
}

// Helper: Open email client
function openEmail(email) {
  window.open(`mailto:${email}`, "_blank");
}

// Helper: Open search
function openSearch() {
  window.dispatchEvent(new CustomEvent("openSearch"));
}

// Main React Component
// Helper: get related projects (mock, replace with your logic or import)
function getRelatedProjects(result, projects = []) {
  if (result.type === "programming_language" || result.type === "skill") {
    const searchTerm = result.title.toLowerCase();
    return projects.filter(project =>
      project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm))
    );
  } else if (result.type === "project") {
    const currentProject = projects.find(p => p.title === result.title);
    if (currentProject) {
      return projects.filter(p => p.category === currentProject.category && p.title !== result.title).slice(0, 2);
    }
  }
  return [];
}

// Main React Component
export default function SearchResultDisplay({ projects = [] }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const resultData = sessionStorage.getItem("searchResult");
    if (resultData) {
      try {
        setResult(JSON.parse(resultData));
        sessionStorage.removeItem("searchResult");
      } catch {
        showToast("Error loading search result");
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-xl max-w-md mx-auto">
          <div className="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            🔍
          </div>
          <h2 className="text-2xl font-light text-white/95 mb-3 tracking-tight">No Search Result</h2>
          <p className="text-white/60 mb-6 text-base font-normal leading-relaxed">No search result found. Try searching for something first.</p>
          <button
            onClick={openSearch}
            className="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-6 py-3 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🔍</span>
              <span className="font-medium">Start Searching</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Modular UI for each result type
  function renderTypeSpecific() {
    // Programming Language (Python, JS, React, etc.)
    if (result.type === "programming_language") {
      const title = result.title.toLowerCase();
      if (title === "python") {
        return (
          <div className="space-y-4">
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Python Libraries & Frameworks</div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-green-500/20 rounded-md text-green-300 border border-green-500/30">Django</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-md text-blue-300 border border-blue-500/30">Flask</span>
                <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-md text-purple-300 border border-purple-500/30">FastAPI</span>
                <span className="text-xs px-2 py-1 bg-orange-500/20 rounded-md text-orange-300 border border-orange-500/30">NumPy</span>
                <span className="text-xs px-2 py-1 bg-red-500/20 rounded-md text-red-300 border border-red-500/30">Pandas</span>
                <span className="text-xs px-2 py-1 bg-yellow-500/20 rounded-md text-yellow-300 border border-yellow-500/30">Matplotlib</span>
              </div>
            </div>
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Expertise Areas</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Web Development (Django, Flask)</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>Data Analysis & Visualization</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>API Development & Integration</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-orange-400 rounded-full"></span>Automation & Scripting</div>
              </div>
            </div>
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Development Tools</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs text-white/70"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>PyCharm</div>
                <div className="flex items-center gap-2 text-xs text-white/70"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>VS Code</div>
                <div className="flex items-center gap-2 text-xs text-white/70"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>Jupyter Notebook</div>
                <div className="flex items-center gap-2 text-xs text-white/70"><span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>Git & GitHub</div>
              </div>
            </div>
          </div>
        );
      }
      if (title === "javascript" || title === "typescript") {
        return (
          <div className="space-y-4">
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">{result.title} Libraries & Frameworks</div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-cyan-500/20 rounded-md text-cyan-300 border border-cyan-500/30">React.js</span>
                <span className="text-xs px-2 py-1 bg-gray-500/20 rounded-md text-gray-300 border border-gray-500/30">Next.js</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 rounded-md text-green-300 border border-green-500/30">Node.js</span>
                <span className="text-xs px-2 py-1 bg-red-500/20 rounded-md text-red-300 border border-red-500/30">Express.js</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-md text-blue-300 border border-blue-500/30">TypeScript</span>
                <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-md text-purple-300 border border-purple-500/30">Tailwind CSS</span>
              </div>
            </div>
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Expertise Areas</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-cyan-400 rounded-full"></span>Frontend Development (React, Next.js)</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Backend Development (Node.js)</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>Full-Stack Applications</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>Modern Web Development</div>
              </div>
            </div>
          </div>
        );
      }
      if (title === "react") {
        return (
          <div className="space-y-4">
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">React Ecosystem</div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-cyan-500/20 rounded-md text-cyan-300 border border-cyan-500/30">React Hooks</span>
                <span className="text-xs px-2 py-1 bg-gray-500/20 rounded-md text-gray-300 border border-gray-500/30">Next.js</span>
                <span className="text-xs px-2 py-1 bg-red-500/20 rounded-md text-red-300 border border-red-500/30">Redux</span>
                <span className="text-xs px-2 py-1 bg-orange-500/20 rounded-md text-orange-300 border border-orange-500/30">React Router</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 rounded-md text-green-300 border border-green-500/30">Framer Motion</span>
                <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-md text-purple-300 border border-purple-500/30">Styled Components</span>
              </div>
            </div>
            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Specializations</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-cyan-400 rounded-full"></span>Component Architecture</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>State Management</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Performance Optimization</div>
                <div className="flex items-center gap-2 text-sm text-white/80"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>Modern UI/UX</div>
              </div>
            </div>
          </div>
        );
      }
    }
    // Contact result
    if (result.type === "contact" && result.subtitle?.includes("@")) {
      return (
        <div className="space-y-4">
          <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
            <div className="text-xs text-white/50 mb-1 uppercase tracking-wide font-medium">Email Address</div>
            <div className="text-white/90 font-mono text-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">{result.subtitle}</div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button onClick={() => openEmail(result.subtitle)} className="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-4 py-3 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm">✉️</span>
                <span className="font-medium text-sm">Send Email</span>
              </div>
            </button>
            <button onClick={() => copyToClipboard(result.subtitle, "Email copied!")} className="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-4 py-3 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm">📋</span>
                <span className="font-medium text-sm">Copy Email</span>
              </div>
            </button>
          </div>
        </div>
      );
    }
    // Default
    return null;
  }

  // Related projects section
  function renderRelatedProjects() {
    const relatedProjects = getRelatedProjects(result, projects);
    if (!relatedProjects.length) return null;
    const sectionTitle = result.type === "programming_language"
      ? `Projects Using ${result.title}`
      : "Related Projects";
    return (
      <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl mt-8">
        <h3 className="text-lg font-light text-white/90 mb-4 tracking-tight">{sectionTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedProjects.slice(0, 4).map(project => (
            <div key={project.title} className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-base font-medium text-white/95 leading-tight">{project.title}</h4>
                <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70 border border-white/10 whitespace-nowrap">{project.status}</span>
              </div>
              <p className="text-white/70 text-xs mb-3 leading-relaxed">{project.description}</p>
              <div className="space-y-2">
                <div className="text-xs text-white/50 uppercase tracking-wide font-medium">Technologies</div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-xs px-2 py-1 bg-white/5 rounded-md text-white/80 border border-white/10">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-white/60 border border-white/10">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {relatedProjects.length > 4 && (
          <div className="mt-4 text-center">
            <a href="/projects" className="text-white/60 hover:text-white/80 text-sm font-medium transition-colors">
              View {relatedProjects.length - 4} more projects →
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col">
      {/* Result Header */}
      <div className="mb-6 pb-4 border-b border-zinc-700">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-4xl text-zinc-100">
            {typeof result.icon === 'string' ? getIconComponent(result.icon, { size: 40 }) : result.icon}
          </div>
          <div>
            <h1 className="text-2xl font-light text-white/95 mb-1 tracking-tight truncate">{result.title}</h1>
            {result.subtitle && <p className="text-white/60 text-sm font-normal truncate">{result.subtitle}</p>}
          </div>
        </div>
        <div className="inline-flex items-center bg-white/8 backdrop-blur-md text-white/70 px-3 py-1 rounded-full text-xs font-medium border border-white/15 shadow-sm">
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-2"></div>
          {result.type.charAt(0).toUpperCase() + result.type.slice(1)} Result
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
              {typeof result.icon === 'string' ? getIconComponent(result.icon, { size: 36 }) : result.icon}
            </div>
            <h2 className="text-xl font-light text-white/95 mb-2 tracking-tight">{result.title}</h2>
            {result.subtitle && <p className="text-white/60 mb-4 text-sm font-normal leading-relaxed">{result.subtitle}</p>}
            {result.content ? (
              <p className="text-white/50 mb-6 text-sm font-normal">{result.content}</p>
            ) : (
              <p className="text-white/50 mb-6 text-sm font-normal">Information about {result.title}</p>
            )}
            {renderTypeSpecific()}
          </div>
        </div>
        {renderRelatedProjects()}
      </div>
      {/* Back to Search */}
      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <button
          onClick={openSearch}
          className="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-4 py-2 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <div className="flex items-center gap-2 justify-center">
            <span className="text-sm">🔍</span>
            <span className="font-medium text-sm">Search Again</span>
          </div>
        </button>
      </div>
    </div>
  );
}
