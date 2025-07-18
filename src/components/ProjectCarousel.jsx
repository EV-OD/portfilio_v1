import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProjectCarousel = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const handleUpdate = (event) => {
      const { images, title } = event.detail;
      setImages(images || []);
      setTitle(title || '');
    };

    document.addEventListener('update-carousel', handleUpdate);

    return () => {
      document.removeEventListener('update-carousel', handleUpdate);
    };
  }, []);

  if (!images || images.length === 0) {
    return (
        <div className='flex items-center justify-center w-full h-full bg-zinc-800/50 rounded-xl'>
            <p className='text-zinc-400'>No images to display.</p>
        </div>
    );
  }

  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image} alt={`${title} - image ${index + 1}`} className='rounded-xl object-contain w-full h-auto aspect-[4/3]' />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProjectCarousel;