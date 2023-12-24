"use client";

import React from "react";
import SearchForm from "./search-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArchiveFilter } from "./use-archive-filter";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    AArrowDownIcon,
    AArrowUpIcon,
    ArrowDownAZIcon,
    ArrowDownNarrowWideIcon,
    ArrowDownWideNarrowIcon,
    ArrowDownZAIcon,
} from "lucide-react";

const ArchiveHeaders = () => {
    const { sort, order, buildLink } = useArchiveFilter();

    return (
        <div className="flex flex-wrap justify-between">
            <div className="inline-flex">
                <div className="flex gap-2 items-center">
                    <span className="text-sm">Sort: </span>
                    <Select
                        value={sort}
                        onValueChange={(value) => {
                            window.location.href = buildLink({ sort: value, page: 1 });
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="lastupdated">Last Updated</SelectItem>
                        </SelectContent>
                    </Select>
                    <ToggleGroup
                        type="single"
                        value={order}
                        onValueChange={(value) => {
                            window.location.href = buildLink({ order: value, page: 1 });
                        }}
                    >
                        <ToggleGroupItem value="asc" title="Ascending Order">
                            {/* <ArrowDownNarrowWideIcon className="w-4 h-4" /> */}
                            <ArrowDownAZIcon className="w-4 h-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="desc" title="Descending Order">
                            <ArrowDownZAIcon className="w-4 h-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
            <div>
                <SearchForm />
            </div>
        </div>
    );
};

export default ArchiveHeaders;
