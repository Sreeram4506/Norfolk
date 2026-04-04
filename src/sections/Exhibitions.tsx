import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { exhibitionsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ExhibitCard = ({ exhibit }: { exhibit: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const intervalRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (exhibit.gallery && exhibit.gallery.length > 0) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex((prev: number) => (prev + 1) % exhibit.gallery.length);
      }, 1200); // Change image every 1.2s for a better flow
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setActiveImageIndex(0);
  };

  return (
    <div
      className="exhibit-card group relative overflow-hidden will-change-transform"
      data-cursor="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Media (Image, Video, or Gallery) */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {exhibit.video ? (
          <video
            ref={videoRef}
            src={exhibit.video}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loop
            muted
            playsInline
          />
        ) : exhibit.gallery ? (
          <div className="w-full h-full relative">
            {exhibit.gallery.map((src: string, index: number) => (
              <img
                key={src}
                src={src}
                alt={exhibit.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  index === activeImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            ))}
          </div>
        ) : exhibit.image ? (
          <img
            src={exhibit.image}
            alt={exhibit.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : null}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 pointer-events-none">
        <p className="museo-label text-white/50 mb-2 text-[10px]">{exhibit.date}</p>
        <h3 className="museo-headline text-white text-xl md:text-2xl lg:text-3xl">
          {exhibit.title}
        </h3>
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

const Exhibitions = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!exhibitionsConfig.headline && exhibitionsConfig.exhibitions.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !grid || !cta) return;

    // Reset triggers on re-render
    triggersRef.current.forEach(t => t.kill());
    triggersRef.current = [];

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Card staggered reveal
    const cards = grid.querySelectorAll<HTMLElement>('.exhibit-card');
    cards.forEach((card, i) => {
      const yOffset = [0, 100, 200, 300][i % 4] || 0;
      gsap.set(card, { opacity: 0.4, y: yOffset });

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 95%',
        end: 'top 30%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(card, {
            opacity: 0.4 + p * 0.6,
            y: yOffset * (1 - p),
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // CTA reveal
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 30 });
      const ctaTrigger = ScrollTrigger.create({
        trigger: cta,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(ctaTrigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [showAll]);

  const visibleExhibitions = showAll 
    ? exhibitionsConfig.exhibitions 
    : exhibitionsConfig.exhibitions.slice(0, 2);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <p className="reveal-header museo-label text-white/50 mb-4">
          {exhibitionsConfig.label}
        </p>
        <h2 className="reveal-header museo-headline text-white text-4xl md:text-5xl lg:text-7xl">
          {exhibitionsConfig.headline}
        </h2>
      </div>

      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {visibleExhibitions.map((exhibit) => (
          <ExhibitCard key={exhibit.id} exhibit={exhibit} />
        ))}
      </div>

      {!showAll && exhibitionsConfig.exhibitions.length > 2 && (
        <div ref={ctaRef} className="max-w-7xl mx-auto mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            data-cursor="hover"
            className="museo-label text-white border border-white/20 px-10 py-4 hover:bg-white hover:text-[#050505] transition-all duration-300 uppercase tracking-widest text-[10px]"
          >
            {exhibitionsConfig.ctaText || "View All Projects"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Exhibitions;
