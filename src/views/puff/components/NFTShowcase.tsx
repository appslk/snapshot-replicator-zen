
import { FC } from 'react';
import Image from 'next/image';

export const NFTShowcase: FC = () => {
  // Sample NFT data - in a real app, this would come from an API or database
  const nfts = [
    { id: 1, name: 'Puff Dog #001', image: '/lovable-uploads/0f8db977-5a82-4431-9e8a-98af137f02c4.png' },
    { id: 2, name: 'Puff Dog #002', image: '/lovable-uploads/0f8db977-5a82-4431-9e8a-98af137f02c4.png' },
    { id: 3, name: 'Puff Dog #003', image: '/lovable-uploads/0f8db977-5a82-4431-9e8a-98af137f02c4.png' },
    { id: 4, name: 'Puff Dog #004', image: '/lovable-uploads/0f8db977-5a82-4431-9e8a-98af137f02c4.png' },
  ];
  
  return (
    <section className="w-full py-16 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-arco mb-12 text-white uppercase">NFT Collection</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-black rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image 
                  src={nft.image} 
                  alt={nft.name} 
                  fill={true}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-arco text-white">{nft.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
