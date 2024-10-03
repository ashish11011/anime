import Link from "next/link";

const NavBar = () => {
  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-4 items-center  flex gap-8 justify-between">
      <Link href={"/"} className=" min-w-14 max-h-8 md:max-h-none h-10 w-auto">
        <img className="h-full w-full object-contain" src="./logo.png" alt="" />
      </Link>
      <div className="">
        <ul className=" border border-neutral-700 rounded-full overflow-hidden text-white flex">
          <Link
            href={"/category/naruto"}
            className=" md:text-base px-4 md:px-5 py-1.5 text-sm hover:bg-neutral-800 cursor-pointer duration-300 font-semibold "
          >
            Naruto
          </Link>
          <Link
            href={"/category/anime"}
            className=" md:text-base px-4 md:px-5 py-1.5 text-sm hover:bg-neutral-800 cursor-pointer duration-300 font-semibold "
          >
            Anime
          </Link>
          <Link
            href={"/category/posters"}
            className=" md:text-base px-4 md:px-5 py-1.5 text-sm hover:bg-neutral-800 cursor-pointer duration-300 font-semibold "
          >
            Posters
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
