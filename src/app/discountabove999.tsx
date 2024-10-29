export default function DiscountAbove999() {
  return (
    <section className="flex items-center justify-center bg-black px-8 py-16">
      <div className="container mx-auto flex flex-col items-center gap-8 md:flex-row">
        {/* Image Section */}
        <div className="h-fit md:mt-0 md:w-1/2">
          <img
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/discount-999.png"
            alt="Free Delivery Promotion"
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center md:w-1/2 md:px-4 md:text-left">
          <h2 className="mb-4 text-center text-4xl text-gray-200">
            Take Advantage of Early Access!
          </h2>
          <p className="mb-6 text-center text-lg text-white">
            Shop items worth ₹999 or more and enjoy free delivery! Don’t miss
            out on this exclusive early access to free shipping on your favorite
            products.
          </p>
        </div>
      </div>
    </section>
  );
}
