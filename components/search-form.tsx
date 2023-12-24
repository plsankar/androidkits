import React from "react";
import { Input } from "@/components/ui/input";

const SearchForm = () => {
    return (
        <form action="/search" method="get">
            <Input title="Search..." className="w-[200px]" name="query" placeholder="Search..." defaultValue={""} />
        </form>
    );
};

export default SearchForm;
