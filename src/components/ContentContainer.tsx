
import { FC } from 'react';
import Link from "next/link";
import Text from './Text';
import NavElement from './nav-element';
import { NavBar } from './NavBar';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex-1 drawer h-52 flex-col justify-between">
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="items-center drawer-content flex flex-col justify-between">
        <NavBar />
        {children}
      </div>
      
      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay gap-6"></label>

        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100 gap-10 sm:flex items-center">
          <li>
            <Text variant="heading" className='font-extrabold tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10'>Menu</Text>
          </li>
          <li>
            <NavElement
              label="Home"
              href="/"
            />
          </li>
          <li>
            <NavElement
              label="Mint"
              href="#mint"
            />
          </li>
          <li>
            <NavElement
              label="Roadmap"
              href="#roadmap"
            />
          </li>
          <li>
            <NavElement
              label="FAQ"
              href="#faq"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
