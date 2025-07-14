import { PERSONAL_INFO } from '../constants.ts';

/**
 * Search Architecture - Modular system for generating structured search results
 */

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
    icon: '🐍',
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
    icon: '⚡',
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
    icon: '📘',
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
    icon: '⚛️',
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
   * Main search function that returns structured results
   */
  search(query) {
    const lowerQuery = query.toLowerCase().trim();
    const results = [];
    const seenTypes = new Set(); // Prevent duplicates

    // Search for programming languages
    const programmingResult = this.searchProgrammingLanguages(lowerQuery);
    if (programmingResult && !seenTypes.has(`${programmingResult.type}_${programmingResult.data.name}`)) {
      results.push(programmingResult);
      seenTypes.add(`${programmingResult.type}_${programmingResult.data.name}`);
    }

    // Search for skills (only if not already found as programming language)
    const skillResults = this.searchSkills(lowerQuery);
    skillResults.forEach(skill => {
      const key = `${skill.type}_${skill.data.name}`;
      if (!seenTypes.has(key)) {
        results.push(skill);
        seenTypes.add(key);
      }
    });

    // Search for projects
    const projectResults = this.searchProjects(lowerQuery);
    projectResults.forEach(project => {
      const key = `${project.type}_${project.data.title}`;
      if (!seenTypes.has(key)) {
        results.push(project);
        seenTypes.add(key);
      }
    });

    // Search for experiences
    const experienceResults = this.searchExperiences(lowerQuery);
    experienceResults.forEach(exp => results.push(exp));

    // Search for contact info
    const contactResult = this.searchContact(lowerQuery);
    if (contactResult) results.push(contactResult);

    // Search for education
    const educationResult = this.searchEducation(lowerQuery);
    if (educationResult) results.push(educationResult);

    // Search for certifications
    const certResults = this.searchCertifications(lowerQuery);
    certResults.forEach(cert => results.push(cert));

    // Search for fun facts
    const factResults = this.searchFacts(lowerQuery);
    factResults.forEach(fact => results.push(fact));

    return results;
  }

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
            icon: '🚀',
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
            icon: '💼',
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
          icon: '📧',
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
          icon: '🎓',
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
            icon: '🏆',
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
            icon: '🎯',
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
      'React.js': '⚛️',
      'Next.js': '▲',
      'JavaScript': '⚡',
      'TypeScript': '📘',
      'Node.js': '🟢',
      'Python': '🐍'
    };
    return iconMap[skill] || '🔧';
  }
}

// Export singleton instance
export const searchGenerator = new SearchResultGenerator();
