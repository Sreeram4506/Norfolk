import { useState } from 'react';
import { galleryConfig, heroConfig } from '../config';

const formatTitle = (title: string) => title.replace(/, /g, ', ');

const Gallery = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { label: 'Home', href: '/' },
    ...heroConfig.navLinks,
  ];

  const getGalleryPageHref = (href: string) => href.startsWith('#') ? `/${href}` : href;

  return (
    <section id="gallery" className="relative w-full min-h-screen bg-[#101010] py-32 px-8 lg:px-16">
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 lg:px-16 py-6 flex items-center justify-between bg-black/90 backdrop-blur-md border-b border-white/5">
        <a href="/" aria-label="Norfolk Development home" className="flex items-center gap-4">
          <img
            src="/images/logo.png"
            alt="Norfolk Development Logo"
            className="h-8 md:h-12 w-auto object-contain"
            style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
          />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={getGalleryPageHref(link.href)}
              className="museo-label text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-[0.15em] uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="md:hidden text-white/80 hover:text-white p-3"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[90] bg-[#050505] flex flex-col items-center justify-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={getGalleryPageHref(link.href)}
              className="museo-headline text-white text-3xl uppercase tracking-tighter"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <p className="museo-label text-white/50 mb-4">Visual Archive</p>
        <h2 className="museo-headline text-white text-4xl md:text-5xl lg:text-7xl mb-20">
          Gallery
        </h2>

        <div className="mb-24">
          <div className="flex items-end justify-between mb-8 border-b border-white/15 pb-4">
            <h3 className="museo-headline text-white text-2xl md:text-3xl">Videos</h3>
            <p className="museo-label text-white/40 text-[10px]">Project films</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryConfig.videos.map((video) => (
              <figure key={video.src} className="group">
                <div className="aspect-video overflow-hidden bg-black border border-white/10">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
                <figcaption className="museo-label text-white/65 text-[10px] mt-4">
                  {formatTitle(video.title)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-8 border-b border-white/15 pb-4">
            <h3 className="museo-headline text-white text-2xl md:text-3xl">Images</h3>
            <p className="museo-label text-white/40 text-[10px]">Hedgerow study</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {galleryConfig.images.map((image, index) => (
              <figure key={image.src} className="group overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  <img
                    src={image.src}
                    alt={`${image.title} image ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="museo-label text-white/45 text-[9px] mt-3">
                  {image.title} / {String(index + 1).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
