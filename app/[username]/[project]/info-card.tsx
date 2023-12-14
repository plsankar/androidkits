import React, { FC } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ProjectWithUser } from "@/additional";

const InfoCard: FC<{ project: ProjectWithUser }> = ({ project }) => {
    return (
        <Card className="rounded-sm sticky top-0">
            <CardHeader className="p-0">
                <div className="flex flex-col divide-y">
                    <div className="p-3">
                        <h2 className="mb-1">Repository</h2>
                        <p className="text-muted-foreground text-sm">
                            <Link href={project.repo} target="_blank" rel="nofollow">
                                {project.repo}
                            </Link>
                        </p>
                    </div>
                    <div className="p-3">
                        <h2 className="mb-1">Homepage</h2>
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
                    {project.license && project.license !== "" ? (
                        <div className="p-3">
                            <h2 className="mb-1">License</h2>
                            <p className="text-muted-foreground text-sm">
                                <Link
                                    href={`https://choosealicense.com/licenses/${project.license}/`}
                                    target="_blank"
                                    rel="nofollow"
                                >
                                    {project.license}
                                </Link>
                            </p>
                        </div>
                    ) : null}
                </div>
            </CardHeader>
        </Card>
    );
};

export default InfoCard;
