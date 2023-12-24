import ArchiveGrid from "@/components/archive-grid";
import ArchiveNavigation from "@/components/archive-navigation";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import z from "zod";

const searchSchema = z.object({
    query: z.string().optional().default(""),
    page: z.number().default(1),
});

export async function generateMetadata({ searchParams }: { searchParams: { page: string } }): Promise<Metadata | null> {
    const parse = searchSchema.safeParse({ ...searchParams, page: parseInt((searchParams.page as string) ?? "1") });
    if (!parse.success) {
        return null;
    }
    return {
        title: `Search${parse.data.page > 1 ? " - Page " + parse.data.page : ""}`,
    };
}

export const PROJECTS_PER_PAGE = 24;

export default async function Search({
    searchParams,
}: {
    searchParams: { page?: string | undefined; query?: string | undefined };
}) {
    const parse = searchSchema.safeParse({ ...searchParams, page: parseInt((searchParams.page as string) ?? "1") });
    let filter = {
        page: 1,
        query: "",
    };

    if (parse.success) {
        filter = parse.data;
    }

    const whereFilter: Prisma.ProjectWhereInput = {
        OR: [
            {
                name: {
                    contains: filter.query,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: filter.query,
                    mode: "insensitive",
                },
            },
            {
                user: {
                    name: {
                        contains: filter.query,
                        mode: "insensitive",
                    },
                },
            },
        ],
    };

    const [projects, count] = await prisma.$transaction([
        prisma.project.findMany({
            where: filter.query === "" ? {} : whereFilter,
            skip: (filter.page - 1) * PROJECTS_PER_PAGE,
            take: PROJECTS_PER_PAGE,
            include: {
                user: true,
            },
        }),
        prisma.project.count({
            where: filter.query === "" ? {} : whereFilter,
        }),
    ]);

    return (
        <div className="container pt-10">
            <ArchiveGrid projects={projects} />
            <ArchiveNavigation page={filter.page} total={count} perPage={PROJECTS_PER_PAGE} />
        </div>
    );
}
