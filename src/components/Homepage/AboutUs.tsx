import aboutUs from '@/data/aboutUs.json';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import './styles/text.css';

interface AboutUsProps {
  className?: string;
}

interface CardProps {
  imageOnLeft?: boolean;
  image: string;
  text: string;
  title?: string;
}

interface ServiceCardProps {
  title: string;
  icon: string;
  link: string;
}

const Card = (props: CardProps) => {
  const { image, imageOnLeft = true, text, title } = props;
  return (
    <div className='relative flex min-h-full min-w-full flex-row items-center justify-between py-5 md:mx-10'>
      <div className='flex w-full flex-col'>
        {title && <h3 className='mb-4 text-3xl font-bold text-secondary'>{title}</h3>}
        <div className='text-justify text-gray-300'>{text}</div>
      </div>
      <Image
        alt='aboutus-image'
        className={`absolute bottom-0 hidden h-[200px] w-auto md:block ${
          imageOnLeft ? '-translate-x-52' : 'right-0 translate-x-52'
        }  translate-y-12`}
        src={image}
        width={500}
        height={500}
        draggable={false}
      />
    </div>
  );
};

const ServiceCard = ({ title, icon, link }: ServiceCardProps) => {
  return (
    <Link href={link}>
      <div className='group relative flex h-24 w-full cursor-pointer items-center justify-start gap-4 overflow-hidden rounded-lg border border-primary/20 bg-primary/10 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20'>
        <div className='service-icon text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:text-primary'>
          {icon}
        </div>
        <h3 className='text-xl font-bold text-secondary'>{title}</h3>

        {/* Neon Border Animation */}
        <div className='absolute -left-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-primary/50'></div>
        <div className='absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-primary/50'></div>
        <div className='absolute -bottom-1 -left-1 h-2 w-2 animate-pulse rounded-full bg-primary/50'></div>
        <div className='absolute -bottom-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-primary/50'></div>

        {/* Hover Effect Lines */}
        <div className='absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full'></div>
        <div className='absolute right-0 top-0 h-0 w-[2px] bg-primary transition-all duration-300 group-hover:h-full'></div>
        <div className='absolute bottom-0 right-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full'></div>
        <div className='absolute bottom-0 left-0 h-0 w-[2px] bg-primary transition-all duration-300 group-hover:h-full'></div>
      </div>
    </Link>
  );
};

export default function HomepageAboutUs(props: AboutUsProps) {
  const { className } = props;
  const bgTextRef = useRef(null);
  useEffect(() => {
    gsap.to(bgTextRef.current, {
      xPercent: 28,
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
      id='aboutUs'
      className={`${className} relative flex w-full flex-col border-b-4 border-primary p-2 py-16 md:p-5 md:px-0`}
    >
      <div className='spotlight spotlight-right'></div>
      <div className='relative hidden w-full items-center justify-center px-10 py-16 font-dongle text-5xl text-secondary md:flex'>
        <div
          ref={bgTextRef}
          className='text-shadow absolute left-0 z-0 text-start text-[150px] uppercase  tracking-wider text-background  brightness-50 lg:left-[15%] lg:text-[200px] '
        >
          {`"About Us"`}
        </div>
        <div className='z-10 text-6xl uppercase'>What we do</div>
      </div>
      <div className='w-full pb-5 text-center font-dongle text-5xl text-secondary md:hidden'>
        About Us
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center gap-5 self-center rounded-3xl bg-primary/20 p-5 md:w-1/2 md:gap-10 md:p-10'>
        {aboutUs.map((card, index) => (
          <React.Fragment key={index}>
            {card.services ? (
              <div className='flex w-full flex-col gap-4'>
                {card.services.map((service, serviceIndex) => (
                  <ServiceCard
                    key={serviceIndex}
                    title={service.title}
                    icon={service.icon}
                    link={service.link}
                  />
                ))}
              </div>
            ) : (
              <Card
                text={card.text}
                image={card.image}
                imageOnLeft={index % 2 === 0}
                title={card.title}
              />
            )}
            {index + 1 < aboutUs.length && !card.services && (
              <div className='w-full border-b-4 border-primary md:w-3/4'></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
