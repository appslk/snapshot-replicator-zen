
import { FC } from 'react';

export const BuySection: FC = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 uppercase">Buy Puff Dog NFT</h2>
        
        <p className="text-center mb-2 font-bold">
          MINT YOUR PUFF DOG TODAY & START WINNING!
        </p>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="text-xl font-bold">0 / 10000 Available</div>
          <div className="flex items-center gap-2">
            <span>1 SOL + GAS</span>
          </div>
        </div>
        
        <button className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition mb-6">
          Mint Now
        </button>
        
        <p className="text-center max-w-2xl mx-auto">
          Don't wait—these rare NFTs won't last forever. Grab yours now, lock in your rewards, and let the good vibes roll!
        </p>
        
        <div className="text-center mt-6">
          <button className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition">
            Mint Puff Dog NFT
          </button>
        </div>
      </div>
    </section>
  );
};
