/**
 * Dynamic Template System for Search Results
 * Generates HTML templates based on result type and data
 */

export class SearchResultTemplateEngine {
  constructor() {
    this.templates = {
      programming_language: this.renderProgrammingLanguage.bind(this),
      skill: this.renderSkill.bind(this),
      project: this.renderProject.bind(this),
      experience: this.renderExperience.bind(this),
      contact: this.renderContact.bind(this),
      education: this.renderEducation.bind(this),
      certification: this.renderCertification.bind(this),
      fact: this.renderFact.bind(this)
    };
  }

  /**
   * Main render function
   */
  render(result) {
    const template = this.templates[result.type];
    if (!template) {
      console.warn(`No template found for type: ${result.type}`);
      return this.renderDefault(result);
    }
    return template(result.data);
  }

  /**
   * Programming Language Template
   */
  renderProgrammingLanguage(data) {
    return {
      header: this.createHeader(data.icon, data.name, data.description, data.category),
      content: this.createProgrammingLanguageContent(data),
      sidebar: this.createProjectsSidebar(data.relatedProjects, `Projects Using ${data.name}`)
    };
  }

  /**
   * Skill Template
   */
  renderSkill(data) {
    return {
      header: this.createHeader(data.icon, data.name, data.description, data.category),
      content: this.createSkillContent(data),
      sidebar: this.createProjectsSidebar(data.relatedProjects, 'Related Projects')
    };
  }

  /**
   * Project Template
   */
  renderProject(data) {
    return {
      header: this.createHeader(data.icon, data.title, data.description, data.category),
      content: this.createProjectContent(data),
      sidebar: this.createRelatedProjectsSidebar(data)
    };
  }

  /**
   * Experience Template
   */
  renderExperience(data) {
    return {
      header: this.createHeader(data.icon, data.title, data.description, 'Professional Experience'),
      content: this.createExperienceContent(data),
      sidebar: this.createActionsSidebar(['about', 'contact'])
    };
  }

  /**
   * Contact Template
   */
  renderContact(data) {
    return {
      header: this.createHeader(data.icon, data.name, data.description, 'Contact Information'),
      content: this.createContactContent(data),
      sidebar: this.createActionsSidebar(['about', 'projects'])
    };
  }

  /**
   * Education Template
   */
  renderEducation(data) {
    return {
      header: this.createHeader(data.icon, data.name, data.description, 'Educational Background'),
      content: this.createEducationContent(data),
      sidebar: this.createActionsSidebar(['about', 'contact'])
    };
  }

  /**
   * Certification Template
   */
  renderCertification(data) {
    return {
      header: this.createHeader(data.icon, data.name, data.description, data.category),
      content: this.createCertificationContent(data),
      sidebar: this.createActionsSidebar(['about', 'contact'])
    };
  }

  /**
   * Fact Template
   */
  renderFact(data) {
    return {
      header: this.createHeader(data.icon, data.name, data.description, data.category),
      content: this.createFactContent(data),
      sidebar: this.createActionsSidebar(['about', 'projects', 'contact'])
    };
  }

  /**
   * Header Component
   */
  createHeader(icon, title, description, category) {
    return `
      <div class="mb-4 pb-4 border-b border-white/10">
        <div class="flex items-center gap-4 mb-3">
          <div class="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl border border-white/10 shadow-lg">
            ${icon}
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-light text-white/95 mb-1 tracking-tight truncate">${title}</h1>
            <p class="text-white/60 text-sm font-normal truncate">${description}</p>
          </div>
        </div>
        <div class="inline-flex items-center bg-white/8 backdrop-blur-md text-white/70 px-3 py-1 rounded-full text-xs font-medium border border-white/15 shadow-sm">
          <div class="w-1.5 h-1.5 bg-white/40 rounded-full mr-2"></div>
          ${category}
        </div>
      </div>
    `;
  }

