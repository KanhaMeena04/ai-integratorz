import Image from 'next/image';
import team from '@/data/team.json';
import { useState } from 'react';

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  bio: string;
}

export default function Team() {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div id="team" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-coiny text-4xl text-primary md:text-5xl lg:text-6xl">Our Team</h2>
          <p className="mt-4 text-xl text-secondary">Meet the talented people behind our success</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member: TeamMember, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl bg-gray-600/50 p-6 transition-all duration-500 ${
                activeCard === index ? 'scale-105 shadow-lg shadow-primary/50' : ''
              }`}
              onClick={() => handleCardClick(index)}
            >
              {/* Neon Border Animation */}
              <div className="absolute -left-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-primary/50"></div>
              <div className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-primary/50"></div>
              <div className="absolute -bottom-1 -left-1 h-2 w-2 animate-pulse rounded-full bg-primary/50"></div>
              <div className="absolute -bottom-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-primary/50"></div>
              
              {/* Hover Effect Lines */}
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute right-0 top-0 h-0 w-[2px] bg-primary transition-all duration-300 group-hover:h-full"></div>
              <div className="absolute bottom-0 right-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute bottom-0 left-0 h-0 w-[2px] bg-primary transition-all duration-300 group-hover:h-full"></div>

              <div className={`relative h-full transition-transform duration-500 ${flippedCards[index] ? 'rotate-y-180' : ''}`}>
                {/* Front of Card */}
                <div className={`backface-hidden ${flippedCards[index] ? 'hidden' : 'block'}`}>
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-coiny text-2xl text-primary">{member.name}</h3>
                    <p className="mt-2 text-lg text-secondary">{member.designation}</p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className={`backface-hidden absolute inset-0 flex items-center justify-center p-4 ${flippedCards[index] ? 'block' : 'hidden'}`}>
                  <p className="text-center text-sm text-gray-300">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
} 