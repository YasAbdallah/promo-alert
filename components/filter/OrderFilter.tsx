"use client";

import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function OrderFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedOrders = searchParams.getAll("sorted");

    const handleOrderChange = (key: "priceOrder" | "nameOrder", value: string) => {
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
                        <RadioGroup className="w-fit mt-4" value={searchParams.get("priceOrder") ?? ""} onValueChange={value => handleOrderChange("priceOrder", value)}>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="price-asc" id="price-asc" />
                                <Label htmlFor="price-asc" className="text-sm cursor-pointer ml-2"> Menor preco </Label>
                            </div>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="price-desc" id="price-desc" />
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
                        <RadioGroup className="w-fit mt-4" value={searchParams.get("nameOrder") ?? ""} onValueChange={value => handleOrderChange("nameOrder", value)}>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="name-asc" id="name-asc" />
                                <Label htmlFor="name-asc" className="text-sm cursor-pointer ml-2"> A-Z </Label>
                            </div>
                            <div className="flex item-center gap3">
                                <RadioGroupItem value="name-desc" id="name-desc" />
                                <Label htmlFor="name-desc" className="text-sm cursor-pointer ml-2"> Z-A </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>

        </aside>
    );
}