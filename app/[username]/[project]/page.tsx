import { Card, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Readme from "@/components/readme";
import Link from "next/link";

export async function generateStaticParams() {
    const projects = await prisma.project.findMany();
    return projects.map((project) => ({
        username: project.slug.split("/")[0],
        project: project.slug.split("/")[1],
    }));
}

export default async function Page({ params }: { params: { username: string; project: string } }) {
    const project = await prisma.project.findFirst({
        where: {
            slug: `${params.username}/${params.project}`,
        },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="py-10">
            <div className="container">
                <div className="border-b pb-5">
                    <h1 className="text-2xl mb-2">{project.name}</h1>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex flex-row-reverse gap-4 lg:gap-10 mt-10">
                    <div className="w-1/3">
                        <Card className="rounded-sm">
                            <CardHeader className="p-3">
                                <div className="flex flex-col divide-y space-y-3">
                                    <div>
                                        <h2 className="mb-1">Repository</h2>
                                        <p className="text-muted-foreground text-sm">
                                            <Link href={project.repo} target="_blank" rel="nofollow">
                                                {project.repo}
                                            </Link>
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="mb-1 pt-3">Homepage</h2>
                                        <p className="text-muted-foreground text-sm">
                                            <Link
                                                href={project.homepage !== "" ? project.homepage : project.repo}
                                                target="_blank"
                                                rel="nofollow"
                                            >
                                                {project.homepage !== "" ? project.homepage : project.repo}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="w-2/3">
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
