"use client";

import React, { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function CreateProductForm() {
  // --- STATE MANAGEMENT ---
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [variants, setVariants] = useState([
    { size: "M", colour: "Cream", stock: 10 },
  ]);

  // --- SLUG GENERATION FUNCTION ---
  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // স্পেশাল ক্যারেক্টার মুছে ফেলে
      .replace(/[\s_-]+/g, "-") // স্পেসকে হাইফেন বানায়
      .replace(/^-+|-+$/g, ""); // দুই ধারের বাড়তি ড্যাশ কাটে
  };

  // --- WHEN YOU TYPE IN PRODUCT NAME ---
  const handleNameChange = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    setSlug(convertToSlug(currentName)); // রিয়েল-টাইমে স্লাগ তৈরি হচ্ছে
  };

  // --- DYNAMIC VARIANTS HANDLERS ---
  const addVariant = () => {
    setVariants([...variants, { size: "", colour: "", stock: 0 }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index] = {
      ...updated[index],
      [field]: field === "stock" ? (value === "" ? 0 : Number(value)) : value,
    };
    setVariants(updated);
  };

  // --- FORM SUBMISSION (ম্যাজিক এখানে হচ্ছে) ---
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // 🎲 ১. ৬ অক্ষরের একটি র্যান্ডম আইডি তৈরি করা (যেমন: x9r2m4)
    // প্রোডাকশনে আমাজন বা নাইকির মতো ২ বিলিয়নের বেশি কম্বিনেশন তৈরি করবে এটি
    const randomId = Math.random().toString(36).substring(2, 8);

    // 🔗 ২. অরিজিনাল স্লাগের শেষে আইডিটি জোড়া দেওয়া হচ্ছে
    // যদি ইনপুটে থাকে "nike-hoodie", ডাটাবেজের জন্য তৈরি হবে "nike-hoodie-x9r2m4"
    const finalUniqueSlug = `${slug}-${randomId}`;

    const rawPrice = formData.get("price");
    const rawSalePrice = formData.get("salePrice");
    const imagesString = formData.get("images");
    const tagsString = formData.get("tags");

    const images = imagesString
      ? imagesString
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean)
      : [];
    const tags = tagsString
      ? tagsString
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // চূড়ান্ত অবজেক্ট যা MongoDB-তে সেভ হবে
    const productPayload = {
      name: name,
      slug: finalUniqueSlug, // এখানে আমরা আমাদের ইউনিক স্লাগটি পাঠিয়ে দিচ্ছি
      brand: formData.get("brand")?.toString(),
      category: formData.get("category")?.toString(),
      gender: formData.get("gender")?.toString(),
      price: rawPrice ? parseFloat(rawPrice.toString()) : 0,
      salePrice: rawSalePrice ? parseFloat(rawSalePrice.toString()) : null,
      isOnSale: formData.get("isOnSale") === "true",
      description: formData.get("description")?.toString(),
      material: formData.get("material")?.toString(),
      fit: formData.get("fit")?.toString(),
      images: images,
      tags: tags,
      variants: variants,
      isFeatured: formData.get("isFeatured") === "true",
      isActive: formData.get("isActive") === "true",
      outfitCode: formData.get("outfitCode")?.toString() || null,
    };

    // টেস্ট করার জন্য এলার্ট এবং কনসোল লগ
    alert(`ডাটাবেজের জন্য তৈরি হওয়া ইউনিক স্লাগ:\n${productPayload.slug}`);
    console.log("Ready for MongoDB Submission:", productPayload);
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 min-h-screen">
      <Form
        className="flex w-full max-w-2xl flex-col gap-6 p-6 bg-white rounded-lg shadow-md"
        onSubmit={onSubmit}
      >
        <h2 className="text-xl font-bold border-b pb-2 text-gray-800">
          Add New Product
        </h2>

        {/* --- SECTION 1: IDENTITY & INFORMATION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* প্রোডাক্ট নেম ইনপুট */}
          <TextField isRequired name="name">
            <Label>Product Name</Label>
            <Input
              placeholder="e.g., Nike Brush Fleece Hoodie"
              value={name}
              onChange={handleNameChange}
            />
            <FieldError />
          </TextField>

          {/* স্লাগ ইনপুট (সাবমিট করলে এর শেষে অটো আইডি যুক্ত হবে) */}
          <TextField isRequired name="slug">
            <Label>Slug Preview (Clean)</Label>
            <Input
              placeholder="nike-brush-fleece-hoodie"
              value={slug}
              onChange={(e) => setSlug(convertToSlug(e.target.value))}
            />
            <Description>Unique ID will be added on submit</Description>
            <FieldError />
          </TextField>

          <TextField isRequired name="brand">
            <Label>Brand</Label>
            <Input placeholder="e.g., Nike" />
            <FieldError />
          </TextField>

          <TextField isRequired name="category">
            <Label>Category</Label>
            <Input placeholder="e.g., tops" />
            <FieldError />
          </TextField>

          <TextField isRequired name="gender">
            <Label>Gender</Label>
            <Input placeholder="e.g., mens" />
            <FieldError />
          </TextField>

          <TextField name="fit">
            <Label>Fit Type</Label>
            <Input placeholder="e.g., regular" />
          </TextField>
        </div>

        <TextField name="material">
          <Label>Material Composition</Label>
          <Input placeholder="e.g., 80% Cotton, 20% Polyester" />
        </TextField>

        <TextField name="description">
          <Label>Description</Label>
          <Input placeholder="Stay warm in soft brushed fleece..." />
        </TextField>

        {/* --- SECTION 2: NUMERICS & PRICING --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField isRequired name="price" type="number">
            <Label>Price ($)</Label>
            <Input step="0.01" placeholder="74.99" />
            <FieldError />
          </TextField>

          <TextField name="salePrice" type="number">
            <Label>Sale Price ($)</Label>
            <Input step="0.01" placeholder="Leave empty if not on sale" />
          </TextField>
        </div>

        {/* --- SECTION 3: SYSTEM LOGICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md bg-gray-50">
          <TextField name="isOnSale" defaultValue="false">
            <Label>Is On Sale?</Label>
            <Input placeholder="false" />
          </TextField>

          <TextField name="isFeatured" defaultValue="true">
            <Label>Is Featured?</Label>
            <Input placeholder="true" />
          </TextField>

          <TextField name="isActive" defaultValue="true">
            <Label>Is Active?</Label>
            <Input placeholder="true" />
          </TextField>
        </div>

        <TextField name="outfitCode">
          <Label>Outfit Code (Optional)</Label>
          <Input placeholder="null" />
        </TextField>

        {/* --- SECTION 4: TEXT/LINK-BASED ARRAYS --- */}
        <div className="space-y-4 border-t pt-4">
          <TextField isRequired name="images">
            <Label>Image Links (Comma-Separated)</Label>
            <Input placeholder="https://link1.com, https://link2.com" />
            <FieldError />
          </TextField>

          <TextField isRequired name="tags">
            <Label>Tags (Comma-Separated)</Label>
            <Input placeholder="hoodie, fleece, nike" />
            <FieldError />
          </TextField>
        </div>

        {/* --- SECTION 5: DYNAMIC VARIANTS GENERATOR --- */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between items-center">
            <Label className="font-semibold text-sm">Product Variants</Label>
            <Button
              size="sm"
              variant="secondary"
              type="button"
              onClick={addVariant}
              className="flex gap-1 items-center"
            >
              <Plus size={14} /> Add Variant
            </Button>
          </div>

          {variants.map((variant, index) => (
            <div
              key={index}
              className="flex items-end gap-2 bg-gray-50 p-2 rounded-md border"
            >
              <div className="flex-1">
                <TextField isRequired>
                  <Label className="text-xs text-gray-500">Size</Label>
                  <Input
                    value={variant.size || ""}
                    placeholder="M"
                    onChange={(e) =>
                      updateVariant(index, "size", e.target.value)
                    }
                  />
                </TextField>
              </div>

              <div className="flex-1">
                <TextField isRequired>
                  <Label className="text-xs text-gray-500">Colour</Label>
                  <Input
                    value={variant.colour || ""}
                    placeholder="Cream"
                    onChange={(e) =>
                      updateVariant(index, "colour", e.target.value)
                    }
                  />
                </TextField>
              </div>

              <div className="flex-1">
                <TextField isRequired>
                  <Label className="text-xs text-gray-500">Stock</Label>
                  <Input
                    type="number"
                    value={variant.stock === 0 ? "" : variant.stock.toString()}
                    placeholder="10"
                    onChange={(e) =>
                      updateVariant(index, "stock", e.target.value)
                    }
                  />
                </TextField>
              </div>

              <Button
                isIconOnly
                color="danger"
                variant="light"
                type="button"
                isDisabled={variants.length === 1}
                onClick={() => removeVariant(index)}
                className="mb-1"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex gap-2 border-t pt-4 justify-end">
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              setName("");
              setSlug("");
            }}
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            color="primary"
            className="flex gap-1 items-center"
          >
            <Check size={16} /> Save Product
          </Button>
        </div>
      </Form>
    </div>
  );
}
