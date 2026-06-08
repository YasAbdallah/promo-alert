import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";


type OrderFilterProps = {
    productPrices: Number[],
    productTitle: String[]
}

// TODO: Realizar a verificacao do tipo de ordenacao e fazer a ordenacao de acordo com o que foi escolhido.
//       Ex: Se for price-desc pegar todos os precos de productPrices e ordenar de forma decrescente e mostrar a nova ordenacao.

export default function OrderFilter({productPrices, productTitle} : OrderFilterProps){
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedOrder = searchParams.getAll("sorted");

    const handleCategoryChange = (ordenacao: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentOrder = searchParams.getAll("sorted");

        let newOrder: string[];
        if (currentOrder.includes(ordenacao)) {
            newOrder = currentOrder.filter(c => c !== ordenacao);
        } else {
            newOrder = [...currentOrder, ordenacao];
        }

        params.delete("order");
        newOrder.forEach(c => params.append("sorted", c));

        router.push(`?${params.toString()}`);
    }

    return (
        <>
            <aside className="w-full md:w-64 border-r pr-4">
                <section className="space-y-3">
                    <Checkbox
                        id="price-asc"
                        checked={selectedOrder.includes("price-asc")}
                        onCheckedChange={() => handleCategoryChange("price-asc")}
                    />
                    <Label htmlFor="price-asc" className="text-sm cursor-pointer">
                        Menor preco
                    </Label>
                    <Checkbox
                        id="price-desc"
                        checked={selectedOrder.includes("price-desc")}
                        onCheckedChange={() => handleCategoryChange("price-desc")}
                    />
                    <Label htmlFor="price-desc" className="text-sm cursor-pointer">
                        Maior preco
                    </Label>
                    <Checkbox
                        id="name-asc"
                        checked={selectedOrder.includes("name-asc")}
                        onCheckedChange={() => handleCategoryChange("name-asc")}
                    />
                    <Label htmlFor="name-asc" className="text-sm cursor-pointer">
                        Alfabetica crecente
                    </Label>
                    <Checkbox
                        id="name-desc"
                        checked={selectedOrder.includes("name-desc")}
                        onCheckedChange={() => handleCategoryChange("name-desc")}
                    />
                    <Label htmlFor="name-desc" className="text-sm cursor-pointer">
                        Alfabetica decrecente
                    </Label>
                </section>
            </aside>
        </>
    );
}