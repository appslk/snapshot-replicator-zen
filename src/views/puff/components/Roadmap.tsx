
import { FC } from 'react';

export const Roadmap: FC = () => {
  return (
    <section className="w-full py-16 bg-black text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2 uppercase">Roadmap</h2>
        <p className="mb-12">Puff Dog NFT Collection</p>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white"></div>
          
          {/* Timeline Items */}
          <div className="flex flex-col space-y-24">
            {/* Item 1 */}
            <div className="flex items-center justify-end relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full z-10"></div>
              <div className="w-1/2 pr-12">
                <div className="bg-white text-black p-4 rounded-md">
                  <h3 className="font-bold text-lg mb-2">Launch & Community Growth</h3>
                  <p className="text-sm">
                    Token launch on Solana initial NFT collection minting Airdrop & marketing campaigns Early community development
                  </p>
                </div>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="flex items-center justify-start relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full z-10"></div>
              <div className="w-1/2 pl-12">
                <div className="bg-white text-black p-4 rounded-md">
                  <h3 className="font-bold text-lg mb-2">NFT Marketplace & Game beta</h3>
                  <p className="text-sm">
                    PUFF NFT marketplace launch Play-to-earn game beta release Exchange listings and liquidity expansion
                  </p>
                </div>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="flex items-center justify-end relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full z-10"></div>
              <div className="w-1/2 pr-12">
                <div className="bg-white text-black p-4 rounded-md">
                  <h3 className="font-bold text-lg mb-2">Full game launch & Ex-pansion</h3>
                  <p className="text-sm">
                    Official game launch with NFT integration
                  </p>
                </div>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="flex items-center justify-start relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full z-10"></div>
              <div className="w-1/2 pl-12">
                <div className="bg-white text-black p-4 rounded-md">
                  <h3 className="font-bold text-lg mb-2">PUFF DAO & Ecosystem evolution</h3>
                  <p className="text-sm">
                    Expansion into additional gaming and DeFi applications Cross-chain compatibility exploration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
