import { Metadata } from "next";
import MarkdownRenderer from "@/components/markdown-renderer";
import { existsSync, readFileSync, readdirSync } from "fs";
import path, { basename, extname } from "path";
import matter from "gray-matter";

const pagesFolder = path.join(process.cwd(), "pages");

export async function generateStaticParams() {
    const pages = readdirSync(pagesFolder)
        .filter((file) => extname(file) === ".md")
        .map((file) => basename(file))
        .map((page) => {
            return { slug: page.split(".").slice(0, -1).join(".") };
        });
    return pages;
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
    const pageFile = path.join(pagesFolder, `${slug}.md`);

    if (!existsSync(pageFile)) {
        return null;
    }

    const page = matter(readFileSync(pageFile, "utf8"));

    if (!page) {
        return null;
    }

    return (
        <div className="py-10">
            <div className="container">
                <div className="border-b mb-5 flex gap-5 flex-col lg:flex-row justify-between">
                    <h1 className="text-4xl mb-2">{page.data.title}</h1>
                </div>
                <MarkdownRenderer content={page.content} assetsUrl="" />
            </div>
        </div>
    );
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata | null> {
    const pageFile = path.join(pagesFolder, `${slug}.md`);

    if (!existsSync(pageFile)) {
        return null;
    }

    const page = matter(readFileSync(pageFile, "utf8"));

    if (!page) {
        return null;
    }

    return {
        title: `${page.data.title}`,
    };
}
