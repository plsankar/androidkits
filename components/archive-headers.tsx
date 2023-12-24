"use client";

import React, { FC } from "react";
import SearchForm from "./search-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowDownAZIcon, ArrowDownZAIcon } from "lucide-react";
import { ArchiveFitler } from "./archive";
import { buildArchiveLink } from "@/lib/utils";

const ArchiveHeaders: FC<{ archiveFilter: ArchiveFitler }> = ({ archiveFilter }) => {
    const { sort, order } = archiveFilter;

    const buildLink = (filters: Partial<ArchiveFitler>) => buildArchiveLink({ ...archiveFilter, ...filters });

    return (
        <div className="flex flex-wrap justify-between">
            <div className="inline-flex">
                <div className="flex gap-2 items-center">
                    <span className="text-sm">Sort: </span>
                    <Select
                        value={sort}
                        onValueChange={(value: any) => {
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
                        onValueChange={(value: any) => {
                            window.location.href = buildLink({ order: value, page: 1 });
                        }}
                    >
                        <ToggleGroupItem value="asc" title="Ascending Order">
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
