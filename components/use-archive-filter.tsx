"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import omit from "lodash.omit";
import { getHostUrl } from "@/lib/utils";

export const useArchiveFilter = () => {
    const url = getHostUrl();
    const searchParams = useSearchParams();
    const { query, page, sort, order } = useMemo(() => {
        return {
            query: searchParams?.get("query") ?? "",
            page:
                searchParams !== null && searchParams.get("page") !== null
                    ? parseInt(searchParams.get("page") ?? "1")
                    : 1,
            sort: searchParams?.get("sort") ?? "default",
            order: searchParams?.get("order") ?? "asc",
        };
    }, [searchParams]);

    function buildLink(filters: { query?: string; page?: number; sort?: string; order?: string }) {
        const _filters = omit({ query, page, sort, order, ...filters });
        const _url = new URL(url);
        _url.pathname = "search";
        if (_filters.query !== "") {
            _url.searchParams.set("query", _filters.query);
        }
        if (_filters.page > 1) {
            _url.searchParams.set("page", `${_filters.page}`);
        }
        if (_filters.sort !== "default" && _filters.sort !== "") {
            _url.searchParams.set("sort", _filters.sort);
        }
        if (_filters.order !== "asc" && _filters.order !== "") {
            _url.searchParams.set("order", _filters.order);
        }
        return _url.toString();
    }

    return { buildLink, query, order, page, sort };
};
