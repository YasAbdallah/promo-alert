"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CategoryFilterProps = {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
}


export default function CategorySidebar({
    categories,
    selectedCategories,
    onCategoryChange
}: CategoryFilterProps) {
    return (
        <aside className="w-full md:w-64 border-r pr-4">

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Categorias</h2>
                <p className="text-sm text-muted-foreground">
                    Filtre os produtos
                </p>
            </div>

            <div className="space-y-3">
                {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => onCategoryChange(category)}
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