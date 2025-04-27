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
    <section className="h-screen min-h-screen flex items-start justify-center pt-4 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-6xl w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron tracking-tight mb-4">
            Nuestros <span className="font-bold">proyectos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/60 font-light leading-relaxed">
            Descubre cómo hemos ayudado a empresas a transformar su presencia digital y alcanzar sus objetivos de negocio.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleProjects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <a href={project.url} className="block aspect-[3/4] w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8">
                  <span className="inline-block mb-2 text-xs sm:text-sm font-medium text-white/80 bg-black/30 px-3 sm:px-4 py-1 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-orbitron text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm">
                    Cliente: {project.client}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        {projects.length > 6 && !showAll && (
          <div className="mt-10 md:mt-16 text-center">
            <button onClick={() => setShowAll(true)} className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 py-0 text-base font-medium border border-black/10 bg-white text-black transition-all duration-300 rounded-full hover:border-black/30 hover:scale-105">
              Ver todos los proyectos
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <style>{`
        @font-face {
          font-family: 'Orbitron';
          src: url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
          font-display: swap;
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default ProjectsGrid; 