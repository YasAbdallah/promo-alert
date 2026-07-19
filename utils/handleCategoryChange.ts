export function handleCategoryChange(category: string) {
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

    router.push(createPageURL(1, params));
}