
import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const BuySection: FC = () => {
  const { connected } = useWallet();
  
  return (
    <section id="mint" className="w-full py-16 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-arco mb-8 text-white uppercase">Mint Your Puff Dog NFT</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
          <div className="bg-black p-6 rounded-lg w-full md:w-auto">
            <div className="text-lg font-vag text-gray-400 mb-2">Price</div>
            <div className="text-3xl font-arco text-white mb-4">0.1 SOL</div>
            <div className="text-lg font-vag text-gray-400 mb-2">Total Supply</div>
            <div className="text-3xl font-arco text-white">9,999</div>
          </div>
          
          <div className="bg-black p-6 rounded-lg flex-1">
            <div className="text-lg font-vag text-gray-400 mb-2">Mint Your NFT</div>
            
            {!connected ? (
              <div className="mb-4">
                <WalletMultiButton className="btn bg-gradient-to-r from-purple-600 to-purple-800 border-0 text-white font-vag py-3 px-8 rounded-full mx-auto" />
                <p className="text-gray-400 mt-4 font-vag">Connect your wallet to mint</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <button className="btn text-white font-vag px-4 py-2 bg-gray-700 rounded-lg">-</button>
                  <span className="text-2xl font-arco text-white">1</span>
                  <button className="btn text-white font-vag px-4 py-2 bg-gray-700 rounded-lg">+</button>
                </div>
                
                <button className="btn bg-gradient-to-r from-purple-600 to-purple-800 border-0 text-white font-vag py-3 px-8 rounded-full">
                  Mint Now
                </button>
                
                <p className="text-gray-400 mt-2 font-vag">0/9,999 Minted</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
