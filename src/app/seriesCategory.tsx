import CategoryCard from '@/components/categoryCard';

export default function SeriesCategorySection({ seriesCategoryData }: any) {
  return (
    <div className="flex flex-col items-center gap-10 bg-primary/90 py-12">
      <p className="text-5xl font-medium text-white">All Series</p>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-4">
        {seriesCategoryData.map((category: any, index: any) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
