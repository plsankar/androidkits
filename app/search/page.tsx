import ArchiveGrid from "@/components/archive-grid";
import ArchiveHeaders from "@/components/archive-headers";
import ArchiveNavigation from "@/components/archive-navigation";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import z from "zod";

const searchSchema = z.object({
    query: z.string().optional().default(""),
    page: z.number().default(1),
    sort: z.enum(["default", "name", "rating", "lastupdated"]).default("default"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

const DEFAULT_FILTER: z.infer<typeof searchSchema> = {
    page: 1,
    query: "",
    sort: "default",
    order: "asc",
};

export async function generateMetadata({ searchParams }: { searchParams: { page: string } }): Promise<Metadata | null> {
    const parse = searchSchema.safeParse({ ...searchParams, page: parseInt((searchParams.page as string) ?? "1") });
    let filter = DEFAULT_FILTER;
    if (parse.success) {
        filter = parse.data;
    } else {
        redirect("/search");
    }
    return {
        title: `Search${filter.page > 1 ? " - Page " + filter.page : ""}`,
    };
}

export const PROJECTS_PER_PAGE = 24;

export default async function Search({
    searchParams,
}: {
    searchParams: { page?: string | undefined; query?: string | undefined };
}) {
    const parse = searchSchema.safeParse({ ...searchParams, page: parseInt((searchParams.page as string) ?? "1") });
    let filter = DEFAULT_FILTER;
    if (parse.success) {
        filter = parse.data;
    } else {
        redirect("/search");
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

    const sortQuery: Prisma.ProjectOrderByWithRelationInput[] = [];

    switch (filter.sort) {
        case "name":
            sortQuery.push({
                name: filter.order,
            });
        case "rating":
        // todo: to be implemented
        case "lastupdated":
        // todo: to be implemented
    }

    const [projects, count] = await prisma.$transaction([
        prisma.project.findMany({
            where: filter.query === "" ? {} : whereFilter,
            orderBy: sortQuery,
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
            <div className="mb-5">
                <ArchiveHeaders />
            </div>
            <ArchiveGrid projects={projects} />
            <ArchiveNavigation page={filter.page} total={count} perPage={PROJECTS_PER_PAGE} />
        </div>
    );
}
