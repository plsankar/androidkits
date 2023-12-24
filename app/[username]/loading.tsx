import ArchiveItemSkeleton from "@/components/archive-item-skeleton";
import UserCardSkeleton from "@/components/user/user-card-skeleton";

export default async function Loading() {
    return (
        <div className="py-10">
            <div className="container">
                <div className="flex gap-10">
                    <div className="w-1/4">
                        <UserCardSkeleton />
                    </div>
                    <div className="w-3/4">
                        <h2 className="mb-5 pb-5 border-b">Projects</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {Array.from(Array(10)).map((_, index) => (
                                <ArchiveItemSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
