import React, { FC, Fragment } from "react";
import { calculatePages } from "@/lib/pagination";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ArchiveFitler } from "./archive";
import { buildArchiveLink } from "@/lib/utils";

const ArchiveNavigation: FC<{ page: number; total: number; perPage: number; archiveFilter: ArchiveFitler }> = ({
    page,
    total,
    perPage,
    archiveFilter,
}) => {
    const hasNext = total >= page * perPage;
    const hasPrev = page !== 1;
    const totalPages = Math.ceil(total / perPage);
    const paginationItems = calculatePages(page, totalPages, 3);

    const buildLink = (filters: Partial<ArchiveFitler>) => buildArchiveLink({ ...archiveFilter, ...filters });

    return (
        <div className="flex justify-end gap-5 mt-10">
            <Pagination className="w-fit inline-flex mx-0">
                <PaginationContent>
                    {hasPrev ? <PaginationPrevious href={buildLink({ page: page - 1 })} /> : null}
                    {paginationItems.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {typeof item !== "string" ? (
                                    <PaginationLink isActive={item === page} href={buildLink({ page: item })}>
                                        {item}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis />
                                )}
                            </Fragment>
                        );
                    })}
                    {hasNext ? <PaginationNext href={buildLink({ page: page + 1 })} /> : null}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default ArchiveNavigation;
