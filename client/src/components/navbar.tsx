import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "./logo";

const navLinks = ["Market", "Exchange", "Tutorials", "Wallet"];

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="container flex justify-between items-center py-4">
      <Logo />
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navLinks.map((title) => (
          <li className="mx-4 cursor-pointer" key={title}>
            {title}
          </li>
        ))}
        <li className="py-2 px-7 mx-4 btn btn-blue">Login</li>
      </ul>
      {toggleMenu ? (
        <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
          <li className="text-xl w-full my-2">
            <Icon
              icon="pixelarticons:close"
              className="text-white md:hidden cursor-pointer"
              fontSize={28}
              onClick={() => setToggleMenu(!toggleMenu)}
            />
          </li>
          {navLinks.map((title) => (
            <li className="mx-4 cursor-pointer my-2 text-lg" key={title}>
              {title}
            </li>
          ))}
        </ul>
      ) : (
        <Icon
          icon="jam:menu"
          fontSize={28}
          className="text-white md:hidden cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        />
      )}
    </nav>
  );
};
