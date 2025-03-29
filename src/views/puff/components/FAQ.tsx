
import { FC, useState } from 'react';

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem: FC<FAQItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-arco text-lg text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="ml-6 flex-shrink-0">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-2 font-vag text-black">
          {children}
        </div>
      )}
    </div>
  );
};

export const FAQ: FC = () => {
  return (
    <section id="faq" className="w-full py-16 bg-white">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-2 font-vag text-black">Need more information? Please read our</p>
        <h2 className="text-4xl font-arco mb-12 uppercase text-black">FAQs</h2>
        
        <div className="max-w-3xl mx-auto">
          <FAQItem question="What is Puff Dog NFT Collection?">
            <p>
              Puff Dog NFT Collection is a unique series of digital collectibles built on the Solana blockchain. 
              Each NFT represents a unique character in the Puff Dog universe with various traits and attributes.
            </p>
          </FAQItem>
          
          <FAQItem question="Owning a Puff Dog NFT: What it Means?">
            <p>
              Owning a Puff Dog NFT grants you access to exclusive community benefits, game rewards, and future airdrops. 
              It represents your stake in the growing Puff ecosystem.
            </p>
          </FAQItem>
          
          <FAQItem question="Why Mint a Puff Dog NFT?">
            <p>
              Minting a Puff Dog NFT secures your place in our community, provides access to our play-to-earn game, 
              and positions you for future benefits as our ecosystem grows.
            </p>
          </FAQItem>
          
          <FAQItem question="How can I buy a Puff Dog NFT?">
            <p>
              You can mint a Puff Dog NFT directly on our website using a Solana wallet like Phantom. 
              Simply connect your wallet, click the mint button, and confirm the transaction.
            </p>
          </FAQItem>
          
          <FAQItem question="How many NFT's can I own?">
            <p>
              There is no limit to how many Puff Dog NFTs you can own. Each NFT is unique and can provide additional benefits.
            </p>
          </FAQItem>
        </div>
      </div>
    </section>
  );
};
