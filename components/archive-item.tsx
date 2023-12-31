import React, { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectWithUser } from "@/additional";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

const ArchiveItem: FC<{ project: ProjectWithUser }> = ({ project }) => {
    return (
        <Card className="rounded flex flex-col">
            <CardHeader className="p-4">
                <CardTitle>
                    <Link href={project.slug}>{project.name}</Link>
                </CardTitle>
                <CardDescription>
                    <Link href={project.slug}>{project.slug}</Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm">{project.description}</p>
            </CardContent>
            <CardFooter className="p-4 border-t mt-auto inline-block">
                {project.user ? (
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Link className="flex gap-3 items-center cursor-pointer" href={`/${project.user.slug}`}>
                                <Avatar className="h-5 w-5">
                                    <AvatarImage src={project.user.avatar} />
                                    <AvatarFallback className="text-xs">
                                        {project.user.username.substring(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="leading-none text-sm">@{project.user.username}</p>
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <div className="flex items-center gap-5">
                                <Avatar>
                                    <AvatarImage src={project.user.avatar} />
                                    <AvatarFallback className="text-xs">
                                        {project.user.username.substring(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="">
                                    <Link href={`/${project.user.slug}`}>
                                        <p className="leading-none text-lg mb-2">{project.user.name}</p>
                                    </Link>
                                    <Link href={`/${project.user.slug}`}>
                                        <p className="leading-none text-sm text-muted-foreground">
                                            @{project.user.username}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ) : null}
            </CardFooter>
        </Card>
    );
};

export default ArchiveItem;
