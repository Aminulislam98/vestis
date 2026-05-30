"use client";

import React, { useState } from "react";
import { Check, Plus, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function CreateProductForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [features, setFeatures] = useState([""]);
  const [images, setImages] = useState([{ url: "", isPrimary: true }]);
  const [variants, setVariants] = useState([
    { size: "", stock: 0, colour: null, sku: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // ─── HELPERS ──────────────────────────────────────────────────
  const convertToSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const toGroupId = (text) => convertToSlug(text);
  const randomSuffix = () => Math.random().toString(36).substring(2, 6);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setSlug(convertToSlug(val));
  };

  const totalStock = variants.reduce(
    (sum, v) => sum + (Number(v.stock) || 0),
    0,
  );
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  const getPriceRange = (price) => {
    const p = parseFloat(price);
    if (!p) return "";
    if (p < 50) return "under-50";
    if (p < 100) return "50-100";
    if (p < 150) return "100-150";
    return "150-plus";
  };

  // ─── FEATURES ─────────────────────────────────────────────────
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (i) =>
    setFeatures(features.filter((_, idx) => idx !== i));
  const updateFeature = (i, val) => {
    const updated = [...features];
    updated[i] = val;
    setFeatures(updated);
  };

  // ─── IMAGES ───────────────────────────────────────────────────
  const addImage = () => setImages([...images, { url: "", isPrimary: false }]);
  const removeImage = (i) => setImages(images.filter((_, idx) => idx !== i));
  const updateImage = (i, field, val) => {
    const updated = [...images];
    if (field === "isPrimary") {
      updated.forEach((img) => (img.isPrimary = false));
    }
    updated[i] = { ...updated[i], [field]: val };
    setImages(updated);
  };

  // ─── VARIANTS ─────────────────────────────────────────────────
  const addVariant = () =>
    setVariants([...variants, { size: "", stock: 0, colour: null, sku: "" }]);
  const removeVariant = (i) =>
    setVariants(variants.filter((_, idx) => idx !== i));
  const updateVariant = (i, field, val) => {
    const updated = [...variants];
    updated[i] = {
      ...updated[i],
      [field]: field === "stock" ? (val === "" ? 0 : Number(val)) : val,
    };
    setVariants(updated);
  };

  // ─── SUBMIT ───────────────────────────────────────────────────
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const finalSlug = `${slug}-${randomSuffix()}`;
      const price = parseFloat(formData.get("price")) || 0;
      const originalPrice = parseFloat(formData.get("originalPrice")) || price;
      const salePrice = formData.get("salePrice")
        ? parseFloat(formData.get("salePrice"))
        : null;
      const description = formData.get("description") || "";
      const tagsString = formData.get("tags") || "";
      const tags = tagsString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const gender = formData.get("gender");
      const category = formData.get("category");
      const subcategory = formData.get("subcategory");
      const brand = formData.get("brand");

      const skuBase = convertToSlug(`${brand}-${slug}`)
        .replace(/-/g, "")
        .toUpperCase()
        .substring(0, 10);

      const variantsWithSku = variants.map((v) => ({
        ...v,
        sku: `${skuBase}-${v.size.replace(/\s/g, "")}`,
        colour: null,
      }));

      // ── Images — alt auto set to product name
      const imagesFormatted = images
        .filter((img) => img.url)
        .map((img) => ({
          url: img.url,
          alt: name,
          isPrimary: img.isPrimary,
        }));

      // ── SEO auto generated — no client input needed
      const seoPayload = {
        metaTitle: `${name} | Vestis`,
        metaDescription:
          description.length > 155
            ? description.substring(0, 152) + "..."
            : description,
        canonicalUrl: `/${gender}/${category}/${subcategory}/${finalSlug}`,
        keywords: tags,
      };

      const productPayload = {
        productGroupId: toGroupId(name),
        name,
        slug: finalSlug,
        sku: `${skuBase}-${gender?.toUpperCase()}`,
        brand,
        gender,
        category,
        subcategory,
        colour: null,
        price,
        originalPrice,
        salePrice,
        isOnSale: salePrice !== null,
        currency: "GBP",
        priceRange: getPriceRange(price),
        description,
        material: formData.get("material"),
        fit: formData.get("fit"),
        features: features.filter(Boolean),
        images: imagesFormatted,
        variants: variantsWithSku,
        totalStock,
        lowStockThreshold: parseInt(formData.get("lowStockThreshold")) || 5,
        sizes,
        seo: seoPayload,
        searchKeywords: tags,
        tags,
        relatedProducts: [],
        complementaryProducts: [],
        collectionIds: [],
        rating: 0,
        reviewCount: 0,
        purchaseCount: 0,
        wishlistCount: 0,
        currentViewers: 0,
        recentViewCount: 0,
        shipping: {
          weight: parseFloat(formData.get("weight")) || 0,
          isReturnable: formData.get("isReturnable") === "true",
          returnWindow: parseInt(formData.get("returnWindow")) || 30,
        },
        isFeatured: formData.get("isFeatured") === "true",
        isActive: formData.get("isActive") !== "false",
        isNewArrival: formData.get("isNewArrival") === "true",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // ── TODO: change to production URL when deploying
      const res = await fetch("${process.env.NEXT_PUBLIC_SERVER_URL}/product", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      if (!res.ok) throw new Error("Server error — product not saved");

      const data = await res.json();
      console.log("✅ Product saved:", data);

      toast.success("Product saved!", {
        description: `${name} has been added to the store.`,
      });

      // ── Reset
      setName("");
      setSlug("");
      setFeatures([""]);
      setImages([{ url: "", isPrimary: true }]);
      setVariants([{ size: "", stock: 0, colour: null, sku: "" }]);
      e.target.reset();
    } catch (error) {
      toast.error("Failed to save product", {
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ─── STYLES ───────────────────────────────────────────────────
  const inputCls =
    "w-full bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-white transition-colors";
  const labelCls =
    "block text-base font-semibold text-white uppercase tracking-widest mb-1.5";
  const sectionCls =
    "border border-zinc-800 rounded-xl p-5 flex flex-col gap-4";
  const sectionTitleCls =
    "text-sm font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-3";
  const hintCls = "text-sm text-zinc-400 mt-1";

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* ── HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-wide uppercase text-white">
            Add New Product
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Slug, SKU, alt text and SEO are auto-generated
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ══ LEFT COLUMN ══ */}
            <div className="flex flex-col gap-6">
              {/* ── 1. IDENTITY */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>1. Identity</p>

                <div>
                  <label className={labelCls}>Product Name *</label>
                  <input
                    required
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g. Nike Brush Fleece Pullover Hoodie"
                    className={inputCls}
                  />
                  <p className={hintCls}>Slug + SEO auto-generates from this</p>
                </div>

                {/* ── Slug hidden — sent in payload but not shown to client */}
                <input type="hidden" name="slug" value={slug} />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Brand *</label>
                    <input
                      required
                      name="brand"
                      placeholder="Nike"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Gender *</label>
                    <select required name="gender" className={inputCls}>
                      <option value="">Select</option>
                      <option value="mens">Mens</option>
                      <option value="womens">Womens</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Category *</label>
                    <select required name="category" className={inputCls}>
                      <option value="">Select</option>
                      <option value="tops">Tops</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="shoes">Shoes</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Subcategory *</label>
                    <select required name="subcategory" className={inputCls}>
                      <option value="">Select</option>
                      <option value="hoodies">Hoodies</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="jackets">Jackets</option>
                      <option value="shirts">Shirts</option>
                      <option value="knitwear">Knitwear</option>
                      <option value="sweatshirts">Sweatshirts</option>
                      <option value="joggers">Joggers</option>
                      <option value="trousers">Trousers</option>
                      <option value="shorts">Shorts</option>
                      <option value="trainers">Trainers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Fit</label>
                  <select name="fit" className={inputCls}>
                    <option value="">Select</option>
                    <option value="regular">Regular</option>
                    <option value="slim">Slim</option>
                    <option value="oversized">Oversized</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="wide">Wide</option>
                  </select>
                </div>
              </div>

              {/* ── 2. PRICING */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>2. Pricing</p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Price (£) *</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      name="price"
                      placeholder="74.99"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Original Price (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="originalPrice"
                      placeholder="89.99"
                      className={inputCls}
                    />
                    <p className={hintCls}>
                      "Was £X" crossed out — leave empty if same as price
                    </p>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Sale Price (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="salePrice"
                    placeholder="Leave empty if not on sale"
                    className={inputCls}
                  />
                  <p className={hintCls}>
                    isOnSale auto-sets to true if filled
                  </p>
                </div>
              </div>

              {/* ── 3. DESCRIPTION */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>3. Description & Details</p>

                <div>
                  <label className={labelCls}>Description *</label>
                  <textarea
                    required
                    name="description"
                    rows={4}
                    placeholder="Stay warm in soft brushed fleece. Relaxed fit with kangaroo pocket."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Material</label>
                  <input
                    name="material"
                    placeholder="80% Cotton, 20% Polyester"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Product Features</label>
                  <p className={hintCls}>Bullet points on product page</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {features.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={f}
                          onChange={(e) => updateFeature(i, e.target.value)}
                          placeholder={`Feature ${i + 1} — e.g. Kangaroo pocket`}
                          className={`${inputCls} flex-1`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          disabled={features.length === 1}
                          className="text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
                    >
                      <Plus size={14} /> Add Feature
                    </button>
                  </div>
                </div>
              </div>

              {/* ── 4. IMAGES */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>4. Images</p>
                <p className={hintCls}>
                  Alt text auto-sets to product name — just add URLs
                </p>

                <div className="flex flex-col gap-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 border border-zinc-800 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">
                          Image {i + 1}
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-sm text-white cursor-pointer">
                            <input
                              type="checkbox"
                              checked={img.isPrimary}
                              onChange={() => updateImage(i, "isPrimary", true)}
                              className="accent-white"
                            />
                            Primary
                          </label>
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            disabled={images.length === 1}
                            className="text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-30"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <input
                        value={img.url}
                        onChange={(e) => updateImage(i, "url", e.target.value)}
                        placeholder="https://ik.imagekit.io/..."
                        className={inputCls}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImage}
                    className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
                  >
                    <Plus size={14} /> Add Image
                  </button>
                </div>
              </div>
            </div>

            {/* ══ RIGHT COLUMN ══ */}
            <div className="flex flex-col gap-6">
              {/* ── 5. VARIANTS */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>5. Variants (Size + Stock)</p>
                <p className={hintCls}>
                  Colour assigned later — SKU auto-generated
                </p>

                <div className="flex gap-4 text-sm text-white">
                  <span>
                    Total Stock: <span className="font-bold">{totalStock}</span>
                  </span>
                  <span>
                    Sizes:{" "}
                    <span className="font-bold">{sizes.join(", ") || "—"}</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {variants.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-end gap-2 border border-zinc-800 rounded-lg p-3"
                    >
                      <div className="flex-1">
                        <label className={labelCls}>Size</label>
                        <input
                          value={v.size}
                          onChange={(e) =>
                            updateVariant(i, "size", e.target.value)
                          }
                          placeholder="XS / UK 8"
                          className={inputCls}
                        />
                      </div>
                      <div className="flex-1">
                        <label className={labelCls}>Stock</label>
                        <input
                          type="number"
                          value={v.stock === 0 ? "" : v.stock}
                          onChange={(e) =>
                            updateVariant(i, "stock", e.target.value)
                          }
                          placeholder="0"
                          className={inputCls}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        disabled={variants.length === 1}
                        className="text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-30 mb-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
                  >
                    <Plus size={14} /> Add Variant
                  </button>
                </div>

                <div>
                  <label className={labelCls}>Low Stock Threshold</label>
                  <input
                    type="number"
                    name="lowStockThreshold"
                    defaultValue={5}
                    className={inputCls}
                  />
                  <p className={hintCls}>
                    Shows "Only X left!" badge below this number
                  </p>
                </div>
              </div>

              {/* ── 6. SEARCH & TAGS */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>6. Search & Tags</p>

                <div>
                  <label className={labelCls}>Tags (comma separated) *</label>
                  <input
                    required
                    name="tags"
                    placeholder="hoodie, fleece, nike, mens, winter"
                    className={inputCls}
                  />
                  <p className={hintCls}>
                    Used for search, filtering and SEO keywords — all in one
                  </p>
                </div>
              </div>

              {/* ── 7. FLAGS */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>7. Flags</p>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Featured?</label>
                    <select name="isFeatured" className={inputCls}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Active?</label>
                    <select name="isActive" className={inputCls}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <p className={hintCls}>No = hidden from store</p>
                  </div>
                  <div>
                    <label className={labelCls}>New Arrival?</label>
                    <select name="isNewArrival" className={inputCls}>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                    <p className={hintCls}>"New" badge on card</p>
                  </div>
                </div>
              </div>

              {/* ── 8. SHIPPING */}
              <div className={sectionCls}>
                <p className={sectionTitleCls}>8. Shipping</p>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Weight (kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="weight"
                      placeholder="0.5"
                      className={inputCls}
                    />
                    <p className={hintCls}>For shipping cost</p>
                  </div>
                  <div>
                    <label className={labelCls}>Returnable?</label>
                    <select name="isReturnable" className={inputCls}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Return Window</label>
                    <input
                      type="number"
                      name="returnWindow"
                      defaultValue={30}
                      className={inputCls}
                    />
                    <p className={hintCls}>Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SUBMIT BAR */}
          <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-6">
            <button
              type="reset"
              onClick={() => {
                setName("");
                setSlug("");
                setFeatures([""]);
                setImages([{ url: "", isPrimary: true }]);
                setVariants([{ size: "", stock: 0, colour: null, sku: "" }]);
              }}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw size={14} />
              Reset Form
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg text-sm font-bold hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <Check size={16} />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
