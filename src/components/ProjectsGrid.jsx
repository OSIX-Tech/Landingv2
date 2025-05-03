import React, { useState, useEffect } from 'react';

const ProjectsGrid = ({ jsonPath = '/src/data/projects.json' }) => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(jsonPath)
      .then(res => res.json())
      .then(data => setProjects(data));
  }, [jsonPath]);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section className="min-h-[80vh] sm:min-h-screen flex items-start justify-center pt-4 sm:pt-8 bg-white relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="section-title">
          Our <span className="font-bold">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-8">
          {visibleProjects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <a href={project.url} className="block aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-5 lg:p-6">
                  <span className="inline-block mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm font-medium text-white/80 bg-black/30 px-2 sm:px-3 md:px-4 py-1 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-[10px] sm:text-xs md:text-sm">
                    Client: {project.client}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        {projects.length > 6 && !showAll && (
          <div className="mt-8 sm:mt-10 md:mt-16 text-center">
            <button onClick={() => setShowAll(true)} className="inline-flex items-center justify-center h-10 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 py-0 text-sm sm:text-base font-medium border border-black/10 bg-white text-black transition-all duration-300 rounded-full hover:border-black/30 hover:scale-105">
              Ver todos los proyectos
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid; 