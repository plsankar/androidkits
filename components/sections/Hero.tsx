import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="py-10 space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-[1.2] font-light tracking-tight font-display">
                <span className="text-primary">Android development</span> <br />
                libraries and tools
            </h1>
            <div className="flex flex-row gap-5">
                <Button asChild>
                    <Link href="/search">Explore</Link>
                </Button>
                <Button variant="secondary" asChild>
                    <Link href="https://github.com/plsankar/androidkits" target="_blank" rel="nofollow">
                        Github
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Hero;
