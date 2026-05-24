import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Women's Tops",
    slug: "womens-tops",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=95",
    position: "object-top",
  },
  {
    id: 2,
    title: "Women's Bottoms",
    slug: "womens-bottoms",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=95",
    position: "object-center",
  },
  {
    id: 3,
    title: "Women's Shoes",
    slug: "womens-shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=95",
    position: "object-center",
  },
  {
    id: 4,
    title: "Women's Accessories",
    slug: "womens-accessories",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=95",
    position: "object-top",
  },
  {
    id: 5,
    title: "Men's Tops",
    slug: "mens-tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=95",
    position: "object-top",
  },
  {
    id: 6,
    title: "Men's Bottoms",
    slug: "mens-bottoms",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=95",
    position: "object-center",
  },
  {
    id: 7,
    title: "Men's Shoes",
    slug: "mens-shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=95",
    position: "object-center",
  },
  {
    id: 8,
    title: "Men's Accessories",
    slug: "mens-accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=95",
    position: "object-center",
  },
];

export default function ExploreSection() {
  return (
    <section className="w-full py-10 sm:px-6 md:px-20 bg-background">
      {/* Title */}
      <div className="text-center mb-8 md:mb-12">
        <h2
          className="font-logo text-foreground leading-tight font-semibold tracking-normal"
          style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
        >
          Explore a Selection of Our
          <br />
          Collections
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group block"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5] bg-muted">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className={`object-cover ${cat.position} transition-transform duration-500 group-hover:scale-105`}
                quality={95}
                priority
              />
            </div>

            {/* Title */}
            <div className="pt-3 pb-1 px-2 sm:px-0">
              <p
                className="font-body font-medium text-foreground text-center leading-snug"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1rem)" }}
              >
                {cat.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
