"use client";

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
import { useArchiveFilter } from "./use-archive-filter";

const ArchiveNavigation: FC<{ page: number; total: number; perPage: number }> = ({ page, total, perPage }) => {
    const hasNext = total >= page * perPage;
    const hasPrev = page !== 1;
    const totalPages = Math.ceil(total / perPage);
    const paginationItems = calculatePages(page, totalPages, 3);
    const { buildLink } = useArchiveFilter();

    return (
        <div className="flex justify-end gap-5 mt-10">
            <Pagination className="w-fit inline-flex mx-0">
                <PaginationContent>
                    {hasPrev ? <PaginationPrevious href={buildLink({ page: `${page - 1}` })} /> : null}
                    {paginationItems.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {typeof item !== "string" ? (
                                    <PaginationLink isActive={item === page} href={buildLink({ page: `${page}` })}>
                                        {item}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis />
                                )}
                            </Fragment>
                        );
                    })}
                    {hasNext ? <PaginationNext href={buildLink({ page: `${page + 1}` })} /> : null}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default ArchiveNavigation;
