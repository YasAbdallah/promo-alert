"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";


type searchInputProps = {
    searchTerm: string,
    setSearchTerm: (term: string) => void,
};

export default function SearchInput({ searchTerm, setSearchTerm }: searchInputProps) {
    const router = useRouter();
    const searchParam = useSearchParams().get("search") || "";

    useEffect(() => {
        setSearchTerm(searchParam);
    }, [searchParam, setSearchTerm]);

    const updateSearchParam = (newQuery: string) => {
        setSearchTerm(newQuery);
        router.push(`/products?search=${encodeURIComponent(newQuery)}`);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => updateSearchParam(searchTerm)} className="mt-2 w-full">Buscar</Button>
        </div>
    );
}