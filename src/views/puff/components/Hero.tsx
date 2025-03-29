
import { FC } from 'react';
import Image from 'next/image';

export const Hero: FC = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 bg-black">
      <div className="container mx-auto text-center">
        <Image 
          src="/lovable-uploads/e4bf8dd2-78e0-4b6a-9052-3c866c8dea5e.png" 
          alt="Puff Dog NFT Collection" 
          width={400} 
          height={140} 
          className="mx-auto mb-6"
        />
        
        <p className="text-white text-center max-w-3xl mx-auto text-lg mb-12">
          PUFF DOG ("PUFF") is a meme-driven cryptocurrency built on the Solana blockchain, integrating NFTs and 
          gaming to create an engaging ecosystem for the PUFF community.
        </p>
      </div>
    </section>
  );
};
