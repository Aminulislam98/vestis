import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="w-full px-6 sm:px-10 xl:px-16 py-14 flex flex-col gap-12">
        {/* ── TOP — Brand + Links + Social */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* ── Brand */}
          <p className="font-heading text-4xl tracking-[0.25em] uppercase text-foreground">
            Vestis
          </p>

          {/* ── Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <Link
              href="/products?gender=mens"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Men
            </Link>
            <Link
              href="/products?gender=womens"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Women
            </Link>
            <Link
              href="/track-order"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Track Order
            </Link>
            <Link
              href="/bag"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Bag
            </Link>
            <Link
              href="/account"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Account
            </Link>
          </div>

          {/* ── Social */}
          <div className="flex items-center gap-5">
            <Link
              href="#"
              aria-label="Facebook"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <FaFacebook size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <RiInstagramFill size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <BsTwitterX size={20} />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="text-foreground hover:opacity-60 transition-opacity"
            >
              <FaYoutube size={20} />
            </Link>
          </div>
        </div>

        {/* ── DIVIDER */}
        <div className="h-px bg-border" />

        {/* ── BOTTOM — Copyright + Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-base text-foreground">
            © {new Date().getFullYear()} Vestis. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="font-body text-base text-foreground hover:opacity-60 transition-opacity"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
