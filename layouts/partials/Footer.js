import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"; // Import icons from react-icons
import { Si99Designs } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import Image from "next/image";

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
            <div className="flex flex-col border border-red-600 px-4 lg:px-0 mx-auto lg:relative">
              <div className="lg:absolute lg:w-full lg:h-full border border-blue-500 lg:justify-center lg:flex">
                <div className="border py-8 lg:py-0 max-w-sm items-center ">
                  <p className="font-reddit-sans text-[12px] text-center lg:text-xl">
                    GET IN TOUCH
                  </p>
                  <div className="flex flex-row mt-8">
                    <div className="flex-[50%] border border-primary font-reddit-sans  rounded-[16px] mr-2">
                      <input
                        type="text"
                        className="w-full p-4 h-full focus:outline-none bg-transparent"
                        placeholder="Enter text..."
                      />
                    </div>
                    <div className="flex-[50%] border border-primary font-reddit-sans  rounded-[16px] ml-2">
                      <input
                        type="text"
                        className="w-full p-4 h-full focus:outline-none bg-transparent"
                        placeholder="Enter text..."
                      />
                    </div>
                  </div>

                  <div className=" border border-primary font-reddit-sans  rounded-[16px] mt-4 ">
                    <input
                      type="text"
                      className="w-full px-4 py-12 h-full focus:outline-none bg-transparent"
                      placeholder="Enter text..."
                    />
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-primary text-black font-reddit-sans rounded-[16px] mr-2 mb-2">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border max-w-sm lg:my-6">
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

                <div className="border py-6 flex items-center">
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

                <div className="flex flex-col py-6">
                  <p className="font-reddit-sans text-justify text-[16px] font-500">
                    Sleman Regency Special Region <br></br> of Yogyakarta,
                    Indonesia
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full border">
              <p className="text-[8px] font-500 py-4 font-reddit-sans lg:text-[16px]">
                COPYRIGHT&copy; 2024 by Nusa Quanta All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
