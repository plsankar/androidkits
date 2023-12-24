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

const ArchiveNavigation: FC<{ page: number; total: number; perPage: number }> = ({ page, total, perPage }) => {
    const hasNext = total >= page * perPage;
    const hasPrev = page !== 1;
    const totalPages = Math.ceil(total / perPage);
    const paginationItems = calculatePages(page, totalPages, 3);

    function buildLinkForPage(page: number) {
        return `/search?page=${page}`;
    }

    return (
        <div className="flex justify-end gap-5 mt-10">
            <Pagination className="w-fit inline-flex mx-0">
                <PaginationContent>
                    {hasPrev ? <PaginationPrevious href={buildLinkForPage(page - 1)} /> : null}
                    {paginationItems.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {typeof item !== "string" ? (
                                    <PaginationLink isActive={item === page} href={buildLinkForPage(item)}>
                                        {item}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis />
                                )}
                            </Fragment>
                        );
                    })}
                    {hasNext ? <PaginationNext href={buildLinkForPage(page + 1)} /> : null}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default ArchiveNavigation;
