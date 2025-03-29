
import { FC } from 'react';
import Image from 'next/image';

export const Hero: FC = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 bg-black">
      <div className="container mx-auto text-center">
        <Image 
          src="/lovable-uploads/0f8db977-5a82-4431-9e8a-98af137f02c4.png" 
          alt="Puff Dog NFT Collection" 
          width={500} 
          height={180} 
          className="mx-auto mb-6"
        />
        
        <p className="text-white text-center max-w-3xl mx-auto text-lg mb-12 font-vag">
          PUFF DOG ("PUFF") is a meme-driven cryptocurrency built on the Solana blockchain, integrating NFTs and 
          gaming to create an engaging ecosystem for the PUFF community.
        </p>
      </div>
    </section>
  );
};
