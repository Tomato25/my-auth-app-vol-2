import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {




  return (
    <Pagination>
  <PaginationContent>


    <PaginationItem>
      <PaginationPrevious  href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }} />
    </PaginationItem>


    {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageNum}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}



    <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
  </PaginationContent>
</Pagination>
  )
}

