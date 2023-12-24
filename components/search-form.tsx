"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

const SearchForm = () => {
    const params = useSearchParams();
    return (
        <form action="/search" method="get">
            <Input
                title="Search..."
                className="w-[200px]"
                name="query"
                placeholder="Search..."
                defaultValue={params?.get("query") || ""}
            />
        </form>
    );
};

export default SearchForm;
