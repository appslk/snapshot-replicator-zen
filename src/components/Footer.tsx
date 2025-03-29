
import { FC } from 'react';
import { Twitter, Github, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm font-vag">© 2023 Puff Dog NFT Collection. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="https://twitter.com" target="_blank" className="text-white hover:text-yellow-400">
              <Twitter size={24} />
            </Link>
            <Link href="https://discord.com" target="_blank" className="text-white hover:text-yellow-400">
              <Github size={24} />
            </Link>
            <Link href="https://t.me" target="_blank" className="text-white hover:text-yellow-400">
              <MessageCircle size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
