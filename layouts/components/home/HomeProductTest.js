"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductSection from "./modules/product/ProductSection";

gsap.registerPlugin(ScrollTrigger);

export default function HomeProduct() {
  const scroller = useRef();

  const sections = [
    {
      title: "Product Vision, Development, & Deployment",
      description:
        "Navigate the trajectory of your ideas from conception to realization with precision and creativity. Our holistic approach ensures that every phase of product development is not just executed, but meticulously crafted to meet and exceed market demands.",
      services: [
        { name: "UI UX Design", link: "" },
        { name: "Mobile App Development", link: "" },
        { name: "Website App Development", link: "" },
        { name: "Quality Assurance", link: "" },
        { name: "IoT Device Development", link: "" },
      ],
    },
    {
      title: "Modernization, Digitalization, & Cloud Enablement",
      description:
        "Embrace the future today by transforming your business operations with our cutting-edge modernization and digitalization strategies. Leverage our cloud enablement services to unlock new levels of efficiency and scalability, propelling your business into a new era of competitiveness.",
      services: [
        { name: "Digital Transformation Consulting", link: "" },
        { name: "Legacy System Modernization", link: "" },
        { name: "Cloud Migration Strategy", link: "" },
        { name: "IoT and Edge Computing Solutions", link: "" },
      ],
    },
    {
      title: "Data, Analytics, & Artificial Intelligence",
      description:
        "Turn data into your most valuable asset with our comprehensive analytics and AI solutions that promise not only insights but foresight. Harness the power of intelligent data analysis to make informed decisions that drive your business forward.",
      services: [
        { name: "Business Intelligence Solutions", link: "" },
        { name: "AI-driven Automation", link: "" },
        { name: "Machine Learning Development", link: "" },
        { name: "Data Analytics & Dashboard", link: "" },
      ],
    },
    {
      title: "Product Maintenance, Evolution, & Optimization",
      description:
        "Ensure your products stand the test of time through continuous enhancement and rigorous optimization strategies. Our dedicated maintenance programs are designed to evolve your offerings, keeping them relevant and performing at their peak in the ever-changing market landscape.",
      services: [
        { name: "Continuous Integration and Deployment (CI/CD)", link: "" },
        { name: "Predictive Maintenance & Lifecycle Management", link: "" },
        { name: "Performance Tuning and Optimization", link: "" },
        { name: "Feature Updates and Upgrades", link: "" },
        { name: "User Feedback and Product Adaptation", link: "" },
        { name: "Testing Automation", link: "" },
      ],
    },
  ];

  useEffect(() => {
    console.clear();

    const panels = gsap.utils.toArray(".panel");

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top 30%",
        end: "bottom ",
        markers:true,
        pin: true,
        scrub: true,
        onEnter: () => gsap.to(panel, { opacity: 1, duration: 1 }),
        onLeave: () => gsap.to(panel, { opacity: 0, duration: 0 }),
        onEnterBack: () => gsap.to(panel, { opacity: 1, duration: 1 }),
        onLeaveBack: () => gsap.to(panel, { opacity: 0, duration: 1 }),
      });

      gsap.set(panel, { opacity: 0 }); // Set initial opacity to 0
    });

    ScrollTrigger.create({
      trigger: scroller.current,
      pin: true,
      anticipatePin: 1,

      start: "top top",
      end: "+=" + 100 * (panels.length - 3) + "%",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={scroller}
        className="flex flex-col w-full items-center h-[100vh] py-10 overflow-hidden font-reddit-sans px-10"
      >
        <div className="flex flex-col items-center">
          <div className="lg:inline-flex items-center mt-2">
            <span className="text-white text-[24px] lg:text-[40px] font-bold lg:px-2">
              Empowering
            </span>
            <span className="text-black text-[24px] lg:text-[40px] font-bold ml-1 box-decoration-slice px-2 bg-primary">
              Innovation:
            </span>
          </div>
          <p className="font-medium text-[32px] mt-2">
            Shaping the Future of Product Excellence
          </p>
        </div>

        {sections.map((section, index) => (
          <ProductSection
            key={index}
            title={section.title}
            description={section.description}
            services={section.services}
            className={`panel ${index === 0 ? "description panel" : ""}`}
          />
        ))}
      </div>
      <div className="h-[100vh]"></div>
    </>
  );
}
