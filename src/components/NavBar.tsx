
import { FC } from 'react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';

export const NavBar: FC = () => {
  return (
    <div className="navbar flex items-center justify-between py-4 px-6 bg-black text-white">
      <div className="navbar-start">
        <Link href="/" passHref>
          <div className="cursor-pointer flex items-center">
            <Image 
              src="/lovable-uploads/0f8db977-5a82-4431-9e8a-98af137f02c4.png" 
              alt="Puff Dog Logo" 
              width={200} 
              height={70} 
            />
          </div>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="font-vag hover:text-yellow-400">
              HOME
            </Link>
          </li>
          <li>
            <Link href="#mint" className="font-vag hover:text-yellow-400">
              MINT
            </Link>
          </li>
          <li>
            <Link href="#roadmap" className="font-vag hover:text-yellow-400">
              ROADMAP
            </Link>
          </li>
          <li>
            <Link href="#faq" className="font-vag hover:text-yellow-400">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end">
        <WalletMultiButton className="btn rounded-full bg-transparent border border-white hover:bg-gray-800 text-sm px-6 font-vag">
          Connect
        </WalletMultiButton>
      </div>
    </div>
  );
};
