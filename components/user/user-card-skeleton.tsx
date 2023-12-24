import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const UserCardSkeleton: FC = () => {
    return (
        <Card>
            <CardContent className="p-5 text-center">
                <div className="mb-5 flex justify-center">
                    <div className="border-primary border-2 rounded-full p-1">
                        <Skeleton className="w-40 h-40 rounded-full" />
                    </div>
                </div>
                <div className="mb-5 text-center">
                    <Skeleton className="w-1/2 mx-auto h-4 mb-2" />
                    <Skeleton className="w-1/2 mx-auto h-3" />
                </div>

                <Skeleton className="w-10 h-10 mx-auto" />
            </CardContent>
        </Card>
    );
};

export default UserCardSkeleton;
