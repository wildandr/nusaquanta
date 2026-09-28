// components/Navbar.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
// import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const navbarRef = useRef(null);

  const routes = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/project",
      title: "Work",
    },
    {
      path: "/about",
      title: "About",
    },
  ];
  const pathname = usePathname();

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const directionThreshold = 6;
    let lastScrollTop = Math.max(window.scrollY, 0);
    let latestScrollTop = lastScrollTop;
    let frameId = null;

    const moveNavbar = gsap.quickTo(navbar, "y", {
      duration: 0.4,
      ease: "power2.out",
    });

    const updateNavbar = () => {
      const delta = latestScrollTop - lastScrollTop;

      if (latestScrollTop <= 0) {
        moveNavbar(0);
        lastScrollTop = 0;
      } else if (Math.abs(delta) >= directionThreshold) {
        moveNavbar(delta > 0 ? -100 : 0);
        lastScrollTop = latestScrollTop;
      }

      frameId = null;
    };

    const handleScroll = () => {
      latestScrollTop = Math.max(window.scrollY, 0);

      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateNavbar);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      gsap.killTweensOf(navbar);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 z-[9999] w-full"
      id="navbar"
    >
      <div className=" w-full  z-[9999] bg-black ">
        <header className="header mx-auto p-4  h-[73px]  justify-between flex shadow-smooth-lg shadow-primary px-4 lg:px-9">
          <Link href="/" aria-label="Nusa Quanta home" className="inline-flex items-center">
          <Image
            height={40}
            width={40}
            src="/images/home/main_logo.svg"
            alt="Nusa Quanta Indonesia logo"
            className="h-10 w-10"
          />
          </Link>

          <div
            className={`flex lg:hidden items-center border border-primary ${
              isOpen ? "bg-primary" : "bg-transparent"
            } h-10 w-[50px] rounded-lg justify-center`}
          >
            {/* <RxHamburgerMenu className="h-6 w-6 text-primary" /> */}
            <Hamburger
              easing="ease-in"
              toggled={isOpen}
              toggle={setOpen}
              color={isOpen ? "#000" : "#fff"}
              size={20}
              hideOutline={false}
            />
          </div>

          <div className="hidden lg:flex items-center font-reddit-sans text-[16px]">
            <ul className="flex gap-4">
              {routes.map((route) => (
                <li
                  key={route.path}
                  className={`border  rounded-md px-3 ${
                    pathname === route.path
                      ? "text-primary border-primary"
                      : "text-white border-white"
                  }`}
                >
                  <Link href={route.path} className="">
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="ml-6 rounded-full bg-primary px-5 py-2 font-semibold text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Let&apos;s talk ↗</Link>
          </div>
        </header>
      </div>

      <div className={`w-full mt-3  justify-end ${isOpen ? "flex" : "hidden"}`}>
        {" "}
        <div className="w-[200px] h-full bg-[#1f1f1f]  flex justify-end px-4  shadow-primary rounded-xl shadow-md ">
          <div className=" font-reddit-sans text-[16px] py-8 items-end">
            <ul className="flex flex-col gap-4 ">
              {routes.map((route) => (
                <li
                  key={route.path}
                  className={`border rounded-md px-3 text-right ${
                    pathname === route.path
                      ? "text-primary border-primary"
                      : "text-white border-white"
                  }`}
                >
                  <Link href={route.path} onClick={() => setOpen(false)} className="">
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#contact" onClick={() => setOpen(false)} className="mt-5 block rounded-full bg-primary px-4 py-2 text-center font-semibold text-black">Let&apos;s talk ↗</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
