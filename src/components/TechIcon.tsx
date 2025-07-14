/**
 * Technology Icons Component
 * Provides real technology logos and icons for search results using react-icons
 */

import React from 'react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiAstro,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiVite,
  SiGit,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGithub,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiLinux,
  SiUbuntu,
  SiAndroid,
  SiIos,
  SiFigma,
  SiSketch,
  SiApple,
  SiAdobephotoshop,
  SiAdobeillustrator
} from 'react-icons/si';

import {
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
  FaDesktop,
  FaCloud,
  FaTools,
  FaPaintBrush,
  FaGraduationCap,
  FaCertificate,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaRocket,
  FaLightbulb,
  FaHeart
} from 'react-icons/fa';

// Technology icon mapping
const TechIcons = {
  // Programming Languages
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  
  // Frontend Frameworks/Libraries
  React: SiReact,
  'Next.js': SiNextdotjs,
  NextJS: SiNextdotjs,
  Astro: SiAstro,
  Vite: SiVite,
  
  // Backend
  'Node.js': SiNodedotjs,
  NodeJS: SiNodedotjs,
  Express: SiExpress,
  Django: SiDjango,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  
  // Markup & Styling
  HTML: SiHtml5,
  HTML5: SiHtml5,
  CSS: SiCss3,
  CSS3: SiCss3,
  'Tailwind CSS': SiTailwindcss,
  TailwindCSS: SiTailwindcss,
  
  // Databases
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  
  // DevOps & Tools
  Git: SiGit,
  Docker: SiDocker,
  GitHub: SiGithub,
  
  // Cloud & Deployment
  Firebase: SiFirebase,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  
  // Operating Systems
  Linux: SiLinux,
  Ubuntu: SiUbuntu,
  macOS: SiApple,
  
  // Mobile
  Android: SiAndroid,
  iOS: SiIos,
  
  // Design Tools
  Figma: SiFigma,
  Photoshop: SiAdobephotoshop,
  Illustrator: SiAdobeillustrator,
  Sketch: SiSketch,
  
  // General Categories (fallback icons)
  programming: FaCode,
  database: FaDatabase,
  server: FaServer,
  mobile: FaMobile,
  desktop: FaDesktop,
  cloud: FaCloud,
  tools: FaTools,
  design: FaPaintBrush,
  education: FaGraduationCap,
  certification: FaCertificate,
  contact: FaEnvelope,
  location: FaMapMarkerAlt,
  experience: FaBriefcase,
  project: FaRocket,
  skill: FaLightbulb,
  about: FaUser,
  fact: FaHeart,
  
  // Default fallback
  Default: FaCode
};

interface TechIconProps {
  technology: string;
  className?: string;
  color?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ 
  technology, 
  className = "w-6 h-6",
  color 
}) => {
  // Normalize technology name for lookup
  const normalizedTech = technology.trim();
  
  // Find the icon component
  const IconComponent = TechIcons[normalizedTech as keyof typeof TechIcons] || 
                       TechIcons[normalizedTech.toLowerCase() as keyof typeof TechIcons] ||
                       TechIcons.Default;
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <IconComponent 
        className={className}
        style={color ? { color } : undefined}
      />
    </div>
  );
};

export default TechIcon;
