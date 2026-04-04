import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProject = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const label = labelRef.current;

    if (!section || !video || !content || !title || !label) return;

    // Video parallax effect
    gsap.fromTo(video, 
      { y: '-10%' },
      {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Fade in text content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 40%',
        end: 'top 10%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(label, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(title, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.7'
    );

    // Initial state set for the video component as it's full width
    gsap.set(video, { scale: 1.1 });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-project"
      className="relative w-full h-[100vh] lg:h-[120vh] overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 scale-105 pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/Westwood Fire Training.mov"
          className="w-full h-full object-cover opacity-70 contrast-110 brightness-90 saturate-110"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Cinematic Film Grain Overlay (SVG Filtered) */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.65" 
                numOctaves="3" 
                stitchTiles="stitch" 
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        
        {/* Overlay Gradients - Enhanced Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full max-w-7xl mx-auto px-8 lg:px-16 flex flex-col justify-center items-start"
      >
        <p 
          ref={labelRef}
          className="museo-label text-white/60 mb-6 tracking-[0.3em] text-[10px] sm:text-xs uppercase"
        >
          Specialized Infrastructure
        </p>
        <h2 
          ref={titleRef}
          className="museo-headline text-white text-5xl md:text-7xl lg:text-9xl leading-[1] max-w-4xl"
        >
          Westwood <br />
          <span className="italic text-white/80">Fire Training</span>
        </h2>
        
        <div className="mt-16 flex flex-col sm:flex-row gap-12 sm:gap-24 items-start">
          <div className="flex flex-col gap-2">
            <span className="museo-label text-white/40 text-[9px] uppercase tracking-widest">Status</span>
            <span className="text-white text-lg museo-label">In Progress / Specialized Facility</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="museo-label text-white/40 text-[9px] uppercase tracking-widest">Location</span>
            <span className="text-white text-lg museo-label">Westwood, Massachusetts</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator for the section */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 group">
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white -translate-y-full animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
