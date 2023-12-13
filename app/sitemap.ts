import prisma from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await prisma.project.findMany();
    const projectsSitemap: MetadataRoute.Sitemap = projects.map((project) => {
        return {
            url: `https://androidkits.com/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        };
    });
    return [
        {
            url: "https://androidkits.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...projectsSitemap,
    ];
}
