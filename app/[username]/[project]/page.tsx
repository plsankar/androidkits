import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Readme from "@/components/readme";
import Link from "next/link";
import InfoCard from "./info-card";
import { ProjectWithUser } from "@/additional";
import GithubRepoStatsIcons from "./github-repo-stats-icons";

export async function generateStaticParams() {
    const projects = await prisma.project.findMany();
    return projects.map((project) => ({
        username: project.slug.split("/")[0],
        project: project.slug.split("/")[1],
    }));
}

export default async function Page({ params }: { params: { username: string; project: string } }) {
    // @ts-ignore
    const project: ProjectWithUser = await prisma.project.findFirst({
        where: {
            slug: `${params.username}/${params.project}`,
        },
        include: {
            user: true,
        },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="py-10">
            <div className="container">
                <div className="border-b pb-5 flex gap-5 flex-col lg:flex-row justify-between">
                    <div>
                        <h1 className="text-2xl mb-2">{project.name}</h1>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        {project.categories.map((category, index) => {
                            return (
                                <Link
                                    href={`/search?category=${category}`}
                                    key={index}
                                    className="border px-3 py-1 text-sm rounded hover:bg-primary hover:text-primary-foreground"
                                >
                                    {category}
                                </Link>
                            );
                        })}
                    </div>
                    <div>
                        <GithubRepoStatsIcons project={project} />
                    </div>
                </div>
                <div className="flex flex-col-reverse xl:flex-row-reverse gap-4 xl:gap-10 mt-10">
                    <div className="xl:w-1/3">
                        <InfoCard project={project} />
                    </div>
                    <div className="xl:w-2/3">
                        <Tabs defaultValue="readme" className="w-full">
                            <TabsList className="bg-none">
                                <TabsTrigger value="readme">Readme</TabsTrigger>
                                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                            </TabsList>
                            <div className="mt-10">
                                <TabsContent value="readme">
                                    <Readme
                                        content={project.readme}
                                        assetsUrl={`https://raw.githubusercontent.com/${project.slug}/master/`}
                                    />
                                </TabsContent>
                                <TabsContent value="discussion">Coming Soon.</TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({
    params,
}: {
    params: { username: string; project: string };
}): Promise<Metadata | null> {
    const project = await prisma.project.findFirst({
        where: {
            slug: `${params.username}/${params.project}`,
        },
    });

    if (!project) {
        return null;
    }

    return {
        title: `${project.name} - ${project.slug}`,
        description: project.description,
    };
}
