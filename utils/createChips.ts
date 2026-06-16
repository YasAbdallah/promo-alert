export function createChips(chips: string): string[] {
    const getTagName = (chip: string) => {
    const [key, value] = chip.split("=");
    if (key === "sort") {
      if (value === "price-asc") return "Preço Crescente";
      if (value === "price-desc") return "Preço Decrescente";
      if (value === "name-asc") return "Nome Crescente";
      if (value === "name-desc") return "Nome Decrescente";
    }
    if (key === "page" || value.length === 0) return undefined; // Não exibir a página atual como chip
    if (key === "category") return `Category: ${value}`;
    if (key === "search") return `Search: ${value}`;
  };
  const uniqueChips = Array.from(new Set(chips.split("&").map(chip => getTagName(chip)).filter(chip => chip !== undefined)));
  return uniqueChips;
}