import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type CleanFiltersButtonProps = {
    path: string;
}

export default function CleanFiltersButton({ path }: CleanFiltersButtonProps) {
    const router = useRouter();

    return (
        <>
            <Button onClick={() => router.push(path)}>Limpar Filtros</Button>
        </>
    );

}