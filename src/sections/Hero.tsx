import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoContainerRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;
    const nav = navRef.current;
    const bottom = bottomRef.current;
    const tagline = taglineRef.current;

    if (!section || !titleLeft || !titleRight || !nav || !bottom || !tagline) return;

    // Start video from 6 seconds manually if needed
    if (videoRef.current) {
        videoRef.current.currentTime = 6;
    }

    // Set initial states
    gsap.set([titleLeft, titleRight], { opacity: 0, y: 100 });
    gsap.set(nav, { opacity: 0, y: -30 });
    gsap.set([bottom, tagline], { opacity: 0, y: 30 });
    if (video) gsap.set(video, { scale: 1.15, opacity: 0 });

    // Entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.1,
    });

    if (video) {
      tl.to(video, { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' });
    }

    tl.to(nav, { opacity: 1, y: 0, duration: 1 }, video ? '-=1.8' : 0)
      .to(titleLeft, { opacity: 1, y: 0, duration: 1.4 }, '-=1.2')
      .to(titleRight, { opacity: 1, y: 0, duration: 1.4 }, '-=1.1')
      .to(tagline, { opacity: 1, y: 0, duration: 1 }, '-=1.0')
      .to(bottom, { opacity: 1, y: 0, duration: 1 }, '-=0.8');

    // Scroll parallax matches a drone moving slowly
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(titleLeft, { y: p * 200, x: p * -40 });
        gsap.set(titleRight, { y: p * 200, x: p * 40 });
        if (video) gsap.set(video, { y: p * 120 }); // slower movement for depth
      },
    });
    triggersRef.current.push(scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video Layer */}
      <div ref={videoContainerRef} className="absolute inset-0 z-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 z-10 pointer-events-none" />
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4#t=6" type="video/mp4" />
        </video>
      </div>

      {/* Navigation Layer */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full z-50 px-6 lg:px-16 py-8 flex items-center justify-between will-change-transform"
      >
        <div className="flex items-center gap-4">
          <img 
            src="/images/logo.png" 
            alt="Norfolk Development Logo" 
            className="h-8 md:h-12 w-auto object-contain"
            style={{ 
              filter: 'invert(1)',
              mixBlendMode: 'screen'
            }}
          />
        </div>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {heroConfig.navLinks.map((link, i) => (
            <a key={i} href={link.href} className="museo-label text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-[0.15em] uppercase">{link.label}</a>
          ))}
        </div>
        {/* Mobile menu simple trigger (optional) */}
        <div className="md:hidden">
          <button aria-label="Menu" className="text-white/80 hover:text-white p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      {/* Main Hero Content (Centered) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 lg:px-12 pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden mix-blend-screen text-center">
            <h1 
              ref={titleLeftRef}
              className="museo-headline text-white text-[13vw] md:text-[9vw] lg:text-[7vw] leading-[0.85] tracking-tight will-change-transform"
              style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
            >
              {heroConfig.brandLeft}
            </h1>
          </div>
          <div className="overflow-hidden mix-blend-screen text-center">
            <h1 
              ref={titleRightRef}
              className="museo-headline text-white text-[13vw] md:text-[9vw] lg:text-[7vw] leading-[0.85] tracking-tight ml-4 md:ml-16 will-change-transform"
              style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
            >
              {heroConfig.brandRight}
            </h1>
          </div>
        </div>

        <div className="overflow-hidden mt-8 md:mt-12 w-full text-center">
          <p 
            ref={taglineRef}
            className="museo-body text-white/90 text-sm md:text-base lg:text-lg max-w-[280px] md:max-w-md mx-auto font-light tracking-wide will-change-transform drop-shadow-md"
          >
            {heroConfig.tagline}
          </p>
        </div>
      </div>

      {/* Social Links on Mobile - Positioned slightly above the bottom bar */}
      <div className="absolute bottom-24 left-0 w-full z-20 flex justify-center md:hidden pointer-events-auto gap-8 px-6">
         {heroConfig.socialLinks.map((link, i) => (
            <a key={i} href={link.href} className="museo-label text-white/70 hover:text-white transition-colors text-[10px] tracking-[0.15em] uppercase">{link.label}</a>
          ))}
      </div>

      {/* Bottom Bar Container */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full z-20 px-6 lg:px-16 py-6 flex items-center justify-between border-t border-white/10 will-change-transform pointer-events-auto backdrop-blur-sm bg-black/10"
      >
        <p className="museo-label text-white/50 hover:text-white transition-colors cursor-pointer text-[10px] md:text-xs tracking-[0.2em] uppercase">
          {heroConfig.scrollText}
        </p>
        <div className="hidden md:flex gap-8">
           {heroConfig.socialLinks.map((link, i) => (
              <a key={i} href={link.href} className="museo-label text-white/50 hover:text-white transition-colors text-[10px] md:text-xs tracking-[0.2em] uppercase">{link.label}</a>
            ))}
        </div>
        <p className="museo-label text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase">
          {heroConfig.copyrightText}
        </p>
      </div>
    </section>
  );
};

export default Hero;
