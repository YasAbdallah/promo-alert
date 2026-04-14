import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <Skeleton className="aspect-video w-full" />

      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  );
}