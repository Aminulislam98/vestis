import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full">
      {/* Desktop & Tablet — two images side by side */}
      <div className="hidden md:flex w-full h-[88vh]">
        {/* Left image */}
        <div className="relative flex-1 h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Out of office looks"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Text overlay bottom left */}
          <div className="absolute bottom-8 left-8">
            <h1 className="font-heading text-white text-5xl lg:text-7xl leading-none tracking-wide drop-shadow-md">
              OUT OF OFFICE
              <br />
              LOOKS
            </h1>
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex-1 h-full overflow-hidden">
          <Image
            src="https://img.magnific.com/free-photo/full-shot-punk-woman-posing_23-2149267435.jpg?t=st=1779574998~exp=1779578598~hmac=07c287ffae1a32a320470640f7f631f2aab293fa12ac4ae4ebaad0080bc37a69&w=2000"
            alt="Shop new arrivals"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Shop now button bottom right */}
          <div className="absolute bottom-8 right-8">
            <Link
              href="/products?gender=womens"
              className="bg-white text-black font-body font-semibold text-sm tracking-widest uppercase px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile — single image 60vh */}
      <div className="md:hidden relative w-full h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1652453860361-9ce55da944ce?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Out of office looks"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute bottom-6 left-5 right-5">
          <h1 className="font-heading text-white text-4xl leading-none tracking-wide">
            OUT OF OFFICE
            <br />
            LOOKS
          </h1>
          <Link
            href="/shop"
            className="inline-block mt-4 bg-white text-black font-body font-semibold text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-black hover:text-white transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
