"use client";

import React, { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ArchiveNavigation: FC<{ page: number }> = ({ page }) => {
    return (
        <div className="flex justify-end gap-5 mt-10">
            {page !== 1 ? (
                <Button asChild variant="secondary">
                    <Link href={`/search?page=${page - 1}`}>Prev</Link>
                </Button>
            ) : null}
            <Button asChild variant="secondary">
                <Link href={`/search?page=${page + 1}`}>Next</Link>
            </Button>
        </div>
    );
};

export default ArchiveNavigation;
