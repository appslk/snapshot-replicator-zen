
import { FC } from 'react';

export const Roadmap: FC = () => {
  return (
    <section id="roadmap" className="w-full py-16 bg-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-arco mb-12 text-white uppercase">Roadmap</h2>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-xl font-arco mb-4 text-yellow-400">Phase 1</div>
            <ul className="text-white font-vag text-left space-y-2">
              <li>• Website Launch</li>
              <li>• Social Media Setup</li>
              <li>• Community Building</li>
              <li>• NFT Art Creation</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-xl font-arco mb-4 text-yellow-400">Phase 2</div>
            <ul className="text-white font-vag text-left space-y-2">
              <li>• NFT Launch</li>
              <li>• Token Launch</li>
              <li>• Exchange Listings</li>
              <li>• Marketing Campaign</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-xl font-arco mb-4 text-yellow-400">Phase 3</div>
            <ul className="text-white font-vag text-left space-y-2">
              <li>• Play-to-Earn Game Beta</li>
              <li>• NFT Staking</li>
              <li>• Partnerships</li>
              <li>• Ecosystem Expansion</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-xl font-arco mb-4 text-yellow-400">Phase 4</div>
            <ul className="text-white font-vag text-left space-y-2">
              <li>• Metaverse Integration</li>
              <li>• Mobile App Launch</li>
              <li>• Cross-Chain Expansion</li>
              <li>• Global Adoption Push</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
