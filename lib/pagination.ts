// code from https://gist.github.com/kottenator/9d936eb3e4e3c3e02598

type PageItem = number | "...";

export const getRange = (start: number, end: number): PageItem[] => {
    if (end < start) throw Error(`End number must be higher then start number: start ${start}, end ${start}`);

    const rangeLength = end - start + 1;
    return Array(rangeLength)
        .fill(0)
        .map((_, i) => i + start);
};

const clamp = (value: number, lower: number, upper: number) => Math.min(Math.max(value, lower), upper);

export const calculatePages = (currentPage: number, pageCount: number, size: number): PageItem[] => {
    if (pageCount < 1) {
        return [];
    }

    if (currentPage < 1) {
        // Current page has negative value. Current page will be set to 1
        currentPage = 1;
    }

    if (currentPage > pageCount) {
        // Current page is higher than page count. Current page will be set to page count:", pageCoun
        currentPage = pageCount;
    }

    if (size % 2 === 0) {
        // The size must be odd. The size will be increased by 1
        size += 1;
    }

    if (size < 5) {
        // The minimum size is 5. The size will be increased to 5
        size = 5;
    }

    const offset = (size - 1) / 2;
    const shouldAddDots = pageCount > size;

    const rangeConfig = {
        start: clamp(currentPage - offset, 1, shouldAddDots ? pageCount - size + 1 : 1),
        end: clamp(currentPage + offset, size, pageCount),
    };

    const pages = getRange(rangeConfig.start, rangeConfig.end);

    if (shouldAddDots && pages[0] !== 1) {
        pages[0] = 1;
        pages[1] = "...";
    }
    if (shouldAddDots && pages[pages.length - 1] !== pageCount) {
        pages[pages.length - 1] = pageCount;
        pages[pages.length - 2] = "...";
    }
    return pages;
};
