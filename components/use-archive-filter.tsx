"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import omit from "lodash.omit";

export const useArchiveFilter = () => {
    const url = process.env.VERCEL_URL || "http://localhost:3000/";
    const searchParams = useSearchParams();
    const { query, page, sort } = useMemo(() => {
        return {
            query: searchParams?.get("query") || "",
            page: searchParams?.get("page") || "1",
            sort: searchParams?.get("sort") || "default",
        };
    }, [searchParams]);

    function buildLink(filters: { query?: string; page?: string; sort?: string }) {
        const _filters = omit({ query, page, sort, ...filters });
        const _url = new URL(url || "");
        _url.pathname = "search";
        _url.searchParams.set("query", _filters.query);
        _url.searchParams.set("page", _filters.page);
        _url.searchParams.set("sort", _filters.sort);
        return _url.toString();
    }

    return { buildLink, query, page, sort };
};
