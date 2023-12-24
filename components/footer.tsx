import React from "react";
import Logo from "./logo";
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <div className="border-t py-20 mt-10">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div>
                            <div>
                                <Link href="/" className="text-left inline-block">
                                    <Logo className="h-8" />
                                    <span className="sr-only">AndroidKits</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="border-b text-base pb-2 mb-2 text-muted-foreground">Pages</h4>
                                <Link href="/">Home</Link>
                                <a href="mailto:me@lakshmisankar.com?subject=Regarding%20AndroidKits">Contact</a>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="border-b text-base pb-2 mb-2 text-muted-foreground">Legal</h4>
                                <Link href="/page/privacy-policy">Privacy Policy</Link>
                                <Link href="/page/terms-and-conditions">Terms and Conditions</Link>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="border-b text-base pb-2 mb-2 text-muted-foreground">Open Source</h4>
                                <a target="_blank" rel="nofollow" href="https://github.com/plsankar/androidkits">
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container border-t py-5">
                <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                    <div>
                        <p className="text-sm">Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
                    </div>
                    <div>
                        <p className="text-sm">
                            Crafted By{" "}
                            <span>
                                <a
                                    className="underline transition-all duration-300 text-primary hover:text-primary/120 underline-offset-4 hover:underline-offset-2"
                                    href="http://lakshmisankar.com"
                                >
                                    Lakshmi Sankar
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
