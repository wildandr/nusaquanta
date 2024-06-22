import Link from "next/link";

const ProductSection = ({ title, description, services }) => {
  return (
    <section className="w-full flex flex-col lg:flex-row justify-between gap-5 lg:gap-0  panel relative py-10 px-3 lg:px-20">
      <div className="max-w-4xl flex flex-col justify-end">
        <h1 className="text-[24px] lg:text-[64px] font-bold text-primary">
          {title}
        </h1>
        <p className="max-w-[44rem] text-[12px] pr-4 lg:px-0">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-4 ">
        <p className="text-[16px] font-medium">PRODUCT SERVICES</p>
        <div className="flex flex-col gap-4 ">
          {services.map((service, index) => (
            <Link key={index} href={service.link}>
              <p className=" lg:text-[24px] text-primary font-bold hover:font-semibold transition duration-300 ease-in-out transform delay-75 hover:scale-125 hover:shadow-primary hover:[text-shadow:_0_1px_10px_var(--tw-shadow-color)]">
                {service.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
