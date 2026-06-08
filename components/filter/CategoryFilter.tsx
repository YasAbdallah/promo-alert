"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";

type CategoryFilterProps = {
    categories: string[];
}

export default function CategorySidebar({
    categories,
}: CategoryFilterProps) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCategories = searchParams.getAll("category");

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentCategories = searchParams.getAll("category");

        let newCategories: string[];
        if (currentCategories.includes(category)) {
            newCategories = currentCategories.filter(c => c !== category);
        } else {
            newCategories = [...currentCategories, category];
        }

        params.delete("category");
        newCategories.forEach(c => params.append("category", c));

        router.push(`?${params.toString()}`);
    }

    return (
        <aside className="w-full md:w-64 border-r pr-4">

            <div className="space-y-3">
                {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={category} className="text-sm cursor-pointer">
                            {category}
                        </Label>
                    </div>
                ))}
            </div>

        </aside>
    );
}