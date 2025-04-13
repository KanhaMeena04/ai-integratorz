import examples from '@/data/examples.json';
import { Carousel } from 'flowbite-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PiControlBold } from 'react-icons/pi';

interface ExamplesProps {
  className?: string;
}

interface ExampleCardProps {
  className?: string;
  preview: string;
  images: string[];
  tags?: string[];
  title: string;
  text: string;
}

const CarouselControl = ({ className }: { className: string }) => {
  return (
    <div className={`text-5xl text-primary ${className}`}>
      <PiControlBold />
    </div>
  );
};

const ExampleCard = () => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/assets/examples/example.png',
    '/assets/examples/example1.png',
    '/assets/examples/example2.png',
    '/assets/examples/example3.png',
    '/assets/examples/example4.png',
    '/assets/examples/example5.png',
    '/assets/examples/example6.png',
    '/assets/examples/example7.png',
    '/assets/examples/example8.png'
  ];

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setClicked(!clicked);
  };

  return (
    <div className='relative flex w-full flex-col items-center justify-center gap-5 text-secondary md:h-[600px] md:w-[600px]'>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`${
          hover ? 'from-primary/80' : 'from-primary/40 '
        } relative flex h-[250px] min-h-[180px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br object-cover shadow-tl shadow-primary transition-colors delay-1000 md:h-[400px] md:min-h-[200px]`}
      >
        <Carousel
          leftControl={<CarouselControl className='-rotate-90' />}
          rightControl={<CarouselControl className='rotate-90' />}
          slide={false}
          className='relative h-full w-full'
        >
          {images.map((image, index) => (
            <div
              key={index}
              className='relative h-full w-full cursor-pointer'
              onClick={() => handleImageClick(index)}
            >
              <Image
                alt={`example-image-${index + 1}`}
                src={image}
                width={500}
                height={500}
                className={`${
                  hover ? '-rotate-6' : ''
                } absolute top-0 h-auto w-full transform object-contain shadow-repeat shadow-primary/20 duration-200 ${
                  clicked && currentImage === index ? 'scale-110' : ''
                }`}
              />
              {/* Neon Border Effect */}
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                  hover ? 'shadow-[0_0_15px_rgba(255,0,255,0.5)]' : ''
                } ${
                  clicked && currentImage === index ? 'shadow-[0_0_30px_rgba(255,0,255,0.8)]' : ''
                }`}
              ></div>

              {/* Click Effect */}
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                  clicked && currentImage === index ? 'bg-primary/20' : ''
                }`}
              ></div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default function HomepageExamples(props: ExamplesProps) {
  const { className } = props;
  const bgTextRef = useRef(null);
  useEffect(() => {
    gsap.to(bgTextRef.current, {
      yPercent: -100,
      duration: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: bgTextRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);
  return (
    <div
      id='examples'
      className={`${className} relative flex h-full w-full flex-col items-center justify-center gap-10 p-5 md:p-10`}
    >
      <div className='spotlight spotlight-left'></div>
      <div className='font-dongle text-5xl uppercase text-secondary'>Our Portfolio</div>
      <div
        ref={bgTextRef}
        className='text-shadow absolute z-0 hidden -rotate-90 transform text-start text-[80px] uppercase tracking-wider text-background brightness-50 lg:block lg:text-[80px]'
      >
        featured projects
      </div>
      <div className='z-30 flex h-full w-full flex-wrap items-center justify-around gap-10'>
        <ExampleCard />
      </div>
    </div>
  );
}
