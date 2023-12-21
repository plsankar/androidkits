"use client";

import React, { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ArchiveNavigation: FC<{ page: number; total: number; perPage: number }> = ({ page, total, perPage }) => {
    const hasNext = total >= page * perPage;
    const hasPrev = page !== 1;
    return (
        <div className="flex justify-end gap-5 mt-10">
            {hasPrev ? (
                <Button asChild variant="secondary">
                    <Link href={`/search?page=${page - 1}`}>Prev</Link>
                </Button>
            ) : null}
            {hasNext ? (
                <Button asChild variant="secondary">
                    <Link href={`/search?page=${page + 1}`}>Next</Link>
                </Button>
            ) : null}
        </div>
    );
};

export default ArchiveNavigation;
