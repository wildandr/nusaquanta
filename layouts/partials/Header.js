"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
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
    let scrollbarTimer = null;

    const moveNavbar = gsap.quickTo(navbar, "y", {
      duration: 0.4,
      ease: "power2.out",
    });
    if (isOpen) moveNavbar(0);

    const updateNavbar = () => {
      const delta = latestScrollTop - lastScrollTop;

      if (isOpen || latestScrollTop <= 0) {
        moveNavbar(0);
        lastScrollTop = latestScrollTop;
      } else if (Math.abs(delta) >= directionThreshold) {
        moveNavbar(delta > 0 ? -100 : 0);
        lastScrollTop = latestScrollTop;
      }

      frameId = null;
    };

    const handleScroll = () => {
      latestScrollTop = Math.max(window.scrollY, 0);
      document.documentElement.classList.add("is-scrolling");
      window.clearTimeout(scrollbarTimer);
      scrollbarTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 900);

      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateNavbar);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.clearTimeout(scrollbarTimer);
      document.documentElement.classList.remove("is-scrolling");
      gsap.killTweensOf(navbar);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full ${isOpen ? "z-[10001]" : "z-[9999]"}`}
      id="navbar"
    >
      <div className="w-full border-b border-primary/40 bg-black/95 backdrop-blur-md">
        <header className="header mx-auto flex h-[73px] max-w-[1600px] items-center justify-between px-5 lg:px-9">
          <Link href="/" aria-label="Nusa Quanta home" className="inline-flex items-center">
          <Image
            height={40}
            width={40}
            src="/images/home/main_logo.svg"
            alt="Nusa Quanta Indonesia logo"
            className="h-10 w-10"
          />
          </Link>

          <div className={`flex h-11 w-12 items-center justify-center rounded-lg border transition-colors lg:hidden ${isOpen ? "border-primary bg-primary" : "border-primary/70 bg-[#171b13]"}`}>
            <Hamburger
              easing="ease-in"
              toggled={isOpen}
              toggle={setOpen}
              color={isOpen ? "#000" : "#b8e930"}
              size={20}
              hideOutline={false}
              label={isOpen ? "Close navigation" : "Open navigation"}
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

      {isOpen && <div className="absolute inset-x-3 top-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-primary/50 bg-[#11150f] p-5 shadow-[0_24px_70px_rgba(0,0,0,.65)] lg:hidden">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[.24em] text-primary/70">Navigate / Nusa Quanta</p>
        <ul>
          {routes.map((route, index) => (
            <li key={route.path} className="border-t border-white/15">
              <Link href={route.path} onClick={() => setOpen(false)} aria-current={pathname === route.path ? "page" : undefined} className={`flex min-h-16 items-center justify-between gap-4 py-3 text-2xl font-semibold tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${pathname === route.path ? "text-primary" : "text-white hover:text-primary"}`}>
                <span>{route.title}</span><span className="text-xs font-medium tracking-widest text-primary/65">0{index + 1} ↗</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/#contact" onClick={() => setOpen(false)} className="mt-5 flex min-h-12 items-center justify-between rounded-full bg-primary px-5 font-semibold text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Let&apos;s talk <span>↗</span></Link>
      </div>}
    </nav>
  );
};

export default Header;
