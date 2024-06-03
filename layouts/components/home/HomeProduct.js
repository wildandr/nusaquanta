import ProductSection from "./modules/product/ProductSection";

export default function HomeProduct() {
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
    return (
        <div
        className="flex flex-col w-full items-center  py-10 overflow-hidden font-reddit-sans px-10"
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
        <div className="flex">
        <svg width="66" height="643" viewBox="0 0 66 643" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_489_3383)">
<path d="M13 630.5V504.5C13 493.454 21.9543 484.5 33 484.5V484.5C44.0457 484.5 53 475.546 53 464.5V289.892C53 278.846 44.0457 269.892 33 269.892V269.892C21.9543 269.892 13 260.938 13 249.892V12" stroke="#B8E930"/>
</g>
<defs>
<filter id="filter0_d_489_3383" x="0.5" y="0" width="65" height="642.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.721569 0 0 0 0 0.913725 0 0 0 0 0.188235 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_489_3383"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_489_3383" result="shape"/>
</filter>
</defs>
</svg>
<div>

        {sections.map((section, index) => (
          <ProductSection
            key={index}
            title={section.title}
            description={section.description}
            services={section.services}
            className={`panel `}
          />
        ))}
      </div>
      </div>
      </div>
    );
}