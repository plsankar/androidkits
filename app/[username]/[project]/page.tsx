import { Card, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

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
                                        <p className="text-muted-foreground text-sm">{project.repo}</p>
                                    </div>
                                    <div>
                                        <h2 className="mb-1 pt-3">Homepage</h2>
                                        <p className="text-muted-foreground text-sm">
                                            {project.homepage !== "" ? project.homepage : project.repo}
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
                            <TabsContent value="readme">
                                {/* <MDXRemote {...readmeMd} /> */}
                                <article className="prose dark:prose-invert prose-neutral">
                                    <MDXRemote
                                        source={project.readme}
                                        options={{
                                            mdxOptions: { format: "md", remarkPlugins: [remarkGfm], rehypePlugins: [] },
                                        }}
                                    />
                                </article>
                            </TabsContent>
                            <TabsContent value="discussion">Coming Soon.</TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
