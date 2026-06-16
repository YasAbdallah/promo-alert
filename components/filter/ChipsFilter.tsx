import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type ChipProps = {
  label: string;
  onRemove?: () => void;
};
// TODO: Adicionar funcionalidade de remoção do chip, removendo o filtro correspondente da URL e atualizando a lista de produtos exibida.
export function ChipsFilter({
  label,
  onRemove,
}: ChipProps) {
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 px-3 py-1"
    >
      {label}

      {onRemove && (
        <button
          onClick={onRemove}
          className="rounded-full hover:bg-background/80"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}