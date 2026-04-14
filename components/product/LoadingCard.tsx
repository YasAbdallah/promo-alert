import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard() {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">

      {/* Imagem */}
      <Skeleton className="aspect-square w-full" />

      {/* Conteúdo */}
      <CardHeader className="space-y-3">

        {/* Título */}
        <Skeleton className="h-4 w-3/4" />

        {/* Subtítulo */}
        <Skeleton className="h-4 w-1/2" />

        {/* Preço */}
        <Skeleton className="h-5 w-1/3" />

      </CardHeader>

      {/* Footer (botão) */}
      <div className="px-6 pb-6">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

    </Card>
  );
}