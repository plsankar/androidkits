import { PROJECTS_PER_PAGE } from "./page";
import ArchiveGridSkeleton from "@/components/archive-grid-skeleton";

export default function Loading() {
    return (
        <div className="container pt-10">
            <ArchiveGridSkeleton count={PROJECTS_PER_PAGE} />
        </div>
    );
}
