"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {createPageURL} from "@/utils/createPageURL";


type SearchInputProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export default function SearchInput({
    searchTerm,
    setSearchTerm,
}: SearchInputProps) {
    const router = useRouter();
    const searchParam = useSearchParams().get("search") || "";

    useEffect(() => {
        setSearchTerm(searchParam);
    }, [searchParam, setSearchTerm]);

    const updateSearchParam = (newQuery: string) => {
        const params = new URLSearchParams();
        params.set("search", newQuery);
        router.push(createPageURL(1, params));
    };

    return (
        <div className="flex items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-primary transition">

            {/* Ícone */}
            <Search className="ml-3 h-4 w-4 text-muted-foreground" />

            {/* Input */}
            <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        updateSearchParam(searchTerm);
                    }
                }}
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />

            {/* Botão */}
            <Button
                size="sm"
                className="m-1"
                onClick={() => updateSearchParam(searchTerm)}
            >
                Buscar
            </Button>

        </div>
    );
}