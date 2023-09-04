import React from "react";
import Logo from "./logo";
import { ModeToggle } from "./ui/mode-toggle";

const Navbar = () => {
  return (
    <div className="py-4 border-b w-full">
      <div className="container flex flex-row gap-5 justify-between items-center">
        <div>
          <Logo className="h-8 w-auto" />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
