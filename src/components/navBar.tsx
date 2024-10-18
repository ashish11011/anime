import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [mobNavOpen, setMobNavOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-neutral-950">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 py-6 md:px-8 md:py-6">
        <Link href={'/'} className="h-10 max-h-8 w-auto min-w-14 md:max-h-none">
          <img
            className="h-full w-full object-contain"
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/logo.png"
            alt=""
          />
        </Link>

        <div className="hidden md:block">
          <ul className="flex overflow-hidden rounded-full border border-neutral-700 text-white">
            <Link
              href={'/category/naruto'}
              className="cursor-pointer px-4 py-1.5 text-sm font-semibold duration-300 hover:bg-neutral-800 md:px-5 md:text-base"
            >
              Naruto
            </Link>
            <Link
              href={'/category/anime'}
              className="cursor-pointer px-4 py-1.5 text-sm font-semibold duration-300 hover:bg-neutral-800 md:px-5 md:text-base"
            >
              Anime
            </Link>
            <Link
              href={'/category/posters'}
              className="cursor-pointer px-4 py-1.5 text-sm font-semibold duration-300 hover:bg-neutral-800 md:px-5 md:text-base"
            >
              Posters
            </Link>
          </ul>
        </div>

        <div className="block md:hidden">
          {mobNavOpen ? (
            <X onClick={() => setMobNavOpen(false)} color="#ccc" />
          ) : (
            <Menu onClick={() => setMobNavOpen(true)} color="#ccc" />
          )}
        </div>

        {mobNavOpen && (
          <div className="absolute left-0 top-20 flex h-screen w-full items-center justify-center bg-black text-white">
            <div className="z-40 flex -translate-y-24 flex-col items-center justify-center">
              <Link
                href={'/category/naruto'}
                className="w-full py-3 text-center text-xl hover:bg-neutral-800"
                onClick={() => setMobNavOpen(false)}
              >
                Naruto
              </Link>
              <Link
                href={'/category/anime'}
                className="w-full py-3 text-center text-xl hover:bg-neutral-800"
                onClick={() => setMobNavOpen(false)}
              >
                Anime
              </Link>
              <Link
                href={'/category/posters'}
                className="w-full py-3 text-center text-xl hover:bg-neutral-800"
                onClick={() => setMobNavOpen(false)}
              >
                Posters
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
