import React, { useState, useEffect, useRef, useCallback } from 'react';

import sliderPkg from 'react-slick';
const Slider = sliderPkg.default || sliderPkg;

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.css';

const ProjectsGrid = ({ projects }) => {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef([]);


  const handleMouseEnter = (e) => {
    if (!isMobile) {
      const vid = e.currentTarget.querySelector('video');
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch((err) => console.warn('play() failed', err));
      }
    }
  };
  
  const handleMouseLeave = (e) => {
    if (!isMobile) {
      const vid = e.currentTarget.querySelector('video');
      if (vid) {
        vid.pause();
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      videoRefs.current.forEach(video => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      });
    } else {
      // Pause all videos when not mobile
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });
    }
  }, [isMobile, projects]);

  useEffect(() => {
    if (loaded && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('resize'));
    }
  }, [loaded]);

  const visibleProjects = projects;

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    swipe: true,
    touchMove: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative overflow-visible">
        <h2 className="section-title">
          Our <span className="font-bold">Projects</span>
        </h2>
        
        <Slider {...settings}> {/* Wrap the project cards in the Slider component */}
          {visibleProjects.map((project, idx) => (
            <div key={idx} className="px-2"> {/* Padding between slides */}
              <div
                className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-100 transition-all duration-300 hover:shadow-xl"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="block aspect-[5/7] sm:aspect-[3/5] md:aspect-[3/5] w-full overflow-hidden">
                  <div className="relative w-full h-full">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      onLoad={() => setLoaded(true)}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] group-hover:scale-110 ${
                        project.video && !isMobile ? 'group-hover:opacity-0' : ''
                      }`}
                    />
                    {project.video && (
                      <video
                        ref={el => videoRefs.current[idx] = el}
                        src={project.video}
                        autoPlay={isMobile}
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-[1000ms] ${
                          isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    )}
                  </div>
                </a>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-5 lg:p-6 pointer-events-none">
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
              </div>
            </div>
          ))}
        </Slider> {/* End of Slider component */}
      </div>
  );
};

export default ProjectsGrid;