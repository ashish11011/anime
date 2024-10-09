import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [mobNavOpen, setMobNavOpen] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50 bg-black px-4 md:px-8 py-6 md:py-4 items-center flex gap-8 justify-between">
      <Link href={"/"} className="min-w-14 max-h-8 md:max-h-none h-10 w-auto">
        <img
          className="h-full w-full object-contain"
          src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/logo.png"
          alt=""
        />
      </Link>

      <div className="hidden md:block">
        <ul className="border border-neutral-700 rounded-full overflow-hidden text-white flex">
          <Link
            href={"/category/naruto"}
            className="md:text-base px-4 md:px-5 py-1.5 text-sm hover:bg-neutral-800 cursor-pointer duration-300 font-semibold"
          >
            Naruto
          </Link>
          <Link
            href={"/category/anime"}
            className="md:text-base px-4 md:px-5 py-1.5 text-sm hover:bg-neutral-800 cursor-pointer duration-300 font-semibold"
          >
            Anime
          </Link>
          <Link
            href={"/category/posters"}
            className="md:text-base px-4 md:px-5 py-1.5 text-sm hover:bg-neutral-800 cursor-pointer duration-300 font-semibold"
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
        <div className="absolute top-20 left-0 w-full h-screen bg-black text-white flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center z-40 -translate-y-24">
            <Link
              href={"/category/naruto"}
              className="text-xl py-3 hover:bg-neutral-800 w-full text-center"
              onClick={() => setMobNavOpen(false)}
            >
              Naruto
            </Link>
            <Link
              href={"/category/anime"}
              className="text-xl py-3 hover:bg-neutral-800 w-full text-center"
              onClick={() => setMobNavOpen(false)}
            >
              Anime
            </Link>
            <Link
              href={"/category/posters"}
              className="text-xl py-3 hover:bg-neutral-800 w-full text-center"
              onClick={() => setMobNavOpen(false)}
            >
              Posters
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
