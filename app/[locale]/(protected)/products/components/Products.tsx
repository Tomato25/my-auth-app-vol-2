"use client";

import { useEffect, useState } from "react";
import { ModalType } from "@/app/[locale]/enums";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/product";
import { ProductsTable } from "./table/ProductsTable";
import Modal from "./modal/ProductsModal";
import { columns } from "./table/ProductColumns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { getProducts } from "@/actions/get-products";
import { ProductAssignmentFilter } from "./table/filterAssigned";
import PaginationComponent from "@/components/paginationComponent";

type ProductsProps = {
  data: ProductType[];
  pages: number;
  employees: { id: string; firstName: string; lastName: string }[];
};

export function Products({ data, pages, employees }: ProductsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.ADD_PRODUCT);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  //  Name filter
  const [filterName, setFilterName] = useState("");
  const debouncedFilterName = useDebounce(filterName, 300);

  //  Assigned filter
  const [filterAssigned, setFilterAssigned] = useState<
    "all" | "assigned" | "unassigned"
  >("all");

  const [products, setProducts] = useState(data);
  const [totalPages, setTotalPages] = useState(pages);
  const [currentPage, setCurrentPage] = useState(1);

  // Main fetcher
  const fetchProducts = async (page: number) => {
    const res = await getProducts({
      page,
      limit: 5,
      filterName: debouncedFilterName,
      filterAssigned: filterAssigned,
    });

    setProducts(res.products);
    setTotalPages(res.totalPages);
    setCurrentPage(page);
  };

  // Refetch when ANY filter changes
  useEffect(() => {
    fetchProducts(1);
  }, [debouncedFilterName, filterAssigned]);

  const openModal = (type: ModalType, product?: ProductType) => {
    setModalType(type);
    setSelectedProduct(product ?? null);
    setModalOpen(true);
  };

  const refreshData = () => fetchProducts(currentPage);

  const enhancedColumns = columns(openModal, refreshData);

  return (
    <div className="m-6">
      <div className="flex row-start-1 items-center gap-4">
        <Input
          className="w-2xs py-4 my-4"
          placeholder="Filter by name or SN..."
          onChange={(e) => setFilterName(e.target.value)}
        />

        <ProductAssignmentFilter
          value={filterAssigned}
          onChange={(value) => {
            setFilterAssigned(value);
          }}
        />
      </div>
      <ProductsTable
        columns={enhancedColumns}
        data={products}
        pages={totalPages}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => fetchProducts(page)}
      />

      <Button onClick={() => openModal(ModalType.ADD_PRODUCT)}>
        Dodaj stavku
      </Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          refreshData();
        }}
        variant={modalType}
        product={selectedProduct}
        employees={employees}
      />
    </div>
  );
}

export default Products;
