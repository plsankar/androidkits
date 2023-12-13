import React from "react";
import Logo from "./logo";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="py-4 border-b w-full">
            <div className="container flex flex-row gap-5 justify-between items-center">
                <Link href="/" className="text-left inline-block">
                    <Logo className="h-8 w-auto" />
                    <span className="sr-only">AndroidKits</span>
                </Link>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
