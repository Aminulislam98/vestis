"use client";
import { X } from "lucide-react";

export default function SizeGuide({ onClose }) {
  return (
    <div className="p-6 font-body">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Size Guide</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-border transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Men's Tops */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Men's Tops & Hoodies
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold">Size</th>
              <th className="text-left py-2 px-3 font-semibold">Chest (cm)</th>
              <th className="text-left py-2 px-3 font-semibold">Waist (cm)</th>
              <th className="text-left py-2 px-3 font-semibold">Height (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["XS", "84–88", "70–74", "163–168"],
              ["S", "88–93", "74–79", "168–173"],
              ["M", "93–98", "79–84", "173–178"],
              ["L", "98–104", "84–90", "178–183"],
              ["XL", "104–110", "90–96", "183–188"],
              ["XXL", "110–118", "96–104", "188–193"],
            ].map(([size, chest, waist, height]) => (
              <tr
                key={size}
                className="border-b border-border hover:bg-accent transition-colors"
              >
                <td className="py-2 px-3 font-semibold">{size}</td>
                <td className="py-2 px-3">{chest}</td>
                <td className="py-2 px-3">{waist}</td>
                <td className="py-2 px-3">{height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Men's Bottoms */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Men's Bottoms
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold">Size</th>
              <th className="text-left py-2 px-3 font-semibold">Waist (cm)</th>
              <th className="text-left py-2 px-3 font-semibold">Hip (cm)</th>
              <th className="text-left py-2 px-3 font-semibold">Inseam (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['XS / 28"', "70–74", "88–92", "76"],
              ['S / 30"', "74–79", "92–97", "78"],
              ['M / 32"', "79–84", "97–102", "80"],
              ['L / 34"', "84–90", "102–108", "81"],
              ['XL / 36"', "90–96", "108–114", "82"],
              ['XXL / 38"', "96–104", "114–122", "83"],
            ].map(([size, waist, hip, inseam]) => (
              <tr
                key={size}
                className="border-b border-border hover:bg-accent transition-colors"
              >
                <td className="py-2 px-3 font-semibold">{size}</td>
                <td className="py-2 px-3">{waist}</td>
                <td className="py-2 px-3">{hip}</td>
                <td className="py-2 px-3">{inseam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Women's Tops */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Women's Tops & Hoodies
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold">Size</th>
              <th className="text-left py-2 px-3 font-semibold">Bust (cm)</th>
              <th className="text-left py-2 px-3 font-semibold">Waist (cm)</th>
              <th className="text-left py-2 px-3 font-semibold">Height (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["XS", "78–82", "60–64", "158–163"],
              ["S", "82–87", "64–69", "163–168"],
              ["M", "87–92", "69–74", "168–173"],
              ["L", "92–98", "74–80", "173–178"],
              ["XL", "98–104", "80–86", "178–183"],
              ["XXL", "104–112", "86–94", "183–188"],
            ].map(([size, bust, waist, height]) => (
              <tr
                key={size}
                className="border-b border-border hover:bg-accent transition-colors"
              >
                <td className="py-2 px-3 font-semibold">{size}</td>
                <td className="py-2 px-3">{bust}</td>
                <td className="py-2 px-3">{waist}</td>
                <td className="py-2 px-3">{height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shoes */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Shoes (UK / EU / US)
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold">UK</th>
              <th className="text-left py-2 px-3 font-semibold">EU</th>
              <th className="text-left py-2 px-3 font-semibold">US</th>
              <th className="text-left py-2 px-3 font-semibold">Foot (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["UK 6", "39", "7", "24.5"],
              ["UK 7", "40.5", "8", "25.5"],
              ["UK 8", "42", "9", "26.5"],
              ["UK 9", "43", "10", "27.5"],
              ["UK 10", "44.5", "11", "28.5"],
              ["UK 11", "45.5", "12", "29.5"],
              ["UK 12", "47", "13", "30.5"],
            ].map(([uk, eu, us, foot]) => (
              <tr
                key={uk}
                className="border-b border-border hover:bg-accent transition-colors"
              >
                <td className="py-2 px-3 font-semibold">{uk}</td>
                <td className="py-2 px-3">{eu}</td>
                <td className="py-2 px-3">{us}</td>
                <td className="py-2 px-3">{foot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tip */}
      <div className="bg-accent rounded-xl p-4 text-sm text-muted-foreground">
        Between sizes? Size up for hoodies and oversized fits. Size down for
        slim or athletic fits.
      </div>
    </div>
  );
}
