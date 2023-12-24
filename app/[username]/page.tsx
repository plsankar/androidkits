import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { User } from "@prisma/client";
import UserCard from "@/components/user/user-card";
import { ProjectWithUser } from "@/additional";
import ArchiveItem from "@/components/archive-item";

export async function generateStaticParams() {
    const users = await prisma.user.findMany();
    return users.map((user) => ({
        username: user.username,
    }));
}

export default async function Page({ params }: { params: { username: string } }) {
    if (!params.username || params.username === "") {
        notFound();
    }
    // @ts-ignore
    const user: User = await prisma.user.findFirst({
        where: {
            username: {
                equals: params.username,
            },
        },
    });

    if (!user) {
        notFound();
    }

    const projects: ProjectWithUser[] = await prisma.project.findMany({
        where: {
            userId: user.id,
        },
        include: {
            user: true,
        },
    });

    return (
        <div className="py-10">
            <div className="container">
                <div className="flex flex-row flex-wrap gap-10">
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <UserCard user={user} />
                    </div>
                    <div className="w-full lg:w-3/4">
                        <h2 className="mb-5 pb-5 border-b">Projects</h2>
                        {projects.length === 0 ? (
                            <div className="text-center">No Results Found.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {projects.map((project, index) => (
                                    <ArchiveItem project={project} key={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata | null> {
    if (!params.username || params.username === "") {
        return null;
    }
    // @ts-ignore
    const user: User = await prisma.user.findFirst({
        where: {
            username: {
                equals: params.username,
            },
        },
    });

    if (!user) {
        return null;
    }

    return {
        title: `${user.name}`,
    };
}
