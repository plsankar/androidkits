import React, { FC } from "react";
import "../node_modules/@wooorm/starry-night/style/both.css";
import "../node_modules/@microflash/rehype-starry-night/src/index.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import addClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeParse from "rehype-parse";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from "@microflash/rehype-starry-night";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkUrls from "rehype-urls";
import rehypeExternalLinks from "rehype-external-links";

const Readme: FC<{ content: string; assetsUrl: string }> = ({ content, assetsUrl }) => {
    function prefixBaseUrl(url: URL) {
        if (url.host === null) {
            url.host = assetsUrl;
        }
        return url;
    }
    return (
        <article className="prose prose-green dark:prose-invert max-w-none">
            <MDXRemote
                source={content}
                options={{
                    mdxOptions: {
                        format: "md",
                        rehypePlugins: [
                            rehypeParse,
                            rehypeSlug,
                            rehypeRaw,
                            [remarkUrls, prefixBaseUrl],
                            [rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }],
                            [rehypeAutolinkHeadings, { behavior: "wrap" }],
                            rehypeStarryNight,
                            [
                                addClasses,
                                {
                                    highlight: "not-prose",
                                    ".highlisht": "not-prose",
                                    "h1 a,h2 a,h3 a,h4 a,h5 a,h6 a": "not-prose",
                                    "div pre": "not-prose",
                                    img: "not-prose",
                                    "h1,h2,h3,h4,h5,h6": "border-b pb-2",
                                    p: "pt-0",
                                },
                            ],
                        ],
                        remarkPlugins: [remarkGfm, remarkGemoji],
                    },
                }}
            />
        </article>
    );
};

export default Readme;
