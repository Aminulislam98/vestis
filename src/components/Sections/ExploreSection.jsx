import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Women's Tops",
    href: "/products?gender=womens&subcategory=tops",
    image:
      "https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tie-dye-smocked-blouse--FVTP07708626_PM2_Front%20view.png?wid=4096&hei=4096",
    position: "object-top",
  },
  {
    id: 2,
    title: "Women's Bottoms",
    href: "/products?gender=womens&subcategory=trousers",
    image:
      "https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-signature-sequin-jeans--FVPB11GOW610_PM1_Cropped%20view.png?wid=4096&hei=4096",
    position: "object-center",
  },
  {
    id: 3,
    title: "Women's Shoes",
    href: "/products?gender=womens&category=shoes",
    image:
      "https://images.unsplash.com/photo-1698609467326-fab7045d773c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "object-center",
  },
  {
    id: 4,
    title: "Women's Hoodies",
    href: "/products?gender=womens&subcategory=hoodies",
    image:
      "https://tommy-europe.scene7.com/is/image/TommyEurope/WW0WW31998_YBR_main?wid=781&fmt=jpeg&qlt=95%2C1&op_sharpen=0&resMode=sharp2&op_usm=1.5%2C.5%2C0%2C0&iccEmbed=0&printRes=72",
    position: "object-top",
  },
  {
    id: 5,
    title: "Men's Tops",
    href: "/products?gender=mens&subcategory=tshirts",
    image:
      "https://tommy-europe.scene7.com/is/image/TommyEurope/DM0DM23253_BDS_main?wid=781&fmt=jpeg&qlt=95%2C1&op_sharpen=0&resMode=sharp2&op_usm=1.5%2C.5%2C0%2C0&iccEmbed=0&printRes=72",
    position: "object-top",
  },
  {
    id: 6,
    title: "Men's Bottoms",
    href: "/products?gender=mens&subcategory=joggers",
    image:
      "https://static.zara.net/assets/public/7125/93b4/02db439aac9c/567a92dbbf42/00761419809-p/00761419809-p.jpg?ts=1774005719797&w=2048",
    position: "object-center",
  },
  {
    id: 7,
    title: "Men's Shoes",
    href: "/products?gender=mens&category=shoes",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "object-center",
  },
  {
    id: 8,
    title: "Men's Hoodies",
    href: "/products?gender=mens&subcategory=hoodies",
    image:
      "https://images.canadagoose.com/image/upload/w_1844,c_scale,f_auto,q_auto/v1762279358/product-image/1539UCD1_9082_fsph.jpg",
    position: "object-center",
  },
];

export default function ExploreSection() {
  return (
    <section className="w-full py-10 sm:px-6 md:px-20 bg-background">
      {/* Title */}
      <div className="text-center mb-8 md:mb-12">
        <h2
          className="font-heading text-foreground leading-tight tracking-wide uppercase"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
        >
          Explore Our Collections
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.href} className="group block">
            {/* ── Image container
                hover → image darkens + title appears in centre */}
            <div className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5] bg-muted">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className={`
                  object-cover ${cat.position}
                  transition-all duration-500
                  group-hover:scale-105 group-hover:brightness-50
                `}
                quality={95}
                priority
              />

              {/* ── Hover overlay — title inside card, desktop only */}
              <div
                className="
                absolute inset-0
                hidden lg:flex flex-col items-center justify-center gap-3
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
              >
                {/* Category name */}
                <p
                  className="font-heading text-white text-center uppercase tracking-widest px-4"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}
                >
                  {cat.title}
                </p>

                {/* CTA */}
                <span
                  className="
                  font-body text-xs text-white uppercase tracking-widest
                  border-b border-white pb-0.5
                "
                >
                  Shop Now
                </span>
              </div>
            </div>

            {/* ── Title below image — mobile only, hidden on desktop hover */}
            <div className="pt-3 pb-1 px-2 sm:px-0 lg:hidden">
              <p
                className="font-body font-medium text-foreground text-center leading-snug"
                style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
              >
                {cat.title}
              </p>
            </div>

            {/* ── Desktop title below — shows when not hovering */}
            <div className="hidden lg:block pt-3 pb-1">
              <p
                className="font-body font-medium text-foreground text-center leading-snug
                  group-hover:opacity-0 transition-opacity duration-300"
                style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
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
