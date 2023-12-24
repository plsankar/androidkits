import React, { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

const ArchiveItemSkeleton: FC = () => {
    return (
        <Card className="rounded flex flex-col">
            <CardHeader className="p-4">
                <CardTitle>
                    <Skeleton className="bg-secondary w-full h-[20px]" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="bg-secondary w-[80%] h-[15px]" />
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <Skeleton className="bg-secondary w-full h-[15px] mb-2" />
                <Skeleton className="bg-secondary w-full h-[15px]" />
            </CardContent>
            <CardFooter className="p-4 border-t mt-auto inline-block">
                <Skeleton className="bg-secondary w-[50%] h-[15px]" />
            </CardFooter>
        </Card>
    );
};

export default ArchiveItemSkeleton;
