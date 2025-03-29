
import { FC } from 'react';
import { Twitter, Github, MessageCircle, Instagram, Youtube, Globe } from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="py-8 bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 flex justify-center space-x-6">
        <a href="#" className="hover:text-yellow-400">
          <Twitter size={20} />
        </a>
        <a href="#" className="hover:text-yellow-400">
          <Github size={20} />
        </a>
        <a href="#" className="hover:text-yellow-400">
          <MessageCircle size={20} />
        </a>
        <a href="#" className="hover:text-yellow-400">
          <Instagram size={20} />
        </a>
        <a href="#" className="hover:text-yellow-400">
          <Youtube size={20} />
        </a>
        <a href="#" className="hover:text-yellow-400">
          <Globe size={20} />
        </a>
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-400">
        &copy; 2023 Puff Dog NFT Collection. All rights reserved.
      </div>
    </footer>
  );
};
