"use client";

import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function SortFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleOrderChange = (key: "sort", value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set(key, value);
        router.push(`?${params.toString()}`);
    };

    return (
        <aside className="w-full md:w-64 border-r pr-4 space-y-6">

            <div>
                <h3 className="font-semibold mb-3">
                    Preço
                </h3>

                <div className="space-y-3">

                    <div className="flex items-center gap-3">
                        <RadioGroup className="w-fit mt-4" value={searchParams.get("sort") ?? ""} onValueChange={value => handleOrderChange("sort", value)}>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="price-asc" id="price-asc" className="peer h-5 w-5 rounded-md border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                <Label htmlFor="price-asc" className="text-sm cursor-pointer ml-2"> Menor preco </Label>
                            </div>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="price-desc" id="price-desc" className="peer h-5 w-5 rounded-md border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                <Label htmlFor="price-desc" className="text-sm cursor-pointer ml-2" > Maior preco </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">
                    Nome
                </h3>

                <div className="space-y-3">

                    <div className="flex items-center gap-3">
                        <RadioGroup className="w-fit mt-4" value={searchParams.get("sort") ?? ""} onValueChange={value => handleOrderChange("sort", value)}>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="name-asc" id="name-asc" className="peer h-5 w-5 rounded-md border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                <Label htmlFor="name-asc" className="text-sm cursor-pointer ml-2"> A-Z </Label>
                            </div>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="name-desc" id="name-desc" className="peer h-5 w-5 rounded-md border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                <Label htmlFor="name-desc" className="text-sm cursor-pointer ml-2"> Z-A </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>

        </aside>
    );
}