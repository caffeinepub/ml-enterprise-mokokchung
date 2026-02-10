import { useState } from 'react';
import { GalleryLightbox } from '../gallery/GalleryLightbox';

const galleryImages = [
  {
    src: '/assets/image-1.jpg',
    alt: 'ML Logistics Nagaland delivery van with cargo boxes at loading dock',
    title: 'Professional Logistics Services'
  }
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-heading">Our Gallery</h2>
          <p className="section-description max-w-2xl mx-auto">
            Take a look at our fleet and operations. We pride ourselves on maintaining modern vehicles and professional service standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.src)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{image.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <GalleryLightbox
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </section>
  );
}
