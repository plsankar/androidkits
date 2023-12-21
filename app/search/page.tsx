import ArchiveGrid from "@/components/archive-grid";
import ArchiveNavigation from "@/components/archive-navigation";
import prisma from "@/lib/db";
import { Metadata } from "next";
import z from "zod";

const searchSchema = z.object({
    search: z.string().optional(),
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

export const PROJECTS_PER_PAGE = 6;

export default async function Search({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const parse = searchSchema.safeParse({ ...searchParams, page: parseInt((searchParams.page as string) ?? "1") });
    let filter = {
        page: 1,
    };
    if (parse.success) {
        filter = parse.data;
    }

    const [projects, count] = await prisma.$transaction([
        prisma.project.findMany({
            skip: (filter.page - 1) * PROJECTS_PER_PAGE,
            take: PROJECTS_PER_PAGE,
            include: {
                user: true,
            },
        }),
        prisma.project.count(),
    ]);

    return (
        <div className="container pt-10">
            <ArchiveGrid projects={projects} />
            <ArchiveNavigation page={filter.page} total={count} perPage={PROJECTS_PER_PAGE} />
        </div>
    );
}
