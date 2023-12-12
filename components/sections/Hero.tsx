import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="py-10 space-y-10">
      <h1 className="text-6xl leading-[1.2] font-light tracking-tight font-display">
        <span className="text-primary">Android development</span> <br />
        libraries and tools
      </h1>
      <div className="flex flex-row gap-5">
        <Link href="/search" className={buttonVariants({})}>
          Explore
        </Link>
        <Link
          href="https://github.com/plsankar/androidkits"
          target="_blank"
          rel="nofollow"
          className={buttonVariants({ variant: "outline" })}
        >
          Github
        </Link>
      </div>
    </div>
  );
};

export default Hero;
