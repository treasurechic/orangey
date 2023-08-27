import { Icon } from "@iconify/react";
import React from "react";

const services = [
  {
    title: "Security Guaranteed",
    color: "bg-[#2952e3]",
    icon: <Icon icon="simple-icons:fsecure" color="white" fontSize={21} />,
    subtitle: "Security is guaranteed, we always maintain privacy and quality",
  },
  {
    title: "Best Exchange rate",
    color: "bg-[#89845f]",
    icon: <Icon icon="solar:heart-bold-duotone" color="white" fontSize={21} />,
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
  },
  {
    title: "Fastest Transactions",
    color: "bg-[#f84550]",
    icon: <Icon icon="subway:power" color="white" fontSize={21} />,
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ",
  },
];
export const Services = () => {
  return (
    <div className="gradient-bg-services">
      <div className="container flex flex-col lg:flex-row w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-center justify-center md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
              Services that we <br /> continue to improve
            </h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-start">
          {services.map(({ title, color, icon, subtitle }) => (
            <div
              className="flex flex-row items-center justify-start white-glassmorphism p-3 m-2 curso-pointer hover:shadow-xl "
              key={title}
            >
              <div
                className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
              >
                {icon}
              </div>
              <div className="ml-5 flex flex-col flex-1 text-white">
                <h1 className="mt-2 text-lg">{title}</h1>
                <p className="text-white text-sm md:w-9/12">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
