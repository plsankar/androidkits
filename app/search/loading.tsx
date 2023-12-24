import ArchiveGridSkeleton from "@/components/archive-grid-skeleton";

export default function Loading() {
    return (
        <div className="container pt-10">
            <ArchiveGridSkeleton count={24} />
        </div>
    );
}
