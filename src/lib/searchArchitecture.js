import { FaNodeJs, FaPython, FaTools } from 'react-icons/fa';
import { PERSONAL_INFO } from '../constants.ts';
import { SiJavascript, SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';

/**
 * Search Architecture - Modular system for generating structured search results with fuzzy search
 */

// Fuzzy Search Helper Functions
class FuzzySearch {
  /**
   * Calculate Levenshtein distance between two strings
   */
  static levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  /**
   * Calculate fuzzy match score (0-1, higher is better)
   */
  static fuzzyScore(query, target) {
    const queryLower = query.toLowerCase();
    const targetLower = target.toLowerCase();
    
    // Exact match gets highest score
    if (queryLower === targetLower) return 1.0;
    
    // Starts with query gets high score
    if (targetLower.startsWith(queryLower)) return 0.9;
    
    // Contains query gets medium-high score
    if (targetLower.includes(queryLower)) return 0.8;
    
    // Fuzzy matching based on Levenshtein distance
    const distance = this.levenshteinDistance(queryLower, targetLower);
    const maxLength = Math.max(queryLower.length, targetLower.length);
    const similarity = 1 - (distance / maxLength);
    
    // Only return if similarity is above threshold (lowered for better project matching)
    return similarity > 0.5 ? similarity * 0.7 : 0;
  }
  
  /**
   * Check if query fuzzy matches target
   */
  static fuzzyMatch(query, target, threshold = 0.6) {
    return this.fuzzyScore(query, target) >= threshold;
  }
}

// Enhanced search terms mapping for fuzzy search
const SEARCH_ALIASES = {
  // Programming language aliases
  'py': 'python',
  'pyt': 'python',
  'pyth': 'python',
  'pytho': 'python',
  'js': 'javascript',
  'node': 'nodejs',
  'ts': 'typescript',
  'react': 'reactjs',
  
  // Contact aliases
  'mail': 'contact',
  'email': 'contact',
  'reach': 'contact',
  'touch': 'contact',
  'phone': 'contact',
  'linkedin': 'contact',
  'github': 'contact',
  
  // Skill aliases
  'frontend': 'front-end',
  'backend': 'back-end',
  'fullstack': 'full-stack',
  'web': 'web development',
  'mobile': 'mobile development',
  
  // Experience aliases
  'work': 'experience',
  'job': 'experience',
  'career': 'experience',
  'employment': 'experience',
  
  // Education aliases
  'study': 'education',
  'degree': 'education',
  'university': 'education',
  'college': 'education',
  'school': 'education',
  
  // Project aliases
  'project': 'projects',
  'proj': 'projects',
  'work': 'projects',
  'portfolio': 'portfolio website',
  'ecommerce': 'e-commerce platform',
  'task': 'task management app',
  'management': 'task management app',
  'dashboard': 'data analytics dashboard',
  'analytics': 'data analytics dashboard',
  'data': 'data analytics dashboard',
  'api': 'mobile app backend',
  'backend': 'mobile app backend',
  'mobile': 'mobile app backend',
  'app': 'mobile app backend',
  
  // Common project-related terms
  'website': 'portfolio website',
  'shop': 'e-commerce platform',
  'store': 'e-commerce platform',
  'todo': 'task management app',
  'chat': 'task management app',
  'realtime': 'task management app',
  'graph': 'data analytics dashboard',
  'chart': 'data analytics dashboard',
  'rest': 'mobile app backend',
  'restful': 'mobile app backend'
};

// Result Type Definitions
export const RESULT_TYPES = {
  PROGRAMMING_LANGUAGE: 'programming_language',
  SKILL: 'skill',
  EXPERIENCE: 'experience',
  PROJECT: 'project',
  CONTACT: 'contact',
  EDUCATION: 'education',
  CERTIFICATION: 'certification',
  FACT: 'fact'
};

// Programming Language Data
const PROGRAMMING_LANGUAGES = {
  'python': {
    name: 'Python',
    icon: 'FaPython',
    description: 'Versatile programming language for web development, data science, and automation',
    category: 'Backend Development',
    libraries: [
      { name: 'Django', color: 'green', description: 'High-level web framework' },
      { name: 'Flask', color: 'blue', description: 'Lightweight web framework' },
      { name: 'FastAPI', color: 'purple', description: 'Modern API framework' },
      { name: 'NumPy', color: 'orange', description: 'Scientific computing' },
      { name: 'Pandas', color: 'red', description: 'Data manipulation' },
      { name: 'Matplotlib', color: 'yellow', description: 'Data visualization' },
      { name: 'Scikit-learn', color: 'pink', description: 'Machine learning' },
      { name: 'Requests', color: 'cyan', description: 'HTTP library' }
    ],
    expertise: [
      { area: 'Web Development', description: 'Django, Flask applications', level: 'Expert' },
      { area: 'Data Analysis', description: 'Pandas, NumPy, visualization', level: 'Advanced' },
      { area: 'API Development', description: 'RESTful APIs, FastAPI', level: 'Expert' },
      { area: 'Automation', description: 'Scripts, task automation', level: 'Advanced' },
      { area: 'Machine Learning', description: 'Data science, ML models', level: 'Intermediate' }
    ],
    tools: ['PyCharm', 'VS Code', 'Jupyter Notebook', 'Git', 'Docker', 'PostgreSQL'],
    yearsOfExperience: 3,
    projectsCount: 2
  },
  'javascript': {
    name: 'JavaScript',
    icon: 'SiJavascript',
    description: 'Dynamic programming language for web development and beyond',
    category: 'Frontend/Backend Development',
    libraries: [
      { name: 'React.js', color: 'cyan', description: 'UI library' },
      { name: 'Next.js', color: 'gray', description: 'React framework' },
      { name: 'Node.js', color: 'green', description: 'Runtime environment' },
      { name: 'Express.js', color: 'red', description: 'Web framework' },
      { name: 'TypeScript', color: 'blue', description: 'Typed JavaScript' },
      { name: 'Tailwind CSS', color: 'purple', description: 'Utility CSS' }
    ],
    expertise: [
      { area: 'Frontend Development', description: 'React, Next.js applications', level: 'Expert' },
      { area: 'Backend Development', description: 'Node.js, Express.js APIs', level: 'Advanced' },
      { area: 'Full-Stack Development', description: 'End-to-end applications', level: 'Expert' },
      { area: 'Modern Web Development', description: 'ES6+, async programming', level: 'Expert' }
    ],
    tools: ['VS Code', 'Chrome DevTools', 'npm/yarn', 'Webpack', 'Git', 'MongoDB'],
    yearsOfExperience: 4,
    projectsCount: 4
  },
  'typescript': {
    name: 'TypeScript',
    icon: 'SiTypescript',
    description: 'Typed superset of JavaScript for scalable applications',
    category: 'Frontend/Backend Development',
    libraries: [
      { name: 'React.js', color: 'cyan', description: 'UI library with types' },
      { name: 'Next.js', color: 'gray', description: 'Full-stack framework' },
      { name: 'Node.js', color: 'green', description: 'Backend runtime' },
      { name: 'Express.js', color: 'red', description: 'Typed web framework' }
    ],
    expertise: [
      { area: 'Type Safety', description: 'Static typing, interfaces', level: 'Expert' },
      { area: 'Frontend Development', description: 'React with TypeScript', level: 'Expert' },
      { area: 'Backend Development', description: 'Node.js with types', level: 'Advanced' },
      { area: 'Code Quality', description: 'Better maintainability', level: 'Expert' }
    ],
    tools: ['VS Code', 'TSC', 'ESLint', 'Prettier', 'Git'],
    yearsOfExperience: 3,
    projectsCount: 3
  },
  'react': {
    name: 'React',
    icon: 'SiReact',
    description: 'Component-based JavaScript library for building user interfaces',
    category: 'Frontend Development',
    libraries: [
      { name: 'React Hooks', color: 'cyan', description: 'State management' },
      { name: 'Next.js', color: 'gray', description: 'React framework' },
      { name: 'Redux', color: 'red', description: 'State management' },
      { name: 'React Router', color: 'orange', description: 'Client-side routing' },
      { name: 'Framer Motion', color: 'green', description: 'Animation library' },
      { name: 'Styled Components', color: 'purple', description: 'CSS-in-JS' }
    ],
    expertise: [
      { area: 'Component Architecture', description: 'Reusable, scalable components', level: 'Expert' },
      { area: 'State Management', description: 'Hooks, Redux, Context', level: 'Expert' },
      { area: 'Performance Optimization', description: 'Memoization, lazy loading', level: 'Advanced' },
      { area: 'Modern UI/UX', description: 'Responsive, accessible interfaces', level: 'Expert' }
    ],
    tools: ['React DevTools', 'VS Code', 'Storybook', 'Jest', 'Cypress'],
    yearsOfExperience: 4,
    projectsCount: 5
  }
};

/**
 * Search Result Generator - Creates structured JSON results
 */
export class SearchResultGenerator {
  constructor() {
    this.personalInfo = PERSONAL_INFO;
  }

  /**
   * Main search function that returns structured results with fuzzy search
   */
  search(query) {
    if (!query || query.trim().length === 0) return [];

    let processedQuery = query.toLowerCase().trim();
    const results = [];
    const seenTypes = new Set();

    // Apply search aliases for fuzzy matching
    const expandedQueries = this.expandQuery(processedQuery);
    
    // Search with each expanded query
    expandedQueries.forEach(expandedQuery => {
      // Search for programming languages with fuzzy matching
      const langResult = this.searchProgrammingLanguagesFuzzy(expandedQuery);
      if (langResult && !seenTypes.has(`${langResult.type}_${langResult.data.name}`)) {
        results.push(langResult);
        seenTypes.add(`${langResult.type}_${langResult.data.name}`);
      }

      // Search for skills with fuzzy matching
      const skillResults = this.searchSkillsFuzzy(expandedQuery);
      skillResults.forEach(skill => {
        const key = `${skill.type}_${skill.data.name}`;
        if (!seenTypes.has(key)) {
          results.push(skill);
          seenTypes.add(key);
        }
      });

      // Search for projects with fuzzy matching
      const projectResults = this.searchProjectsFuzzy(expandedQuery);
      projectResults.forEach(project => {
        const key = `${project.type}_${project.data.title}`;
        if (!seenTypes.has(key)) {
          results.push(project);
          seenTypes.add(key);
        }
      });

      // Search for experiences with fuzzy matching
      const experienceResults = this.searchExperiencesFuzzy(expandedQuery);
      experienceResults.forEach(exp => {
        const key = `${exp.type}_${exp.data.title}_${exp.data.company}`;
        if (!seenTypes.has(key)) {
          results.push(exp);
          seenTypes.add(key);
        }
      });

      // Search for contact info with fuzzy matching
      const contactResult = this.searchContactFuzzy(expandedQuery);
      if (contactResult && !seenTypes.has(`${contactResult.type}_contact`)) {
        results.push(contactResult);
        seenTypes.add(`${contactResult.type}_contact`);
      }

      // Search for education with fuzzy matching
      const educationResult = this.searchEducationFuzzy(expandedQuery);
      if (educationResult && !seenTypes.has(`${educationResult.type}_education`)) {
        results.push(educationResult);
        seenTypes.add(`${educationResult.type}_education`);
      }

      // Search for certifications with fuzzy matching
      const certResults = this.searchCertificationsFuzzy(expandedQuery);
      certResults.forEach(cert => {
        const key = `${cert.type}_${cert.data.name}`;
        if (!seenTypes.has(key)) {
          results.push(cert);
          seenTypes.add(key);
        }
      });

      // Search for fun facts with fuzzy matching
      const factResults = this.searchFactsFuzzy(expandedQuery);
      factResults.forEach(fact => {
        const key = `${fact.type}_${fact.data.name}`;
        if (!seenTypes.has(key)) {
          results.push(fact);
          seenTypes.add(key);
        }
      });
    });

    // Sort by fuzzy score and priority
    return results.sort((a, b) => {
      const scoreA = a.fuzzyScore || 0;
      const scoreB = b.fuzzyScore || 0;
      
      if (scoreA !== scoreB) {
        return scoreB - scoreA; // Higher score first
      }
      
      return a.priority - b.priority; // Lower priority number first
    });
  }

  /**
   * Expand query with aliases and variations
   */
  expandQuery(query) {
    const queries = [query];
    
    // Add direct aliases
    if (SEARCH_ALIASES[query]) {
      queries.push(SEARCH_ALIASES[query]);
    }
    
    // Add partial matches for common terms
    Object.keys(SEARCH_ALIASES).forEach(alias => {
      if (FuzzySearch.fuzzyMatch(query, alias, 0.7)) {
        queries.push(SEARCH_ALIASES[alias]);
      }
    });
    
    // Add fuzzy matches for programming languages
    Object.keys(PROGRAMMING_LANGUAGES).forEach(lang => {
      if (FuzzySearch.fuzzyMatch(query, lang, 0.6)) {
        queries.push(lang);
      }
    });
    
    // Add fuzzy matches for project titles and keywords
    this.personalInfo.projects.forEach(project => {
      const titleWords = project.title.toLowerCase().split(' ');
      const descWords = project.description.toLowerCase().split(' ');
      const allWords = [...titleWords, ...descWords];
      
      // Check if query matches any significant words in project
      allWords.forEach(word => {
        if (word.length > 3 && FuzzySearch.fuzzyMatch(query, word, 0.7)) {
          queries.push(project.title.toLowerCase());
        }
      });
      
      // Check direct fuzzy match with project title
      if (FuzzySearch.fuzzyMatch(query, project.title.toLowerCase(), 0.6)) {
        queries.push(project.title.toLowerCase());
      }
    });
    
    // Special handling for generic "project" searches
    if (['project', 'projects', 'proj', 'work', 'portfolio'].includes(query.toLowerCase())) {
      queries.push('show_all_projects');
    }
    
    return [...new Set(queries)]; // Remove duplicates
  }

  /**
   * Enhanced fuzzy search methods
   */
  
  /**
   * Search for programming languages with fuzzy matching
   */
  searchProgrammingLanguagesFuzzy(query) {
    for (const [key, langData] of Object.entries(PROGRAMMING_LANGUAGES)) {
      const score = Math.max(
        FuzzySearch.fuzzyScore(query, key),
        FuzzySearch.fuzzyScore(query, langData.name.toLowerCase())
      );
      if (score > 0) {
        // Always populate relatedProjects as array of { title }
        const relatedProjectsRaw = this.getRelatedProjects(langData.name);
        const relatedProjects = relatedProjectsRaw.map(p => ({ title: p.title }));
        return {
          type: RESULT_TYPES.PROGRAMMING_LANGUAGE,
          priority: 1,
          fuzzyScore: score,
          data: {
            ...langData,
            relatedProjects,
            query: query
          }
        };
      }
    }
    return null;
  }

  /**
   * Search for skills with fuzzy matching
   */
  searchSkillsFuzzy(query) {
    const results = [];
    const allSkills = [
      ...this.personalInfo.skills.frontend,
      ...this.personalInfo.skills.backend,
      ...this.personalInfo.skills.other
    ];

    allSkills.forEach(skill => {
      const score = FuzzySearch.fuzzyScore(query, skill.toLowerCase());
      if (score > 0) {
        // Skip if this is already covered by programming languages
        const isProgLang = Object.values(PROGRAMMING_LANGUAGES).some(lang => 
          lang.name.toLowerCase() === skill.toLowerCase()
        );
        if (!isProgLang) {
          // Always populate relatedProjects as array of { title }
          const relatedProjectsRaw = this.getRelatedProjects(skill);
          const relatedProjects = relatedProjectsRaw.map(p => ({ title: p.title }));
          results.push({
            type: RESULT_TYPES.SKILL,
            priority: 2,
            fuzzyScore: score,
            data: {
              name: skill,
              category: this.getSkillCategory(skill),
              description: `Professional skill in ${skill}`,
              icon: this.getSkillIcon(skill),
              relatedProjects
            }
          });
        }
      }
    });
    return results;
  }

  /**
   * Search for projects with fuzzy matching
   */
  searchProjectsFuzzy(query) {
    const results = [];
    
    // Special case: if someone searches for "project", "projects", or generic terms, show all projects
    if (query === 'show_all_projects' || ['project', 'projects', 'proj', 'work', 'portfolio'].includes(query)) {
      this.personalInfo.projects.forEach((project, index) => {
        results.push({
          type: RESULT_TYPES.PROJECT,
          priority: 3,
          fuzzyScore: 0.95 - (index * 0.1), // Slightly lower score for each subsequent project
          data: {
            ...project,
            icon: 'FaNodeJs',
            matchedTechnologies: project.technologies
          }
        });
      });
      return results;
    }
    
    this.personalInfo.projects.forEach(project => {
      const titleScore = FuzzySearch.fuzzyScore(query, project.title.toLowerCase());
      const descScore = FuzzySearch.fuzzyScore(query, project.description.toLowerCase());
      const categoryScore = FuzzySearch.fuzzyScore(query, project.category.toLowerCase());
      
      // Enhanced technology matching
      const techScores = project.technologies.map(tech => 
        FuzzySearch.fuzzyScore(query, tech.toLowerCase())
      );
      const maxTechScore = Math.max(0, ...techScores);
      
      // Check for keyword matches in title and description
      const titleWords = project.title.toLowerCase().split(' ');
      const descWords = project.description.toLowerCase().split(' ');
      const keywordScores = [...titleWords, ...descWords].map(word =>
        word.length > 2 ? FuzzySearch.fuzzyScore(query, word) : 0
      );
      const maxKeywordScore = Math.max(0, ...keywordScores);
      
      const maxScore = Math.max(titleScore, descScore, categoryScore, maxTechScore, maxKeywordScore);

      if (maxScore > 0) {
        results.push({
          type: RESULT_TYPES.PROJECT,
          priority: 3,
          fuzzyScore: maxScore,
          data: {
            ...project,
            icon: 'FaNodeJs',
            matchedTechnologies: project.technologies.filter((tech, index) =>
              techScores[index] > 0.5
            )
          }
        });
      }
    });

    return results;
  }

  /**
   * Search for experiences with fuzzy matching
   */
  searchExperiencesFuzzy(query) {
    const results = [];
    
    this.personalInfo.experience.forEach(exp => {
      const titleScore = FuzzySearch.fuzzyScore(query, exp.title.toLowerCase());
      const companyScore = FuzzySearch.fuzzyScore(query, exp.company.toLowerCase());
      const maxScore = Math.max(titleScore, companyScore);

      if (maxScore > 0) {
        results.push({
          type: RESULT_TYPES.EXPERIENCE,
          priority: 4,
          fuzzyScore: maxScore,
          data: {
            ...exp,
            icon: 'FaTools',
            description: `${exp.title} at ${exp.company}`
          }
        });
      }
    });

    return results;
  }

  /**
   * Search for contact information with fuzzy matching
   */
  searchContactFuzzy(query) {
    const contactTerms = ['contact', 'email', 'phone', 'linkedin', 'github', 'website', 'mail', 'reach', 'touch'];
    
    const scores = contactTerms.map(term => FuzzySearch.fuzzyScore(query, term));
    const maxScore = Math.max(...scores);
    
    if (maxScore > 0) {
      return {
        type: RESULT_TYPES.CONTACT,
        priority: 5,
        fuzzyScore: maxScore,
        data: {
          name: 'Contact Information',
          icon: 'MdEmail',
          description: 'Get in touch with me',
          contact: this.personalInfo.contact,
          location: this.personalInfo.location
        }
      };
    }
    return null;
  }

  /**
   * Search for education with fuzzy matching
   */
  searchEducationFuzzy(query) {
    const educationTerms = ['education', 'degree', 'university', 'college', 'computer engineering', 'study', 'school'];
    
    const scores = educationTerms.map(term => FuzzySearch.fuzzyScore(query, term));
    const maxScore = Math.max(...scores);
    
    if (maxScore > 0) {
      return {
        type: RESULT_TYPES.EDUCATION,
        priority: 6,
        fuzzyScore: maxScore,
        data: {
          name: 'Education',
          icon: 'GiGraduateCap',
          description: this.personalInfo.education.degree,
          institution: this.personalInfo.education.institution,
          degree: this.personalInfo.education.degree
        }
      };
    }
    return null;
  }

  /**
   * Search for certifications with fuzzy matching
   */
  searchCertificationsFuzzy(query) {
    const results = [];
    
    this.personalInfo.certifications.forEach(cert => {
      const score = FuzzySearch.fuzzyScore(query, cert.toLowerCase());
      
      if (score > 0) {
        results.push({
          type: RESULT_TYPES.CERTIFICATION,
          priority: 7,
          fuzzyScore: score,
          data: {
            name: cert,
            icon: 'AiOutlineTrophy',
            description: `Certified in ${cert}`,
            category: 'Professional Certification'
          }
        });
      }
    });

    return results;
  }

  /**
   * Search for fun facts with fuzzy matching
   */
  searchFactsFuzzy(query) {
    const results = [];
    
    this.personalInfo.funFacts.forEach((fact, index) => {
      const score = FuzzySearch.fuzzyScore(query, fact.toLowerCase());
      
      if (score > 0) {
        results.push({
          type: RESULT_TYPES.FACT,
          priority: 8,
          fuzzyScore: score,
          data: {
            name: `Fun Fact #${index + 1}`,
            icon: 'GiTargeting',
            description: fact,
            category: 'Personal Interest'
          }
        });
      }
    });

    return results;
  }

  /**
   * Legacy search methods (kept for backward compatibility)
   */

  /**
   * Search for programming languages with comprehensive data
   */
  searchProgrammingLanguages(query) {
    for (const [key, langData] of Object.entries(PROGRAMMING_LANGUAGES)) {
      if (query.includes(key) || query.includes(langData.name.toLowerCase())) {
        // Get related projects
        const relatedProjects = this.getRelatedProjects(langData.name);
        
        return {
          type: RESULT_TYPES.PROGRAMMING_LANGUAGE,
          priority: 1,
          data: {
            ...langData,
            relatedProjects,
            query: query
          }
        };
      }
    }
    return null;
  }

  /**
   * Search for skills
   */
  searchSkills(query) {
    const results = [];
    const allSkills = [
      ...this.personalInfo.skills.frontend,
      ...this.personalInfo.skills.backend,
      ...this.personalInfo.skills.other
    ];

    allSkills.forEach(skill => {
      if (skill.toLowerCase().includes(query) || query.includes(skill.toLowerCase())) {
        // Skip if this is already covered by programming languages
        const isProgLang = Object.values(PROGRAMMING_LANGUAGES).some(lang => 
          lang.name.toLowerCase() === skill.toLowerCase()
        );
        
        if (!isProgLang) {
          results.push({
            type: RESULT_TYPES.SKILL,
            priority: 2,
            data: {
              name: skill,
              category: this.getSkillCategory(skill),
              description: `Professional skill in ${skill}`,
              icon: this.getSkillIcon(skill),
              relatedProjects: this.getRelatedProjects(skill)
            }
          });
        }
      }
    });

    return results;
  }

  /**
   * Search for projects
   */
  searchProjects(query) {
    const results = [];
    
    this.personalInfo.projects.forEach(project => {
      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDescription = project.description.toLowerCase().includes(query);
      const matchesTechnology = project.technologies.some(tech => 
        tech.toLowerCase().includes(query) || query.includes(tech.toLowerCase())
      );
      const matchesCategory = project.category.toLowerCase().includes(query);

      if (matchesTitle || matchesDescription || matchesTechnology || matchesCategory) {
        results.push({
          type: RESULT_TYPES.PROJECT,
          priority: 3,
          data: {
            ...project,
            icon: 'FaNodeJs',
            matchedTechnologies: project.technologies.filter(tech =>
              tech.toLowerCase().includes(query) || query.includes(tech.toLowerCase())
            )
          }
        });
      }
    });

    return results;
  }

  /**
   * Search for experiences
   */
  searchExperiences(query) {
    const results = [];
    
    this.personalInfo.experience.forEach(exp => {
      const matchesTitle = exp.title.toLowerCase().includes(query);
      const matchesCompany = exp.company.toLowerCase().includes(query);

      if (matchesTitle || matchesCompany) {
        results.push({
          type: RESULT_TYPES.EXPERIENCE,
          priority: 4,
          data: {
            ...exp,
            icon: 'FaTools',
            description: `${exp.title} at ${exp.company}`
          }
        });
      }
    });

    return results;
  }

  /**
   * Search for contact information
   */
  searchContact(query) {
    const contactTerms = ['contact', 'email', 'phone', 'linkedin', 'github', 'website'];
    
    if (contactTerms.some(term => query.includes(term))) {
      return {
        type: RESULT_TYPES.CONTACT,
        priority: 5,
        data: {
          name: 'Contact Information',
          icon: 'MdEmail',
          description: 'Get in touch with me',
          contact: this.personalInfo.contact,
          location: this.personalInfo.location
        }
      };
    }
    return null;
  }

  /**
   * Search for education
   */
  searchEducation(query) {
    const educationTerms = ['education', 'degree', 'university', 'college', 'computer engineering'];
    
    if (educationTerms.some(term => query.includes(term))) {
      return {
        type: RESULT_TYPES.EDUCATION,
        priority: 6,
        data: {
          name: 'Education',
          icon: 'GiGraduateCap',
          description: this.personalInfo.education.degree,
          institution: this.personalInfo.education.institution,
          degree: this.personalInfo.education.degree
        }
      };
    }
    return null;
  }

  /**
   * Search for certifications
   */
  searchCertifications(query) {
    const results = [];
    
    this.personalInfo.certifications.forEach(cert => {
      if (cert.toLowerCase().includes(query)) {
        results.push({
          type: RESULT_TYPES.CERTIFICATION,
          priority: 7,
          data: {
            name: cert,
            icon: 'AiOutlineTrophy',
            description: `Certified in ${cert}`,
            category: 'Professional Certification'
          }
        });
      }
    });

    return results;
  }

  /**
   * Search for fun facts
   */
  searchFacts(query) {
    const results = [];
    
    this.personalInfo.funFacts.forEach((fact, index) => {
      if (fact.toLowerCase().includes(query)) {
        results.push({
          type: RESULT_TYPES.FACT,
          priority: 8,
          data: {
            name: `Fun Fact #${index + 1}`,
            icon: 'GiTargeting',
            description: fact,
            category: 'Personal Interest'
          }
        });
      }
    });

    return results;
  }

  /**
   * Helper methods
   */
  getRelatedProjects(technology) {
    return this.personalInfo.projects.filter(project =>
      project.technologies.some(tech =>
        tech.toLowerCase().includes(technology.toLowerCase()) ||
        technology.toLowerCase().includes(tech.toLowerCase())
      )
    );
  }

  getSkillCategory(skill) {
    if (this.personalInfo.skills.frontend.includes(skill)) return 'Frontend Development';
    if (this.personalInfo.skills.backend.includes(skill)) return 'Backend Development';
    return 'Other Skills';
  }

  getSkillIcon(skill) {
    const iconMap = {
      'React.js': SiReact,
      'Next.js': SiNextdotjs,
      'JavaScript': SiJavascript,
      'TypeScript': SiTypescript,
      'Node.js': FaNodeJs,
      'Python': FaPython
    };
    return iconMap[skill] || FaTools;
  }
}

// Export singleton instance
export const searchGenerator = new SearchResultGenerator();
