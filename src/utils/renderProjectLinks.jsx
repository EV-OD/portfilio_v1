import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectLinks from '../components/ProjectLinks.jsx';

export function renderProjectLinks(project, container) {
  const root = createRoot(container);
  root.render(
    <ProjectLinks 
      githubUrl={project.githubUrl} 
      liveUrl={project.liveUrl} 
      websiteUrl={project.websiteUrl} 
    />
  );
}