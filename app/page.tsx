import Hero from "@/components/sections/Hero";
import ArchiveGrid from "@/components/archive-grid";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    const projects = await prisma.project.findMany({
        take: 9,
        include: {
            user: true,
        },
    });
    return (
        <div className="container">
            <Hero />
            <div className="relative">
                <ArchiveGrid projects={projects} />
                <div className="absolute w-full from-5% bottom-0 bg-gradient-to-t from-card py-20 text-center z-[1]">
                    <Button asChild>
                        <Link href="/search">View All</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
