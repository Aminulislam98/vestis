"use client";
import { useState } from "react";
import { ChevronDown, Truck, RotateCcw } from "lucide-react";

export default function ProductInfo({ product }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "description",
      title: "Product Description",
      content: product.description,
    },
    {
      id: "material",
      title: "Material & Care",
      content: product.material,
    },
    {
      id: "fit",
      title: "Fit",
      content: `This product has a ${product.fit} fit.`,
    },
    {
      id: "tags",
      title: "Tags",
      content: product.tags?.join(", "),
    },
  ];

  return (
    <div className="flex flex-col gap-0 border-t border-border">
      {/* ── DELIVERY & RETURNS */}
      <div className="py-5 border-b border-border flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Truck
            size={22}
            strokeWidth={1.75}
            className="text-foreground mt-0.5 shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <p className="font-body font-semibold text-base text-foreground">
              Free UK Delivery
            </p>
            <p className="font-body text-base text-muted-foreground">
              On orders over £50. Standard delivery 3–5 working days.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RotateCcw
            size={22}
            strokeWidth={1.75}
            className="text-foreground mt-0.5 shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <p className="font-body font-semibold text-base text-foreground">
              Free Returns
            </p>
            <p className="font-body text-base text-muted-foreground">
              Return within 30 days for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* ── ACCORDION SECTIONS */}
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between py-4 font-body font-semibold text-base text-foreground hover:opacity-70 transition-opacity"
          >
            {section.title}
            <ChevronDown
              size={20}
              strokeWidth={1.75}
              className={`transition-transform duration-200 shrink-0 ${
                openSection === section.id ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === section.id && (
            <div className="pb-5">
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
