export default function NarutoCollection() {
  return (
    <section className="flex items-center justify-center bg-primary/90 px-8 py-16">
      <div className="container mx-auto flex flex-col items-center gap-8 md:flex-row">
        {/* Image Section */}
        <div className="h-fit md:mt-0 md:w-1/2">
          <img
            src="./lanAllNaruto.png" // Replace with your collection image URL
            alt="Naruto Character Collection"
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center md:w-1/2 md:px-4 md:text-left">
          <h2 className="mb-4 text-center text-4xl text-gray-200">
            Explore Our Exclusive Naruto Collection
          </h2>
          <p className="mb-6 text-center text-lg text-white">
            Dive into the world of Naruto with our exclusive collection of
            characters. Celebrate your favorite ninjas and add them to your
            collection today!
          </p>
          <button className="w-fit rounded-lg bg-p-green px-6 py-3 text-lg text-white transition duration-300">
            View More Naruto Characters
          </button>
        </div>
      </div>
    </section>
  );
}
