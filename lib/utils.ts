import { ArchiveFitler } from "@/components/archive";
import { type ClassValue, clsx } from "clsx";
import omit from "lodash.omit";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getHostUrl() {
    if (typeof window !== "undefined") {
        return `${window.location.protocol}//${window.location.host}`;
    }
    return process.env.VERCEL_URL && process.env.VERCEL_URL !== ""
        ? process.env.VERCEL_URL
        : "https://androidkits.com/";
}

export function buildArchiveLink(filters: ArchiveFitler) {
    const _filters = omit({ ...filters });
    const _url = new URL(getHostUrl());
    _url.pathname = "search";
    if (_filters.query !== "") {
        _url.searchParams.set("query", _filters.query);
    }
    if (_filters.sort !== "default") {
        _url.searchParams.set("sort", _filters.sort);
    }
    if (_filters.order !== "asc") {
        _url.searchParams.set("order", _filters.order);
    }
    if (_filters.page > 1) {
        _url.searchParams.set("page", `${_filters.page}`);
    }
    return _url.toString();
}