  /**
   * Programming Language Content
   */
  createProgrammingLanguageContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.name}</h2>
          <p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${data.description}</p>
          <p class="text-white/50 mb-6 text-sm font-normal">${data.yearsOfExperience} years of experience • ${data.projectsCount} projects</p>
          
          <div class="space-y-4">
            <!-- Libraries & Frameworks -->
            <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">${data.name} Libraries & Frameworks</div>
              <div class="flex flex-wrap gap-2">
                ${data.libraries.map(lib => `
                  <span class="text-xs px-2 py-1 bg-${lib.color}-500/20 rounded-md text-${lib.color}-300 border border-${lib.color}-500/30" title="${lib.description}">
                    ${lib.name}
                  </span>
                `).join('')}
              </div>
            </div>
            
            <!-- Expertise Areas -->
            <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Expertise Areas</div>
              <div class="space-y-2">
                ${data.expertise.map(exp => `
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 text-sm text-white/80">
                      <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <div>
                        <span class="font-medium">${exp.area}</span>
                        <p class="text-xs text-white/60">${exp.description}</p>
                      </div>
                    </div>
                    <span class="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70">${exp.level}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <!-- Development Tools -->
            <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div class="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium">Development Tools</div>
              <div class="grid grid-cols-2 gap-2">
                ${data.tools.map(tool => `
                  <div class="flex items-center gap-2 text-xs text-white/70">
                    <span class="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                    <span>${tool}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Projects Sidebar
   */
  createProjectsSidebar(projects, title) {
    if (!projects || projects.length === 0) {
      return `
        <div class="lg:col-span-2">
          <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl text-center">
            <div class="text-white/60">No related projects found</div>
          </div>
        </div>
      `;
    }

    return `
      <div class="lg:col-span-2">
        <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
          <h3 class="text-lg font-light text-white/90 mb-4 tracking-tight">${title}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${projects.slice(0, 4).map(project => `
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
          ${projects.length > 4 ? `
            <div class="mt-4 text-center">
              <a href="/projects" class="text-white/60 hover:text-white/80 text-sm font-medium transition-colors">
                View ${projects.length - 4} more projects →
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Skill Content
   */
  createSkillContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.name}</h2>
          <p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${data.description}</p>
          <div class="inline-flex items-center bg-white/8 backdrop-blur-md text-white/70 px-3 py-1 rounded-full text-xs font-medium border border-white/15">
            ${data.category}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Actions Sidebar
   */
  createActionsSidebar(actions) {
    const actionMap = {
      about: { icon: '📖', label: 'About', href: '/about' },
      projects: { icon: '🚀', label: 'Projects', href: '/projects' },
      contact: { icon: '💬', label: 'Contact', href: '/contact' }
    };

    return `
      <div class="lg:col-span-2">
        <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
          <h3 class="text-lg font-light text-white/90 mb-4 tracking-tight">Quick Actions</h3>
          <div class="grid grid-cols-1 gap-2">
            ${actions.map(action => {
              const actionData = actionMap[action];
              return `
                <a href="${actionData.href}" class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-4 py-3 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-sm">${actionData.icon}</span>
                    <span class="font-medium text-sm">${actionData.label}</span>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Default template for unknown types
   */
  renderDefault(result) {
    return {
      header: this.createHeader('❓', result.data.name || 'Unknown', result.data.description || 'No description', 'Unknown Type'),
      content: `
        <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl text-center">
          <div class="text-white/60">No template available for this result type</div>
        </div>
      `,
      sidebar: this.createActionsSidebar(['about', 'contact'])
    };
  }

  // Additional templates for other types would go here...
  createProjectContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.title}</h2>
          <p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${data.description}</p>
          <div class="space-y-3">
            <div class="inline-flex items-center bg-white/8 backdrop-blur-md text-white/70 px-3 py-1 rounded-full text-xs font-medium border border-white/15">
              ${data.category} • ${data.status}
            </div>
            <div class="flex flex-wrap gap-2 justify-center">
              ${data.technologies.map(tech => `
                <span class="text-xs px-2 py-1 bg-white/10 rounded-md text-white/80 border border-white/10">${tech}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createExperienceContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.title}</h2>
          <p class="text-white/60 mb-2 text-sm font-normal">${data.company}</p>
          <p class="text-white/50 mb-4 text-xs font-normal">${data.duration}</p>
        </div>
      </div>
    `;
  }

  createContactContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-4 tracking-tight">${data.name}</h2>
          <div class="space-y-3">
            <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div class="text-xs text-white/50 mb-2 uppercase tracking-wide font-medium">Email</div>
              <div class="text-white/90 font-mono text-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">${data.contact.email}</div>
            </div>
            <div class="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-lg">
              <div class="text-xs text-white/50 mb-2 uppercase tracking-wide font-medium">Location</div>
              <div class="text-white/90 text-sm">${data.location}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createEducationContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.degree}</h2>
          <p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${data.institution}</p>
        </div>
      </div>
    `;
  }

  createCertificationContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.name}</h2>
          <p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${data.description}</p>
        </div>
      </div>
    `;
  }

  createFactContent(data) {
    return `
      <div class="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-white/8 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/15 shadow-lg">
            ${data.icon}
          </div>
          <h2 class="text-xl font-light text-white/95 mb-2 tracking-tight">${data.name}</h2>
          <p class="text-white/60 mb-4 text-sm font-normal leading-relaxed">${data.description}</p>
        </div>
      </div>
    `;
  }

  createRelatedProjectsSidebar(data) {
    return this.createActionsSidebar(['about', 'projects', 'contact']);
  }
}

// Export singleton instance
export const templateEngine = new SearchResultTemplateEngine();
