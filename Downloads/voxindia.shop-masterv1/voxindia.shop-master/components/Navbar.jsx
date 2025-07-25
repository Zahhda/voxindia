"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon, HeartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import CartSidebar from "@/components/CartSidebar";

const Navbar = () => {
  const { isSeller, router, user, cartItems } = useAppContext();
  const { openSignIn } = useClerk();

  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const cartCount = Object.values(cartItems || {}).reduce((a, b) => a + b, 0);
  // Dummy wishlist count (hardcoded zero for now)
  const wishlistCount = 0;

  return (
    <>
      <nav
        className="flex items-center justify-between px-6 md:px-16 lg:px-2 py-2 border-b border-gray-300 text-gray-700 font-sans"
        style={{
          fontFamily:
            "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Logo */}
        <Image
          className="cursor-pointer"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
          width={100}
          height={30}
          priority
        />

        {/* Desktop links + seller */}
        <div className="flex items-center gap-6 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition font-medium text-base">
            Linerio
          </Link>
          <Link href="/contact" className="hover:text-gray-900 transition font-medium text-base">
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop right menu */}
        <ul className="hidden md:flex items-center gap-4 ">
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

          {/* Wishlist button */}
          <button
            type="button"
            aria-label="Wishlist (dummy)"
            className="relative text-gray-600 hover:text-red-600 transition focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart button with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative"
            aria-label="Open Cart Sidebar"
          >
            <Image src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-gray-900 transition text-base font-medium"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </ul>

        {/* Mobile menu */}
        <div className="flex items-center md:hidden gap-3">
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}

          {/* Dummy wishlist button on mobile */}
          <button
            type="button"
            aria-label="Wishlist (dummy)"
            className="relative text-gray-600 hover:text-red-600 transition focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-gray-900 transition text-base font-medium"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
