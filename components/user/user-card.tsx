import React, { FC } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon } from "lucide-react";

const UserCard: FC<{ user: User }> = ({ user }) => {
    return (
        <Card>
            <CardContent className="p-5 text-center">
                <div className="mb-5 flex justify-center">
                    <div className="border-primary border-2 rounded-full p-1">
                        <Avatar className="w-40 h-40">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="mb-5">
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription className="mt-2">
                        <Link href={`/${user.username}`}>@{user.username}</Link>
                    </CardDescription>
                </div>

                <Button asChild variant="outline">
                    <a href="/" rel="nofollow" target="_blank" title="Github">
                        <GithubIcon className="h-4 w-4" />
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
};

export default UserCard;
