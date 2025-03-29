
import { FC } from 'react';
import Head from 'next/head';
import { useWallet } from '@solana/wallet-adapter-react';
import { Hero } from './components/Hero';
import { NFTShowcase } from './components/NFTShowcase';
import { BuySection } from './components/BuySection';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';

export const PuffView: FC = () => {
  const wallet = useWallet();
  
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <NFTShowcase />
      <BuySection />
      <Roadmap />
      <FAQ />
    </div>
  );
};
