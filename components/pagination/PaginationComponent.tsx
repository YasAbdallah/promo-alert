import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {createPageURL} from "@/utils/createPageURL";

type PaginationComponentProps = {
    qntItemsPerPage: number;
    totalItems: number;
    currentPage: number;
    searchParams: URLSearchParams;
}

export function PaginationComponent({ qntItemsPerPage, totalItems, currentPage, searchParams }: PaginationComponentProps){
    const totalPages = Math.ceil(totalItems / qntItemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={createPageURL(Math.max(1, currentPage - 1), searchParams)} text="Anterior"/>
                </PaginationItem>
               {pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink href={createPageURL(page, searchParams)} data-active={currentPage === page} className="px-3">
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                 ))}
                <PaginationItem>
                    <PaginationNext href={createPageURL(Math.min(totalPages, currentPage + 1), searchParams)} text="Próxima"/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}