// components/Navbar.js
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Head from "next/head";
import Image from "next/image";
// import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const routes = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/project",
      title: "Project",
    },
  ];
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scroll down
        gsap.to(navbar, { y: -100, duration: 0.5 });
      } else {
        // Scroll up
        gsap.to(navbar, { y: 0, duration: 0.5 });
      }
      lastScrollTop = scrollTop;
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-[9999] w-full" id="navbar">
      <div className=" w-full  z-[9999] bg-black ">
        <header className="header mx-auto p-4  h-[73px]  justify-between flex shadow-smooth-lg shadow-primary px-4 lg:px-9">
          <Image
            height={40}
            width={40}
            src="/images/home/main_logo.svg"
            className="h-10 w-10"
          />

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
          </div>
        </header>
      </div>

      <div className={`w-full mt-3  justify-end ${isOpen ? "flex" : "hidden"}`}>
        {" "}
        //Please make when enter fade in from right
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
                  <Link href={route.path} className="">
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
