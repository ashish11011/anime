'use client';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [mobNavOpen, setMobNavOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const navData = [
    { name: 'Home', slug: '/' },
    {
      name: 'Category',
      subMenu: [
        { name: 'Action Figure', slug: '/category/action-figure' },
        { name: 'Miniature', slug: '/category/miniature' },
        { name: 'Bobble Head', slug: '/category/bobble-head' },
        { name: 'Sets', slug: '/category/sets' },
        { name: 'Q Posket', slug: '/category/q-posket' },
        { name: 'Keychain', slug: '/category/keychain' },
        { name: 'Katana', slug: '/category/katana' },
      ],
    },
    {
      name: 'Series',
      subMenu: [
        { name: 'Naruto', slug: '/series/naruto' },
        { name: 'One Piece', slug: '/series/one-piece' },
        { name: 'Demon Slayer', slug: '/series/demon-slayer' },
        { name: 'Dragon Ball', slug: '/series/dragon-ball' },
        { name: 'Marvel', slug: '/series/marvel' },
        { name: 'Jujutsu', slug: '/series/jujutsu' },
        { name: 'Others', slug: '/series/others' },
      ],
    },
    { name: 'Orders', slug: '/orders' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-neutral-950">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 py-6 md:px-8 md:py-6">
        <Link href={'/'} className="h-10 max-h-8 w-auto min-w-14 md:max-h-none">
          <img
            className="h-full w-full object-contain"
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/logo.png"
            alt="Cozzy Corner Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center border-neutral-700 font-medium text-gray-200">
            {navData.map((item, index) => {
              if (item.subMenu) return <NavSubMenu key={index} item={item} />;
              return (
                <li key={index}>
                  <Link
                    href={item.slug}
                    className="cursor-pointer px-4 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-5 md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="flex cursor-pointer items-center justify-center px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base">
              <Link
                href={'/searchproduct'}
                // className="cursor-pointer px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base"
              >
                <Search />
              </Link>
            </li>
            <li className="flex cursor-pointer items-center justify-center px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base">
              <Link
                href={'/cart'}
                // className="cursor-pointer px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base"
              >
                <ShoppingBag />
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={'/searchproduct'}
            className="cursor-pointer px-2 py-1.5 text-sm duration-300 md:px-5 md:text-base"
          >
            <Search color="#ccc" />
          </Link>
          <Link
            href={'/cart'}
            className="cursor-pointer px-2 py-1.5 text-sm duration-300 md:px-5 md:text-base"
          >
            <ShoppingBag color="#ccc" />
          </Link>
          {mobNavOpen ? (
            <X onClick={() => setMobNavOpen(false)} color="#ccc" />
          ) : (
            <Menu onClick={() => setMobNavOpen(true)} color="#ccc" />
          )}
        </div>

        {/* Mobile Menu */}
        {mobNavOpen && (
          <div className="absolute left-0 top-20 flex h-screen w-full items-start bg-black text-white">
            <div className="z-40 flex w-full flex-col px-2 pt-6">
              {navData.map((item, index) => {
                if (!item.subMenu)
                  return (
                    <Link
                      className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-xl"
                      key={index}
                      href={item.slug}
                    >
                      {item.name}
                    </Link>
                  );
                return (
                  <div key={index} className="mb-2">
                    <div
                      className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-xl"
                      onClick={() =>
                        item.subMenu
                          ? setOpenSubMenu((prev) =>
                              prev === item.name ? null : item.name
                            )
                          : setMobNavOpen(false)
                      }
                    >
                      <span>{item.name}</span>
                      {item.subMenu && (
                        <span>
                          {openSubMenu === item.name ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </span>
                      )}
                    </div>
                    {item.subMenu && openSubMenu === item.name && (
                      <div className="bg-neutral-900 pl-4">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.slug}
                            className="block py-2 text-lg hover:bg-neutral-800"
                            onClick={() => setMobNavOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

function NavSubMenu({ item }: any) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsSubMenuOpen(true)}
      onMouseLeave={() => setIsSubMenuOpen(false)}
    >
      <div className="cursor-pointer px-4 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-5 md:text-base">
        {item.name}
      </div>
      {isSubMenuOpen && (
        <ul className="absolute left-0 top-full flex w-48 flex-col bg-neutral-900 shadow-lg">
          {item.subMenu.map((subItem: any, index: number) => (
            <li key={index}>
              <Link
                href={subItem.slug}
                className="block px-4 py-2 text-sm duration-300 hover:bg-neutral-800 md:text-base"
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
