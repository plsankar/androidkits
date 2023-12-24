import { type ClassValue, clsx } from "clsx";
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
