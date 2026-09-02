import { galleryConfig } from '../config';

const formatTitle = (title: string) => title.replace(/, /g, ', ');

const Gallery = () => {
  return (
    <section id="gallery" className="relative w-full bg-[#101010] py-32 px-8 lg:px-16">
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
