import React, { FC } from "react";
import ArchiveItemSkeleton from "./archive-item-skeleton";

const ArchiveGridSkeleton: FC<{ count: number }> = ({ count }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from(Array(count)).map((_, index) => (
                <ArchiveItemSkeleton key={index} />
            ))}
        </div>
    );
};

export default ArchiveGridSkeleton;
