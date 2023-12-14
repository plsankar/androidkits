import { ProjectWithUser } from "@/additional";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";

const GithubRepoStatsIcons: FC<{ project: ProjectWithUser }> = ({ project }) => {
    return (
        <div className="flex gap-4 items-center">
            <GithubRepoStatsIcon title={"Fork(s)"} count={project.forks_count} link={`${project.repo}`} />
            <GithubRepoStatsIcon title={"Issue(s)"} count={project.open_issues_count} link={`${project.repo}`} />
            <GithubRepoStatsIcon title={"Star(s)"} count={project.stargazers_count} link={`${project.repo}`} />
        </div>
    );
};

const GithubRepoStatsIcon: FC<{ link: string; count: number; title: string }> = ({ link, count, title }) => {
    return (
        <Button variant={"outline"} asChild>
            <Link href={link} className="inline-flex gap-2 items-center">
                <span className="text-sm">{title}</span>
                <span className="px-2 py-1 leading-none bg-secondary rounded">{count}</span>
            </Link>
        </Button>
    );
};

export default GithubRepoStatsIcons;
