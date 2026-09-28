import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons
import { Si99Designs } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import Image from "next/image";
import ContactForm from "@partials/ContactForm";

export default function Footer() {
  const icons = [
    FaInstagram, // Settings icon
    FaLinkedin,
    FaGithub,
    FaSquareXTwitter,
    Si99Designs,
    // Add more icons as needed
  ];

  return (
    <div>
      <footer className="footer lg:container lg:mx-auto mt-8">
        <div className="flex">
          <div className="footer-content w-full">
            <div className="flex flex-col px-4 lg:px-0 mx-auto lg:relative">
              <div className="lg:absolute lg:w-full lg:h-full  lg:justify-center lg:flex">
                <div className="py-8 lg:py-0 max-w-sm items-center w-full">
                  <ContactForm />
                </div>
              </div>

              <div className=" max-w-sm lg:my-6">
                <div className=" py-2 flex items-center">
                  <Image
                    src="/images/home/ornamen_bintang.svg"
                    alt="ornamen"
                    width={1000}
                    height={1000}
                    className="w-[40px] h-[40px]"
                  />
                  <p className="text-[40px] text-primary font-700 ml-2">
                    Nusa Quanta
                  </p>
                </div>

                <div className=" py-6 flex items-center">
                  {icons.map((Icon, index) => (
                    <div
                      key={index}
                      className="rounded-full overflow-hidden border bg-black border-gray-300 w-[48px] h-[48px] flex items-center justify-center mr-2"
                    >
                      <Icon className="w-[20px] h-[20px] " />{" "}
                      {/* Render each icon */}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col py-6 gap-2">
                  <p className="font-reddit-sans text-justify text-[16px] font-500">
                    Sleman Regency Special Region <br></br> of Yogyakarta,
                    Indonesia
                  </p>
                  <a
                    href="mailto:hello@nusaquanta.tech"
                    className="font-reddit-sans text-[16px] font-500 text-primary flex items-center gap-2 w-fit hover:underline"
                  >
                    <FaEnvelope className="w-[16px] h-[16px]" />
                    hello@nusaquanta.tech
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full ">
              <p className="text-[8px] font-500 py-4 font-reddit-sans lg:text-[16px]">
                COPYRIGHT&copy; {new Date().getFullYear()} by Nusa Quanta All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
