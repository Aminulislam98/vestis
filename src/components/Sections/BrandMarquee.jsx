import Marquee from "react-fast-marquee";

const brands = [
  { name: "NIKE" },
  { name: "·" },
  { name: "ZARA" },
  { name: "·" },
  { name: "H&M" },
  { name: "·" },
  { name: "ADIDAS" },
  { name: "·" },
  { name: "GUCCI" },
  { name: "·" },
  { name: "PUMA" },
  { name: "·" },
  { name: "CALVIN KLEIN" },
  { name: "·" },
  { name: "TOMMY HILFIGER" },
  { name: "·" },
  { name: "RALPH LAUREN" },
  { name: "·" },
  { name: "ARMANI" },
  { name: "·" },
  { name: "VERSACE" },
  { name: "·" },
  { name: "BALENCIAGA" },
  { name: "·" },
  { name: "BURBERRY" },
  { name: "·" },
  { name: "DIOR" },
  { name: "·" },
  { name: "FENDI" },
  { name: "·" },
];

export default function BrandMarquee() {
  return (
    <section className="w-full  h-14 flex items-center overflow-hidden hidden sm:flex">
      <Marquee speed={25} gradient={false} pauseOnHover>
        {brands.map((brand, index) => (
          <span
            key={index}
            className={`
              font-heading text-lg tracking-widest cursor-default mx-4
              ${
                brand.name === "·"
                  ? "text-foreground/20"
                  : "text-foreground/40 hover:text-foreground/80 transition-colors duration-300"
              }
            `}
          >
            {brand.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
