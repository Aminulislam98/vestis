"use client";
import { useState } from "react";
import { ChevronDown, Truck, RotateCcw } from "lucide-react";

export default function ProductInfo({ product }) {
  // ── Track which accordion section is open
  // null = all closed
  const [openSection, setOpenSection] = useState(null);

  // ── Toggle section open or closed
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // ── Build accordion sections from product data
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
    <div className="flex flex-col gap-0 border-t border-border mt-2">
      {/* ── DELIVERY & RETURNS
          Always visible — static info */}
      <div className="py-5 border-b border-border flex flex-col gap-4">
        {/* Free delivery */}
        <div className="flex items-start gap-3">
          <Truck
            size={18}
            strokeWidth={1.75}
            className="text-foreground mt-0.5 shrink-0"
          />
          <div>
            <p className="font-body text-sm font-semibold text-foreground">
              Free UK Delivery
            </p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              On orders over £50. Standard delivery 3-5 working days.
            </p>
          </div>
        </div>

        {/* Free returns */}
        <div className="flex items-start gap-3">
          <RotateCcw
            size={18}
            strokeWidth={1.75}
            className="text-foreground mt-0.5 shrink-0"
          />
          <div>
            <p className="font-body text-sm font-semibold text-foreground">
              Free Returns
            </p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              Return within 30 days for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* ── ACCORDION SECTIONS
          Each one expands and collapses on click
          Content comes from product data */}
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border">
          {/* Section toggle button */}
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between py-4 font-body text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
          >
            {section.title}
            <ChevronDown
              size={16}
              strokeWidth={1.75}
              className={`transition-transform duration-200 ${
                openSection === section.id ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Section content — only visible when open */}
          {openSection === section.id && (
            <div className="pb-4">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
