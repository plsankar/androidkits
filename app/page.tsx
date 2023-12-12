import ArchiveItem from "@/components/archive-item";
import Hero from "@/components/sections/Hero";
import ArchiveGrid from "@/components/archive-grid";
import prisma from "@/lib/db";

export default async function Home() {
  const projects = await prisma.project.findMany({
    take: 6,
    include: {
      user: true,
    },
  });
  return (
    <div className="container">
      <Hero />
      <ArchiveGrid projects={projects} />
    </div>
  );
}
