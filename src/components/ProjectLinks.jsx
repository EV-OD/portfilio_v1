import React from 'react';
import { FaGithub } from "react-icons/fa";
import { IoGlobeSharp } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

const ProjectLinks = ({ githubUrl, liveUrl, websiteUrl }) => {
  return (
    <div className="flex gap-4 mt-6">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 backdrop-blur-md hover:bg-white/15 text-white px-6 py-3 rounded-xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <FaGithub /> GitHub
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 px-6 py-3 rounded-xl transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50 flex items-center gap-2"
        >
          <FaLink /> Live Demo
        </a>
      )}
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 px-6 py-3 rounded-xl transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50 flex items-center gap-2"
        >
          <IoGlobeSharp /> Website
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;