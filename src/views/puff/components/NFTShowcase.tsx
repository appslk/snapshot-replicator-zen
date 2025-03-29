
import { FC } from 'react';

export const NFTShowcase: FC = () => {
  const nfts = [
    "/imgs/nft1.png",
    "/imgs/nft2.png",
    "/imgs/nft3.png",
    "/imgs/nft4.png",
    "/imgs/nft5.png"
  ];

  return (
    <section className="w-full bg-black py-8">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto gap-4 justify-center">
          {nfts.map((nft, index) => (
            <div key={index} className="flex-shrink-0 w-56 h-64">
              <img 
                src={nft} 
                alt={`Puff Dog NFT ${index+1}`} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-400 transition">
            Mint Now
          </button>
        </div>
      </div>
    </section>
  );
};
