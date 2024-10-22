import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CategoryCard({ category }: any) {
  return (
    <Link
      href={category.slug}
      className="group flex w-full cursor-pointer flex-col gap-3 overflow-hidden rounded-lg border border-gray-500 p-3"
    >
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src={category.image}
          className="w-full duration-200 group-hover:scale-105"
          alt=""
        />
      </div>
      <div className="flex items-center gap-2 px-2 text-xl font-semibold text-white duration-200 group-hover:gap-4">
        {category.name} <ArrowRight className="mt-1" size={20} />
      </div>
      <div className="h-4"></div>
    </Link>
  );
}
