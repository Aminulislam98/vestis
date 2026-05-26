"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const name = user?.name;
  const email = user?.email;

  const [activeTab, setActiveTab] = useState("orders");
  const [showPassword, setShowPassword] = useState(false);

  const orders = [
    {
      id: "49201",
      date: "24.05.2026",
      status: "In Transit",
      total: "£149.95",
      name: "Nike Air Max Pulse",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    },
    {
      id: "48110",
      date: "12.04.2026",
      status: "Delivered",
      total: "£114.95",
      name: "Nike Air Zoom Pegasus",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
    },
  ];

  const favorites = [
    {
      name: "Air Max Pulse",
      category: "Men's Shoes",
      price: "£144.95",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
    },
    {
      name: "Nike Tech Fleece",
      category: "Hoodie",
      price: "£109.95",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Header Block */}
        <div className="border-b-2 border-black pb-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
            My Account
          </h1>
          <p className="text-base font-medium text-neutral-500 mt-1">
            {email ? email : ""}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 items-start">
          {/* Navigation Sidebar */}
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 border-neutral-200 pb-2 lg:pb-0 sticky top-6 z-10 bg-white">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 px-4 py-3.5 text-sm tracking-wider uppercase font-black transition-all whitespace-nowrap ${
                activeTab === "orders"
                  ? "bg-black text-white"
                  : "hover:bg-neutral-100"
              }`}
            >
              <ShoppingBag size={16} strokeWidth={2.5} /> Orders (
              {orders.length})
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center gap-3 px-4 py-3.5 text-sm tracking-wider uppercase font-black transition-all whitespace-nowrap ${
                activeTab === "favorites"
                  ? "bg-black text-white"
                  : "hover:bg-neutral-100"
              }`}
            >
              <Heart size={16} strokeWidth={2.5} /> Favorites (
              {favorites.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-4 py-3.5 text-sm tracking-wider uppercase font-black transition-all whitespace-nowrap ${
                activeTab === "settings"
                  ? "bg-black text-white"
                  : "hover:bg-neutral-100"
              }`}
            >
              <Settings size={16} strokeWidth={2.5} /> Account Settings
            </button>

            {/* Proper placement for Sign Out within the list */}
            <button className="flex items-center gap-3 px-4 py-3.5 text-sm tracking-wider uppercase font-black transition-all whitespace-nowrap text-red-600 hover:bg-red-50 mt-0 lg:mt-6 border-l lg:border-l-0 lg:border-t border-neutral-200">
              <LogOut size={16} strokeWidth={2.5} /> Sign Out
            </button>
          </nav>

          {/* Content Area */}
          <div className="lg:col-span-3 min-h-[50vh]">
            {/* TAB: ORDERS */}
            {activeTab === "orders" && (
              <div className="flex flex-col gap-6 animate-fadeIn">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-neutral-200 p-4 md:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 md:gap-6 hover:border-black transition-colors"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      {/* Properly scaled uncropped mobile image frame */}
                      <div className="w-24 h-24 md:w-28 md:h-28 bg-neutral-100 flex-shrink-0 flex items-center justify-center overflow-hidden p-2">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 bg-neutral-100 text-neutral-800 inline-block mb-1">
                          {order.status}
                        </span>
                        <h3 className="text-base md:text-lg font-black tracking-tight uppercase">
                          {order.name}
                        </h3>
                        <p className="text-sm text-neutral-500 mt-0.5">
                          Order #{order.id} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0">
                      <span className="text-base md:text-lg font-black tracking-tight">
                        {order.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: FAVORITES */}
            {activeTab === "favorites" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 animate-fadeIn">
                {favorites.map((item, idx) => (
                  <div key={idx} className="group relative cursor-pointer">
                    {/* Big high contrast container preventing any image cropping */}
                    <div className="aspect-[4/5] bg-neutral-100 flex items-center justify-center p-4 overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                    </div>
                    <div className="flex justify-between items-start gap-4 px-1">
                      <div>
                        <h4 className="text-base font-black tracking-tight uppercase leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-sm text-neutral-500 mt-0.5">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-base font-black tracking-tight whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === "settings" && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="max-w-xl flex flex-col gap-6 animate-fadeIn"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-wider uppercase font-black text-neutral-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue={name.split(" ")[0]}
                      className="h-12 px-4 border border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all text-base font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-wider uppercase font-black text-neutral-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue={name.split(" ")[1]}
                      className="h-12 px-4 border border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all text-base font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-wider uppercase font-black text-neutral-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={email}
                    className="h-12 px-4 border border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all text-base font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 bg-black text-white text-sm tracking-widest uppercase font-black hover:opacity-85 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
                >
                  Save Changes <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
