import React, { FC } from "react";
import ArchiveItem from "./archive-item";
import { ProjectWithUser } from "@/lib/types";

const ArchiveGrid: FC<{ projects: ProjectWithUser[] }> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {projects.map((project, index) => (
                <ArchiveItem project={project} key={index} />
            ))}
        </div>
    );
};

export default ArchiveGrid;
