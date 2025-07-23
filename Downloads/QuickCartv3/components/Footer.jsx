import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Image src={assets.logo} alt="VOX Logo" width={80} height={40} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Premium slatted wall and ceiling panels for modern interiors.
          </p>
          <div className="flex space-x-4 mt-4 text-gray-600">
            {/* Placeholder icons, replace href with real links */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-red-700">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-red-700">IG</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-red-700">TW</a>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products/s-line" className="hover:underline">S-Line</Link>
            </li>
            <li>
              <Link href="/products/m-line" className="hover:underline">M-Line</Link>
            </li>
            <li>
              <Link href="/products/l-line" className="hover:underline">L-Line</Link>
            </li>
            <li>
              <Link href="/products/accessories" className="hover:underline">Accessories</Link>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/cookies-policy" className="hover:underline">Cookies Policy</Link>
            </li>
            <li>
              <Link href="/returns-cancellation" className="hover:underline">Returns &amp; Cancellation</Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link>
            </li>
            <li>
              <Link href="/warranty-policy" className="hover:underline">Warranty Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <address className="not-italic text-sm space-y-2">
            <p>1202, 100-ft Rd</p>
            <p>Indiranagar</p>
            <p>Bengaluru, KA-560008</p>
            <p>+91 9528-500-500</p>
            <p>
              <a href="mailto:customercare@voxindia.co" className="hover:underline">
                customercare@voxindia.co
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
        © 2025 VOX Interior and Exterior Solutions Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
